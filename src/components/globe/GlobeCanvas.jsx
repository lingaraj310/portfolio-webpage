import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { LOCATIONS } from '../../data/portfolioData';
import { generateLandParticles, latLngToVector3, createCurveBetweenPoints } from './geoData';

export default function GlobeCanvas({
  activeLocation,
  onSelectLocation,
  currentStage,
  onPinProject,
  onTelemetryUpdate
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const globeGroupRef = useRef(null);
  const reticlesGroupRef = useRef(null);
  const ribbonsGroupRef = useRef(null);
  const pinsGroupRef = useRef(null);
  const networkArcsRef = useRef(null);
  const starFieldRef = useRef(null);
  const meteorsRef = useRef([]);
  const frameIdRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const mousePosNormRef = useRef({ x: 0, y: 0 }); // -1 to 1 for cursor parallax
  const targetCameraOffsetRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);

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
    camera.position.set(0, 0, 320);
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

    // 4a. Translucent Cyan Holographic Inner Sphere
    const innerGeo = new THREE.SphereGeometry(GLOBE_RADIUS - 0.5, 64, 64);
    const innerMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.4);
          vec3 baseColor = vec3(0.01, 0.08, 0.22);
          vec3 rimColor = vec3(0.0, 0.88, 1.0);
          vec3 finalColor = mix(baseColor, rimColor, fresnel * 0.95);
          gl_FragColor = vec4(finalColor, 0.65);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 4b. Holographic Coordinate Wireframe
    const wireGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 0.2, 36, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // 4c. Luminous Digital Continental Pixels with RADIAL CLEARANCE MASK FOR PHOTO ZONE
    const landParticlesData = generateLandParticles(5200);
    const dotPositions = [];
    const dotColors = [];
    const cCyan = new THREE.Color(0x00f0ff);
    const cBrightCyan = new THREE.Color(0x7dd3fc);
    const cWhite = new THREE.Color(0xffffff);
    const cIceBlue = new THREE.Color(0x38bdf8);

    landParticlesData.forEach(pt => {
      const altitude = 0.012 + (Math.sin(pt.lat * 0.1) * Math.cos(pt.lng * 0.1) + 1) * 0.012;
      const pos = latLngToVector3(pt.lat, pt.lng, GLOBE_RADIUS, altitude);
      dotPositions.push(pos.x, pos.y, pos.z);

      const rand = Math.random();
      const col = rand > 0.85 ? cWhite : rand > 0.5 ? cBrightCyan : rand > 0.25 ? cCyan : cIceBlue;
      dotColors.push(col.r, col.g, col.b);
    });

    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    dotsGeo.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));

    // Custom Pixel Shader with Center Clearance Mask & Declared Uniforms
    const dotsMat = new THREE.ShaderMaterial({
      uniforms: {
        uSize: { value: 2.4 * Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        uniform float uSize;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

          // Calculate distance from center line of sight in camera view
          float centerDist = length(mvPosition.xy);

          // Disappear completely within the photo and section radius (centerDist < 85.0)
          if (mvPosition.z > -260.0 && centerDist < 85.0) {
            vAlpha = smoothstep(55.0, 85.0, centerDist);
          } else {
            vAlpha = 1.0;
          }

          gl_PointSize = uSize * (220.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          if (vAlpha <= 0.02) discard;
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          float strength = pow((0.5 - dist) * 2.0, 1.2);
          gl_FragColor = vec4(vColor, vAlpha * strength * 0.95);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const dotsMesh = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(dotsMesh);

    // 4d. Hexagonal Telemetry Honeycomb Clusters
    buildHexagonTelemetryClusters(globeGroup, GLOBE_RADIUS);

    // 4e. Floating Holographic Reticle Rings
    const reticlesGroup = new THREE.Group();
    reticlesGroupRef.current = reticlesGroup;
    globeGroup.add(reticlesGroup);
    buildFloatingHoloReticles(reticlesGroup, GLOBE_RADIUS);

    // 4f. Glowing Curved Neon Laser Ribbons
    const ribbonsGroup = new THREE.Group();
    ribbonsGroupRef.current = ribbonsGroup;
    globeGroup.add(ribbonsGroup);
    buildGlowingLaserRibbons(ribbonsGroup, GLOBE_RADIUS);

    // 4g. Outer Atmospheric Rayleigh Halo
    const haloGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.18, 64, 64);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.0, 0.88, 1.0, 1.0) * intensity * 0.95;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 5. Fixed Physical Location Pins on Globe Surface
    const pinsGroup = new THREE.Group();
    pinsGroupRef.current = pinsGroup;
    globeGroup.add(pinsGroup);

    // 6. Network Arcs Group
    const networkArcs = new THREE.Group();
    networkArcsRef.current = networkArcs;
    globeGroup.add(networkArcs);

    buildLocationPins(pinsGroup, GLOBE_RADIUS);
    buildNetworkGraphArcs(networkArcs, GLOBE_RADIUS);

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

      if (isDraggingRef.current && globeGroupRef.current && currentStage !== 'landed') {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        globeGroupRef.current.rotation.y += deltaX * 0.0035;
        globeGroupRef.current.rotation.x += deltaY * 0.0035;
        globeGroupRef.current.rotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, globeGroupRef.current.rotation.x));
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e) => {
      if (currentStage === 'landed') return;
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

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onMouseUp);

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

      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // CONTINUOUS AUTOMATIC REVOLUTION
      if (autoRotateRef.current && globeGroupRef.current) {
        globeGroupRef.current.rotation.y += 0.0014;
      }

      // CURSOR GRAVITY CAMERA PARALLAX (Subtle physical weight)
      if (cameraRef.current && currentStage === 'orbit') {
        const targetX = mousePosNormRef.current.x * 12;
        const targetY = mousePosNormRef.current.y * 8;
        targetCameraOffsetRef.current.x += (targetX - targetCameraOffsetRef.current.x) * 0.04;
        targetCameraOffsetRef.current.y += (targetY - targetCameraOffsetRef.current.y) * 0.04;
        cameraRef.current.position.x = targetCameraOffsetRef.current.x;
        cameraRef.current.position.y = targetCameraOffsetRef.current.y;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Animate Shooting Meteors
      animateMeteors(meteorsRef.current, delta);

      // Animate Reticle dials rotation
      if (reticlesGroupRef.current) {
        reticlesGroupRef.current.children.forEach((child, i) => {
          child.rotation.z += (i % 2 === 0 ? 0.0025 : -0.0018);
        });
      }

      // Animate Laser Ribbons photon pulses
      if (ribbonsGroupRef.current) {
        ribbonsGroupRef.current.children.forEach(child => {
          if (child.userData && child.userData.curve) {
            child.userData.progress = (child.userData.progress + 0.008 * child.userData.speed) % 1;
            const pt = child.userData.curve.getPoint(child.userData.progress);
            child.position.set(pt.x, pt.y, pt.z);
          }
        });
      }

      // Animate Pin beacon tips & network pulses
      animatePinsAndArcs(pinsGroup, networkArcs, time * 0.001);

      // Live Telemetry Readout Callback
      if (onTelemetryUpdate && globeGroupRef.current) {
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

  // 3. Hexagon Telemetry
  const buildHexagonTelemetryClusters = (group, radius) => {
    const hexHubs = [
      { lat: 10.79, lng: 78.70 },
      { lat: 35.67, lng: 139.65 },
      { lat: 37.77, lng: -122.41 },
      { lat: 51.50, lng: -0.12 },
      { lat: 40.71, lng: -74.00 }
    ];

    hexHubs.forEach(hub => {
      const pos = latLngToVector3(hub.lat, hub.lng, radius, 0.02);
      const normal = new THREE.Vector3(pos.x, pos.y, pos.z).normalize();

      for (let h = 0; h < 3; h++) {
        const hexGeo = new THREE.RingGeometry(2.5 + h * 2.8, 2.7 + h * 2.8, 6);
        const hexMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4 - h * 0.1,
          blending: THREE.AdditiveBlending
        });
        const hexMesh = new THREE.Mesh(hexGeo, hexMat);
        hexMesh.position.set(pos.x, pos.y, pos.z);
        hexMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        group.add(hexMesh);
      }
    });
  };

  // 4. Reticles
  const buildFloatingHoloReticles = (group, radius) => {
    const dialGeo = new THREE.RingGeometry(radius * 1.22, radius * 1.24, 96);
    const dialMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.rotation.x = Math.PI / 2;
    group.add(dialMesh);

    const tiltGeo = new THREE.RingGeometry(radius * 1.32, radius * 1.34, 64);
    const tiltMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const tiltMesh = new THREE.Mesh(tiltGeo, tiltMat);
    tiltMesh.rotation.x = Math.PI / 3;
    tiltMesh.rotation.y = Math.PI / 6;
    group.add(tiltMesh);
  };

  // 5. Laser Ribbons
  const buildGlowingLaserRibbons = (group, radius) => {
    const ribbonPaths = [
      [
        { lat: 10.79, lng: 78.70 },
        { lat: 45.0, lng: 110.0 },
        { lat: 35.67, lng: 139.65 }
      ],
      [
        { lat: 10.79, lng: 78.70 },
        { lat: 30.0, lng: 30.0 },
        { lat: 51.50, lng: -0.12 }
      ],
      [
        { lat: 51.50, lng: -0.12 },
        { lat: 55.0, lng: -45.0 },
        { lat: 40.71, lng: -74.00 }
      ],
      [
        { lat: 40.71, lng: -74.00 },
        { lat: 25.0, lng: -100.0 },
        { lat: 37.77, lng: -122.41 }
      ]
    ];

    ribbonPaths.forEach((path, idx) => {
      const v0 = latLngToVector3(path[0].lat, path[0].lng, radius, 0.02);
      const v1 = latLngToVector3(path[1].lat, path[1].lng, radius, 0.45);
      const v2 = latLngToVector3(path[2].lat, path[2].lng, radius, 0.02);

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(v0.x, v0.y, v0.z),
        new THREE.Vector3(v1.x, v1.y, v1.z),
        new THREE.Vector3(v2.x, v2.y, v2.z)
      );

      const points = curve.getPoints(80);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      group.add(lineMesh);

      const flareGeo = new THREE.SphereGeometry(2.4, 16, 16);
      const flareMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });
      const flareMesh = new THREE.Mesh(flareGeo, flareMat);
      flareMesh.userData = { curve, speed: 0.4 + idx * 0.1, progress: (idx * 0.25) % 1 };
      group.add(flareMesh);
    });
  };

  // 6. Fixed Physical Location Pins on Globe Surface
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

      // Glowing Cyan Stem
      const stemHeight = isHome ? 12 : 8.5;
      const stemGeo = new THREE.CylinderGeometry(0.4, 0.6, stemHeight, 16);
      const stemMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.95
      });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.y = stemHeight / 2;
      pinContainer.add(stemMesh);

      // Pulsing Base Ground Ring
      const pulseGeo = new THREE.RingGeometry(1.6, 3.8, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
      pulseRing.rotation.x = Math.PI / 2;
      pulseRing.position.y = 0.2;
      pulseRing.name = 'pulseRing';
      pinContainer.add(pulseRing);

      group.add(pinContainer);
    });
  };

  // 7. Network Arcs
  const buildNetworkGraphArcs = (group, radius) => {
    const home = LOCATIONS.find(l => l.id === 'about');
    if (!home) return;

    LOCATIONS.filter(l => l.id !== 'about').forEach((dest) => {
      const { start, controlPoint, end } = createCurveBetweenPoints(
        home.lat, home.lng,
        dest.lat, dest.lng,
        radius,
        0.28
      );

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(start.x, start.y, start.z),
        new THREE.Vector3(controlPoint.x, controlPoint.y, controlPoint.z),
        new THREE.Vector3(end.x, end.y, end.z)
      );

      const points = curve.getPoints(60);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      group.add(arcLine);

      const pulsePointGeo = new THREE.SphereGeometry(1.4, 12, 12);
      const pulsePointMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });
      const pulseMesh = new THREE.Mesh(pulsePointGeo, pulsePointMat);
      pulseMesh.name = `arcPulse-${dest.id}`;
      pulseMesh.userData = { curve, speed: 0.35 + Math.random() * 0.2, progress: Math.random() };
      group.add(pulseMesh);
    });
  };

  // Animate Pins & Arc Pulses
  const animatePinsAndArcs = (pinsGroup, arcsGroup, time) => {
    pinsGroup.children.forEach(pin => {
      const ring = pin.getObjectByName('pulseRing');
      if (ring) {
        const scale = 1 + (Math.sin(time * 4) + 1) * 0.35;
        ring.scale.set(scale, scale, 1);
      }
    });

    arcsGroup.children.forEach(obj => {
      if (obj.name && obj.name.startsWith('arcPulse-')) {
        obj.userData.progress = (obj.userData.progress + 0.005 * obj.userData.speed) % 1;
        const pt = obj.userData.curve.getPoint(obj.userData.progress);
        obj.position.set(pt.x, pt.y, pt.z);
      }
    });
  };

  // Project 3D Pins to 2D
  const updateProjectedPins = (pinsGroup, camera, width, height) => {
    const projected = {};
    pinsGroup.children.forEach(pin => {
      const loc = pin.userData.location;
      if (!loc) return;

      const worldPos = new THREE.Vector3();
      pin.getWorldPosition(worldPos);

      const cameraDir = camera.position.clone().normalize();
      const pinDir = worldPos.clone().normalize();
      const dot = cameraDir.dot(pinDir);
      const isVisible = dot > 0.15;

      const screenPos = worldPos.clone().project(camera);
      const x = (screenPos.x * 0.5 + 0.5) * width;
      const y = (-(screenPos.y * 0.5) + 0.5) * height;

      projected[loc.id] = {
        x,
        y,
        isVisible,
        depth: screenPos.z,
        location: loc
      };
    });

    onPinProject(projected);
  };

  // 8. Revolve Earth to Center Destination on Section Click & Hyperspace Warp Jump
  useEffect(() => {
    if (!cameraRef.current || !globeGroupRef.current) return;

    const camera = cameraRef.current;
    const globe = globeGroupRef.current;

    if (currentStage === 'hero') {
      autoRotateRef.current = true;
      gsap.killTweensOf(camera.position);
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 320,
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
        z: 220,
        duration: 2.8,
        ease: 'power3.out'
      });

      const target = LOCATIONS[0];
      const targetRotY = -((target.lng - 90) * Math.PI / 180);
      const targetRotX = (target.lat * Math.PI / 180) * 0.4;

      gsap.to(globe.rotation, {
        x: targetRotX,
        y: targetRotY,
        duration: 2.8,
        ease: 'power3.inOut',
        onComplete: () => {
          autoRotateRef.current = true;
        }
      });
      return;
    }

    if (currentStage === 'traveling' || currentStage === 'landed') {
      const target = activeLocation || LOCATIONS[0];

      const targetRotY = -((target.lng - 90) * Math.PI / 180);
      const targetRotX = (target.lat * Math.PI / 180) * 0.4;

      gsap.killTweensOf(globe.rotation);
      gsap.to(globe.rotation, {
        x: targetRotX,
        y: targetRotY,
        duration: 2.2,
        ease: 'power3.inOut',
        onComplete: () => {
          autoRotateRef.current = true;
        }
      });

      // Hyperspace rush transition when landing
      const distance = currentStage === 'landed' ? 160 : 210;
      gsap.killTweensOf(camera.position);
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: distance,
        duration: 1.8,
        ease: 'power3.inOut'
      });
    }
  }, [activeLocation, currentStage]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
