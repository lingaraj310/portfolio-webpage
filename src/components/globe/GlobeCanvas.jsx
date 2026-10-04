import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { LOCATIONS } from '../../data/portfolioData';
import { latLngToVector3 } from './geoData';
import { PlaneNavigator } from './PlaneNavigator';

export default function GlobeCanvas({
  activeLocation,
  onSelectLocation,
  currentStage,
  onPinProject,
  onTelemetryUpdate,
  zoomAction,
  isAutoRotating = true,
  flightsEnabled = true
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const globeGroupRef = useRef(null);
  const pinsGroupRef = useRef(null);
  const planeNavigatorRef = useRef(null);
  const starFieldRef = useRef(null);
  const meteorsRef = useRef([]);
  const frameIdRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const mousePosNormRef = useRef({ x: 0, y: 0 }); // -1 to 1 for cursor parallax
  const targetCameraOffsetRef = useRef({ x: 0, y: 0 });
  const cloudsMeshRef = useRef(null);
  const autoRotateRef = useRef(true);
  const currentStageRef = useRef(currentStage);
  currentStageRef.current = currentStage;
  const activeLocationRef = useRef(activeLocation);
  activeLocationRef.current = activeLocation;

  // Globe Radius
  const GLOBE_RADIUS = 100;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera - Centered at (0, 0, 0)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x01040a, 0.0004);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 4500);
    cameraRef.current = camera;
    camera.position.set(0, 0, 300);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Realistic Cosmic Space Lighting & Holographic Key Lights
    const ambientLight = new THREE.AmbientLight(0x07152d, 2.4);
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.DirectionalLight(0x00f0ff, 4.2);
    cyanKeyLight.position.set(260, 160, 240);
    scene.add(cyanKeyLight);

    const blueFillLight = new THREE.DirectionalLight(0x0284c7, 2.8);
    blueFillLight.position.set(-250, -100, -200);
    scene.add(blueFillLight);

    // 3. Deep Space Background (Multi-layered Stars, Cosmic Nebulas & Shooting Meteors)
    const starField = buildDeepSpaceCosmos(scene);
    starFieldRef.current = starField;
    buildShootingMeteors(scene);

    // 4. Globe Root Group - Centered at (0, 0, 0)
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    // 4a. Photorealistic NASA Earth Texture Maps Loader
    const textureLoader = new THREE.TextureLoader();
    const dayMap = textureLoader.load('/textures/earth_day.jpg');
    const nightMap = textureLoader.load('/textures/earth_lights.png');
    const specularMap = textureLoader.load('/textures/earth_specular.jpg');
    const normalMap = textureLoader.load('/textures/earth_normal.jpg');
    const cloudsMap = textureLoader.load('/textures/earth_clouds.png');

    // 4b. Photorealistic Earth Sphere with Dynamic Day/Night & Ocean Specular Glint
    const earthGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayMap },
        uNightMap: { value: nightMap },
        uSpecularMap: { value: specularMap },
        uNormalMap: { value: normalMap },
        uSunDirection: { value: new THREE.Vector3(260, 160, 240).normalize() }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vSunDir;
        varying vec3 vViewPosition;

        uniform vec3 uSunDirection;

        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          vSunDir = normalize(uSunDirection);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vSunDir;
        varying vec3 vViewPosition;

        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform sampler2D uSpecularMap;
        uniform sampler2D uNormalMap;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 sunDir = normalize(vSunDir);
          vec3 viewDir = normalize(vViewPosition);

          // Smooth Day/Night terminator lighting
          float NdotL = dot(normal, sunDir);
          float dayIntensity = smoothstep(-0.15, 0.35, NdotL);
          float nightIntensity = 1.0 - smoothstep(-0.25, 0.15, NdotL);

          // Sample Earth textures
          vec3 dayColor = texture2D(uDayMap, vUv).rgb;
          vec3 nightLights = texture2D(uNightMap, vUv).rgb;
          float specular = texture2D(uSpecularMap, vUv).r;

          // Ocean Sun Glint (Specular highlight)
          vec3 halfVector = normalize(sunDir + viewDir);
          float NdotH = max(0.0, dot(normal, halfVector));
          float specIntensity = pow(NdotH, 36.0) * specular * 1.8;

          // Atmospheric horizon rim glow
          float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.8);
          vec3 atmosphereColor = vec3(0.12, 0.55, 1.0) * fresnel * max(0.15, dayIntensity + 0.12);

          // Combine daylight surface, golden city night lights, ocean glare & atmosphere
          vec3 finalColor = (dayColor * (dayIntensity * 0.95 + 0.05)) + 
                            (nightLights * 2.2 * nightIntensity) + 
                            (vec3(1.0, 0.95, 0.85) * specIntensity * dayIntensity) + 
                            atmosphereColor;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 4c. Photorealistic Floating Cloud Layer (Drifts independently around Earth)
    const cloudsGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 0.8, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    cloudsMeshRef.current = cloudsMesh;
    globeGroup.add(cloudsMesh);

    // 5. Clean Physical Location Pins on Photorealistic Earth Surface
    const pinsGroup = new THREE.Group();
    pinsGroupRef.current = pinsGroup;
    globeGroup.add(pinsGroup);
    buildLocationPins(pinsGroup, GLOBE_RADIUS);

    // 6. ONE Aeroplane as Current Location Indicator (Attached to Earth Group)
    const planeNavigator = new PlaneNavigator();
    planeNavigatorRef.current = planeNavigator;
    planeNavigator.init(
      globeGroup,
      GLOBE_RADIUS,
      (landedLoc) => {
        if (onSelectLocation) {
          onSelectLocation(landedLoc, true); // true = touchdown arrival
        }
      },
      (telemetry) => {
        if (onTelemetryUpdate) {
          onTelemetryUpdate(telemetry);
        }
      }
    );

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cursor Movement & Gravity Parallax
    const onWindowMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosNormRef.current = { x: normX, y: normY };

      if (isDraggingRef.current && globeGroupRef.current && currentStageRef.current !== 'landed') {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        globeGroupRef.current.rotation.y += deltaX * 0.0035;
        globeGroupRef.current.rotation.x += deltaY * 0.0035;
        globeGroupRef.current.rotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, globeGroupRef.current.rotation.x));
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e) => {
      if (currentStageRef.current === 'landed') return;
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        if (!isDraggingRef.current) {
          autoRotateRef.current = true;
        }
      }, 2500);
    };

    // Mouse Wheel Zoom
    const onWheel = (e) => {
      if (!cameraRef.current || currentStageRef.current === 'landed') return;
      const newZ = cameraRef.current.position.z + e.deltaY * 0.18;
      cameraRef.current.position.z = Math.max(180, Math.min(450, newZ));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: true });

    const onTouchStart = (e) => { if (e.touches.length === 1) onMouseDown(e.touches[0]); };
    const onTouchMove = (e) => { if (e.touches.length === 1) onWindowMouseMove(e.touches[0]); };
    const onTouchEnd = () => onMouseUp();

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Render Loop: Continuous Revolution, Parallax & Telemetry
    let lastTime = 0;
    const animate = (time) => {
      frameIdRef.current = requestAnimationFrame(animate);

      const delta = lastTime === 0 ? 0.016 : Math.min(0.06, (time - lastTime) * 0.001);
      lastTime = time;

      // CONTINUOUS AUTOMATIC REVOLUTION
      if (autoRotateRef.current && globeGroupRef.current) {
        globeGroupRef.current.rotation.y += 0.0014;
      }
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.0005;
      }

      // CURSOR GRAVITY CAMERA PARALLAX (Subtle physical weight)
      if (cameraRef.current && currentStageRef.current === 'orbit') {
        const targetX = mousePosNormRef.current.x * 12;
        const targetY = mousePosNormRef.current.y * 8;
        if (targetCameraOffsetRef.current) {
          targetCameraOffsetRef.current.x += (targetX - targetCameraOffsetRef.current.x) * 0.04;
          targetCameraOffsetRef.current.y += (targetY - targetCameraOffsetRef.current.y) * 0.04;
          cameraRef.current.position.x = targetCameraOffsetRef.current.x;
          cameraRef.current.position.y = targetCameraOffsetRef.current.y;
          cameraRef.current.lookAt(0, 0, 0);
        }
      }

      // Animate Shooting Meteors
      animateMeteors(meteorsRef.current, delta);

      // Animate 3D Location Map Pins (Gentle hover float & radar pulse)
      if (pinsGroup) {
        pinsGroup.children.forEach(pin => {
          const ring = pin.getObjectByName('pulseRing');
          if (ring) {
            const scale = 1 + (Math.sin(time * 0.0035) + 1) * 0.22;
            ring.scale.set(scale, scale, 1);
          }
          const radar = pin.getObjectByName('radarRing');
          if (radar) {
            radar.rotation.z -= 0.015;
          }
          const pinIcon = pin.getObjectByName('floatingPin');
          if (pinIcon) {
            pinIcon.rotation.y += 0.018;
            const bob = Math.sin(time * 0.0028 + (pin.userData?.location?.lat || 0)) * 0.35;
            pinIcon.position.y = 1.6 + bob;
          }
        });
      }

      // Update ONE Location Indicator PlaneNavigator
      if (planeNavigatorRef.current) {
        planeNavigatorRef.current.update(delta);
      }

      // Live Telemetry Readout Callback (when idle)
      if (onTelemetryUpdate && globeGroupRef.current && (!planeNavigatorRef.current || !planeNavigatorRef.current.isFlying)) {
        const rotYDeg = ((-globeGroupRef.current.rotation.y * 180 / Math.PI + 90) % 360 + 360) % 360 - 180;
        const rotXDeg = (globeGroupRef.current.rotation.x * 180 / Math.PI) / 0.4;
        onTelemetryUpdate({
          lat: rotXDeg.toFixed(2),
          lng: rotYDeg.toFixed(2),
          rotY: globeGroupRef.current.rotation.y.toFixed(3),
          rotX: globeGroupRef.current.rotation.x.toFixed(3)
        });
      }

      // Project 3D Pins to 2D
      if (onPinProject && cameraRef.current && rendererRef.current) {
        updateProjectedPins(pinsGroup, cameraRef.current, width, height);
      }

      renderer.render(scene, camera);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (planeNavigatorRef.current) {
        planeNavigatorRef.current.dispose();
      }
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 1. Deep Space Cosmic Background
  const buildDeepSpaceCosmos = (scene) => {
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = [];
    const starColors = [];
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x7dd3fc),
      new THREE.Color(0x00f0ff),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x38bdf8)
    ];

    for (let i = 0; i < 4200; i++) {
      const radius = 600 + Math.random() * 1100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      const c = palette[Math.floor(Math.random() * palette.length)];
      starColors.push(c.r, c.g, c.b);
    }
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starsGeo, starMat);
    scene.add(starField);

    // Volumetric 3D Cosmic Nebula Clouds
    const nebulaColors = [0x0070f3, 0x7928ca, 0x00f0ff, 0x0284c7];
    nebulaColors.forEach((col, idx) => {
      const nebGeo = new THREE.BufferGeometry();
      const nebPositions = [];
      const count = 350;

      const centerRadius = 820 + idx * 80;
      const centerTheta = (idx * Math.PI) / 2 + 0.3;
      const centerPhi = 1.1 + idx * 0.3;

      const cx = centerRadius * Math.sin(centerPhi) * Math.cos(centerTheta);
      const cy = centerRadius * Math.sin(centerPhi) * Math.sin(centerTheta);
      const cz = centerRadius * Math.cos(centerPhi);

      for (let j = 0; j < count; j++) {
        nebPositions.push(
          cx + (Math.random() - 0.5) * 400,
          cy + (Math.random() - 0.5) * 400,
          cz + (Math.random() - 0.5) * 400
        );
      }

      nebGeo.setAttribute('position', new THREE.Float32BufferAttribute(nebPositions, 3));
      const nebMat = new THREE.PointsMaterial({
        size: 32 + Math.random() * 20,
        color: new THREE.Color(col),
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
      });
      const nebMesh = new THREE.Points(nebGeo, nebMat);
      scene.add(nebMesh);
    });

    return starField;
  };

  // 2. Shooting Meteors
  const buildShootingMeteors = (scene) => {
    const meteors = [];
    for (let i = 0; i < 4; i++) {
      const length = 45;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array([0, 0, 0, -length * 0.8, -length * 0.5, -length * 0.3]);
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(geo, mat);
      line.userData = {
        active: false,
        speed: 420 + Math.random() * 250,
        direction: new THREE.Vector3(-1, -0.6, -0.4).normalize(),
        resetTimer: Math.random() * 4
      };
      scene.add(line);
      meteors.push(line);
    }
    meteorsRef.current = meteors;
  };

  const animateMeteors = (meteors, delta) => {
    meteors.forEach(meteor => {
      const data = meteor.userData;
      if (!data.active) {
        data.resetTimer -= delta;
        if (data.resetTimer <= 0) {
          data.active = true;
          meteor.position.set(
            (Math.random() - 0.5) * 900,
            250 + Math.random() * 250,
            -250 + (Math.random() - 0.5) * 400
          );
          meteor.material.opacity = 0.9;
          data.life = 0.85 + Math.random() * 0.4;
        }
      } else {
        meteor.position.addScaledVector(data.direction, data.speed * delta);
        data.life -= delta;
        meteor.material.opacity = Math.max(0, data.life * 1.2);
        if (data.life <= 0) {
          data.active = false;
          data.resetTimer = 3 + Math.random() * 6;
        }
      }
    });
  };

  // 3. Fixed Physical Location Pins on Globe Surface
  // Helper: Creates a 3D Extruded Location Drop-Pin Icon with glowing center gem
  const create3DLocationPinMesh = (isHome = false) => {
    const pinGroup = new THREE.Group();
    pinGroup.name = 'mapPinIcon';

    // 1. Iconic 2D Path of Map Pin (Teardrop with center circular cutout)
    const shape = new THREE.Shape();
    const radius = 1.35;
    const headCenterY = 3.2;

    // Start at bottom sharp tip
    shape.moveTo(0, 0);
    // Left curve up towards round head
    shape.bezierCurveTo(-1.6, 1.2, -radius * 1.3, headCenterY - 0.4, -radius, headCenterY);
    // Round top arc
    shape.absarc(0, headCenterY, radius, Math.PI, 0, false);
    // Right curve back down to bottom sharp tip
    shape.bezierCurveTo(radius * 1.3, headCenterY - 0.4, 1.6, 1.2, 0, 0);

    // Inner circular window
    const hole = new THREE.Path();
    hole.absarc(0, headCenterY, 0.6, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    // 2. Extrude into 3D Solid Geometry
    const extrudeSettings = {
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };
    const pinGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center depth along Z
    pinGeo.translate(0, 0, -0.225);

    const pinMat = new THREE.MeshStandardMaterial({
      color: isHome ? 0xffffff : 0x0284c7,
      metalness: 0.88,
      roughness: 0.15,
      emissive: 0x00f0ff,
      emissiveIntensity: isHome ? 0.65 : 0.45
    });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinGroup.add(pinMesh);

    // 3. Glowing Center Core Gem / Orb
    const coreGeo = new THREE.SphereGeometry(0.48, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isHome ? 0xffffff : 0x00ffff,
      transparent: true,
      opacity: 0.95
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, headCenterY, 0);
    pinGroup.add(coreMesh);

    // Scale slightly larger for Home base (India)
    const s = isHome ? 1.3 : 1.1;
    pinGroup.scale.set(s, s, s);

    return pinGroup;
  };

  // 3. Iconic 3D Location Map Pins on Globe Surface
  const buildLocationPins = (group, radius) => {
    LOCATIONS.forEach((loc) => {
      const pinContainer = new THREE.Group();
      pinContainer.name = `pin-${loc.id}`;
      pinContainer.userData = { location: loc };

      // Exact physical geographic coordinates on globe surface
      const pos = latLngToVector3(loc.lat, loc.lng, radius, 0.02);
      pinContainer.position.set(pos.x, pos.y, pos.z);

      const normal = new THREE.Vector3(pos.x, pos.y, pos.z).normalize();
      pinContainer.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

      const isHome = loc.id === 'about';

      // 1. Holographic Ground Runway Target Pad
      // A. Inner glowing core dot
      const coreGeo = new THREE.CircleGeometry(0.9, 24);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.rotation.x = Math.PI / 2;
      coreMesh.position.y = 0.15;
      pinContainer.add(coreMesh);

      // B. Rotating Middle Radar Reticle Ring
      const radarGeo = new THREE.RingGeometry(1.6, 2.1, 32);
      const radarMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const radarRing = new THREE.Mesh(radarGeo, radarMat);
      radarRing.rotation.x = Math.PI / 2;
      radarRing.position.y = 0.2;
      radarRing.name = 'radarRing';
      pinContainer.add(radarRing);

      // C. Pulsing Outer Ground Boundary Ring
      const pulseGeo = new THREE.RingGeometry(2.8, 3.4, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
      pulseRing.rotation.x = Math.PI / 2;
      pulseRing.position.y = 0.22;
      pulseRing.name = 'pulseRing';
      pinContainer.add(pulseRing);

      // D. Crosshair Ticks (4 directional brackets on ground pad)
      for (let t = 0; t < 4; t++) {
        const tickGeo = new THREE.PlaneGeometry(0.2, 1.2);
        const tickMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const tick = new THREE.Mesh(tickGeo, tickMat);
        tick.rotation.x = Math.PI / 2;
        tick.rotation.z = (t * Math.PI) / 2;
        tick.position.set(Math.cos(t * Math.PI / 2) * 3.6, 0.25, Math.sin(t * Math.PI / 2) * 3.6);
        pinContainer.add(tick);
      }

      // 2. Translucent Light Beacon Beam connecting ground to Pin Tip
      const beamHeight = 1.8;
      const beamGeo = new THREE.CylinderGeometry(0.18, 0.7, beamHeight, 16, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.38,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.y = beamHeight / 2;
      pinContainer.add(beamMesh);

      // 3. 3D Floating Location Map Pin Icon (Hovering & Pointing to Target Pad)
      const mapPin = create3DLocationPinMesh(isHome);
      mapPin.position.y = 1.6;
      mapPin.name = 'floatingPin';
      pinContainer.add(mapPin);

      // 4. Reference Tip Anchor for 2D UI Card Positioning
      const tipAnchor = new THREE.Object3D();
      tipAnchor.position.set(0, isHome ? 7.6 : 6.6, 0);
      tipAnchor.name = 'pinTip';
      pinContainer.add(tipAnchor);

      group.add(pinContainer);
    });
  };

  // Project 3D Pins to 2D Screen Space
  const updateProjectedPins = (pinsGroup, camera, width, height) => {
    const projected = {};
    pinsGroup.children.forEach(pin => {
      const loc = pin.userData.location;
      if (!loc) return;

      const tip = pin.getObjectByName('pinTip') || pin;
      const worldPos = new THREE.Vector3();
      tip.getWorldPosition(worldPos);

      const cameraDir = camera.position.clone().normalize();
      const pinDir = worldPos.clone().normalize();
      const dot = cameraDir.dot(pinDir);
      const isVisible = dot > 0.22;

      const screenPos = worldPos.clone().project(camera);
      const x = (screenPos.x * 0.5 + 0.5) * width;
      const y = (-(screenPos.y * 0.5) + 0.5) * height;

      projected[loc.id] = {
        x,
        y,
        isVisible,
        dot,
        depth: screenPos.z,
        location: loc
      };
    });

    onPinProject(projected);
  };

  // 4. Camera & Globe Rotation Sync across lifecycle states
  useEffect(() => {
    if (!cameraRef.current || !globeGroupRef.current) return;

    const camera = cameraRef.current;
    const globe = globeGroupRef.current;

    const isDesktop = window.innerWidth >= 1024;
    const targetGlobeX = currentStage === 'orbit' && isDesktop ? 46 : 0;

    gsap.to(globe.position, {
      x: targetGlobeX,
      duration: 2.0,
      ease: 'power3.inOut'
    });

    if (currentStage === 'hero') {
      autoRotateRef.current = true;
      gsap.killTweensOf(camera.position);
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 300,
        duration: 2.2,
        ease: 'power2.out'
      });
      return;
    }

    if (currentStage === 'descending') {
      autoRotateRef.current = false;
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(globe.rotation);

      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 335,
        duration: 2.8,
        ease: 'power3.out'
      });

      const target = LOCATIONS[0];
      const targetRotY = -((target.lng + 90) * Math.PI / 180);
      const targetRotX = (target.lat * Math.PI / 180);

      const currentRotY = globe.rotation.y;
      const diffY = ((targetRotY - currentRotY) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      const smoothTargetRotY = currentRotY + diffY;

      gsap.to(globe.rotation, {
        x: targetRotX,
        y: smoothTargetRotY,
        duration: 2.8,
        ease: 'power3.inOut',
        onComplete: () => {
          autoRotateRef.current = true;
        }
      });
      return;
    }

    if (currentStage === 'orbit' && activeLocation) {
      const target = activeLocation;
      const targetRotY = -((target.lng + 90) * Math.PI / 180);
      const targetRotX = (target.lat * Math.PI / 180);

      const currentRotY = globe.rotation.y;
      const diffY = ((targetRotY - currentRotY) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      const smoothTargetRotY = currentRotY + diffY;

      gsap.killTweensOf(globe.rotation);
      gsap.to(globe.rotation, {
        x: targetRotX,
        y: smoothTargetRotY,
        duration: 1.4,
        ease: 'power2.out',
        onComplete: () => {
          autoRotateRef.current = true;
        }
      });
      return;
    }

    if (currentStage === 'traveling' && activeLocation) {
      autoRotateRef.current = false;
      const destination = activeLocation;

      // 1. Tell PlaneNavigator to fly from current location to destination
      if (planeNavigatorRef.current) {
        planeNavigatorRef.current.flyTo(destination);
      }

      // 2. Smoothly rotate globe so that the route/destination faces the camera
      const currentRotY = globe.rotation.y;
      const currentRotX = globe.rotation.x;

      const endRotY = -((destination.lng + 90) * Math.PI / 180);
      const endRotX = (destination.lat * Math.PI / 180);

      const diffY = ((endRotY - currentRotY) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      const smoothEndRotY = currentRotY + diffY;

      const duration = planeNavigatorRef.current?.flightDuration || 3.2;

      gsap.killTweensOf(globe.rotation);
      gsap.to(globe.rotation, {
        x: endRotX,
        y: smoothEndRotY,
        duration: duration,
        ease: 'power2.inOut',
        onComplete: () => {
          autoRotateRef.current = true;
        }
      });
      return;
    }

    if (currentStage === 'landed') {
      return;
    }
  }, [activeLocation, currentStage]);

  // Sync isAutoRotating state with globe rotation
  useEffect(() => {
    autoRotateRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Handle Zoom In / Out from controls
  useEffect(() => {
    if (!cameraRef.current || currentStage === 'landed' || !zoomAction) return;
    if (zoomAction.type === 'in') {
      const targetZ = Math.max(145, cameraRef.current.position.z - 35);
      gsap.to(cameraRef.current.position, { z: targetZ, duration: 0.5, ease: 'power2.out' });
    } else if (zoomAction.type === 'out') {
      const targetZ = Math.min(380, cameraRef.current.position.z + 35);
      gsap.to(cameraRef.current.position, { z: targetZ, duration: 0.5, ease: 'power2.out' });
    }
  }, [zoomAction, currentStage]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
