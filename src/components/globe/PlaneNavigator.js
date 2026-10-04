import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { latLngToVector3 } from './geoData';
import { LOCATIONS } from '../../data/portfolioData';

/**
 * Creates a prominent, high-visibility 3D aeroplane with glowing cockpit,
 * delta wings, twin jet engines, plasma exhaust flames, and attached beacon light.
 */
function createProminentAirplaneMesh() {
  const plane = new THREE.Group();
  plane.name = 'navigatorAirplane';

  // 1. Sleek Aerodynamic Fuselage (Nose at +Z, Tail at -Z, Top at +Y)
  const fuselageGeo = new THREE.ConeGeometry(1.6, 10.5, 16);
  fuselageGeo.rotateX(Math.PI / 2);
  const fuselageMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.88,
    roughness: 0.12,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.35
  });
  const fuselage = new THREE.Mesh(fuselageGeo, fuselageMat);
  plane.add(fuselage);

  // 2. Cockpit Visor Canopy (Luminous Glowing Cyan Glass)
  const visorGeo = new THREE.BoxGeometry(1.2, 0.75, 3.2);
  visorGeo.translate(0, 0.75, 1.2);
  const visorMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.95
  });
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  plane.add(visorMesh);

  // 3. Passenger Cabin Windows
  for (let w = 0; w < 4; w++) {
    const winGeo = new THREE.BoxGeometry(0.16, 0.35, 0.55);
    const winMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    const leftWin = new THREE.Mesh(winGeo, winMat);
    leftWin.position.set(-0.85, 0.3, 0.2 - w * 0.95);
    plane.add(leftWin);

    const rightWin = new THREE.Mesh(winGeo, winMat);
    rightWin.position.set(0.85, 0.3, 0.2 - w * 0.95);
    plane.add(rightWin);
  }

  // 4. Swept Delta Main Wings
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 1.8);
  wingShape.lineTo(6.5, -3.2);
  wingShape.lineTo(1.2, -2.4);
  wingShape.lineTo(-1.2, -2.4);
  wingShape.lineTo(-6.5, -3.2);
  wingShape.closePath();

  const wingExtrude = new THREE.ExtrudeGeometry(wingShape, { depth: 0.28, bevelEnabled: false });
  wingExtrude.rotateX(Math.PI / 2);
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.9,
    roughness: 0.15,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.25
  });
  const wingMesh = new THREE.Mesh(wingExtrude, wingMat);
  wingMesh.position.y = 0.04;
  plane.add(wingMesh);

  // 5. Vertical Stabilizer Tail Fin
  const tailShape = new THREE.Shape();
  tailShape.moveTo(0, 0);
  tailShape.lineTo(0, 3.2);
  tailShape.lineTo(-2.0, 0);
  tailShape.closePath();
  const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.22, bevelEnabled: false });
  tailGeo.rotateY(Math.PI / 2);
  const tailMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    metalness: 0.92,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.5
  });
  const tailMesh = new THREE.Mesh(tailGeo, tailMat);
  tailMesh.position.set(0, 0.35, -4.0);
  plane.add(tailMesh);

  // 6. Wingtip Navigation Beacons (Red Port / Cyan Starboard)
  const tipGeo = new THREE.SphereGeometry(0.45, 8, 8);
  const leftTip = new THREE.Mesh(tipGeo, new THREE.MeshBasicMaterial({ color: 0xff0055 }));
  leftTip.position.set(-6.5, 0.12, -3.2);
  plane.add(leftTip);

  const rightTip = new THREE.Mesh(tipGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
  rightTip.position.set(6.5, 0.12, -3.2);
  plane.add(rightTip);

  // 7. Twin Jet Turbine Nacelles
  const engineGeo = new THREE.CylinderGeometry(0.65, 0.8, 2.8, 16);
  engineGeo.rotateX(Math.PI / 2);
  const engineMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.92 });

  const leftEngine = new THREE.Mesh(engineGeo, engineMat);
  leftEngine.position.set(-1.8, -0.2, -3.2);
  plane.add(leftEngine);

  const rightEngine = new THREE.Mesh(engineGeo, engineMat);
  rightEngine.position.set(1.8, -0.2, -3.2);
  plane.add(rightEngine);

  // 8. Jet Flame Glowing Exhaust Cones
  const flameGeo = new THREE.ConeGeometry(0.6, 4.2, 8);
  flameGeo.rotateX(-Math.PI / 2);
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });

  const leftFlame = new THREE.Mesh(flameGeo, flameMat.clone());
  leftFlame.position.set(-1.8, -0.2, -5.8);
  leftFlame.name = 'leftFlame';
  plane.add(leftFlame);

  const rightFlame = new THREE.Mesh(flameGeo, flameMat.clone());
  rightFlame.position.set(1.8, -0.2, -5.8);
  rightFlame.name = 'rightFlame';
  plane.add(rightFlame);

  // 9. Dynamic Attached Cyan Point Light (Vivid Aircraft & Ground Illumination)
  const beaconLight = new THREE.PointLight(0x00f0ff, 4.5, 65);
  beaconLight.position.set(0, 3.5, 0);
  plane.add(beaconLight);

  // 10. Holographic Ground Location Reticle (Visual Locator)
  const reticleGeo = new THREE.RingGeometry(2.4, 3.0, 32);
  const reticleMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  const reticle = new THREE.Mesh(reticleGeo, reticleMat);
  reticle.rotation.x = Math.PI / 2;
  reticle.position.set(0, -1.2, 0);
  reticle.name = 'groundReticle';
  plane.add(reticle);

  // Prevent raycast interception
  plane.traverse(child => {
    child.raycast = () => {};
  });

  return plane;
}

const TRAIL_LENGTH = 55;

function smoothQuintic(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export class PlaneNavigator {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'planeNavigatorGroup';
    this.plane = null;
    this.earthGroup = null;
    this.radius = 100;

    // Flight State
    this.currentLocation = LOCATIONS[0]; // Start parked at About Me (Madurai)
    this.targetLocation = null;
    this.isFlying = false;
    this.flightProgress = 0;
    this.flightDuration = 3.6; // 3.0 - 4.2s based on distance
    this.flightState = null;
    this.routeLine = null;
    this.idleTime = 0;

    // Trail System
    this.trailLine = null;
    this.trailPositions = null;
    this.trailColors = null;
    this.trailHistory = [];

    // Callbacks
    this.onArrive = null;
    this.onTelemetry = null;
  }

  /**
   * Initializes the single aeroplane and trail system attached to earthGroup.
   * @param {THREE.Group} earthGroup - The Earth mesh group
   * @param {number} radius - Globe radius (default 100)
   * @param {Function} onArrive - Callback invoked when plane lands at destination
   * @param {Function} onTelemetry - Callback for real-time lat/lng HUD telemetry during flight
   */
  init(earthGroup, radius = 100, onArrive = null, onTelemetry = null) {
    this.earthGroup = earthGroup;
    this.radius = radius;
    this.onArrive = onArrive;
    this.onTelemetry = onTelemetry;

    // 1. Create Prominent Aeroplane Model
    this.plane = createProminentAirplaneMesh();
    this.group.add(this.plane);

    // 2. Setup Fading Trail Line (55 points)
    this.trailPositions = new Float32Array(TRAIL_LENGTH * 3);
    this.trailColors = new Float32Array(TRAIL_LENGTH * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const darkColor = new THREE.Color(0x010814);

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const alpha = 1.0 - (i / TRAIL_LENGTH);
      const c = darkColor.clone().lerp(cyanColor, alpha * alpha);
      this.trailColors[i * 3] = c.r;
      this.trailColors[i * 3 + 1] = c.g;
      this.trailColors[i * 3 + 2] = c.b;
    }

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(this.trailPositions, 3));
    trailGeo.setAttribute('color', new THREE.BufferAttribute(this.trailColors, 3));

    const trailMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.0, // Hidden while idle
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.trailLine = new THREE.Line(trailGeo, trailMat);
    this.trailLine.raycast = () => {};
    this.group.add(this.trailLine);

    // 3. Park initially at Madurai (About Me) elevated above the surface
    this.parkAtLocation(this.currentLocation);

    // 4. Attach to Earth group so it moves, rotates, and zooms seamlessly
    earthGroup.add(this.group);

    // 5. Asynchronously load custom aeroplane.glb if available
    this.loadCustomGlbModel();
  }

  /**
   * Loads the custom 3D aeroplane.glb model from public directory
   */
  loadCustomGlbModel() {
    const gltfLoader = new GLTFLoader();
    const tryLoad = (url) => {
      gltfLoader.load(
        url,
        (gltf) => {
          const customScene = gltf.scene;
          customScene.traverse((node) => {
            if (node.isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
              node.raycast = () => {};
              if (node.material) {
                node.material.side = THREE.DoubleSide;
                node.material.roughness = 0.2;
                node.material.metalness = 0.8;
              }
            }
          });

          // Compute bounding box & center geometry
          const box = new THREE.Box3().setFromObject(customScene);
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          customScene.position.set(-center.x, -center.y, -center.z);

          const wrapper = new THREE.Group();
          wrapper.add(customScene);

          // Auto-orient GLTF model if its nose was exported along Y
          if (size.y > size.z && size.y > size.x) {
            wrapper.rotation.x = -Math.PI / 2;
          }

          // Proportionately large, highly visible scale
          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleVal = 14.5 / (maxDim || 1);
          wrapper.scale.set(scaleVal, scaleVal, scaleVal);

          // Replace base procedural mesh inside plane group
          while (this.plane.children.length > 0) {
            this.plane.remove(this.plane.children[0]);
          }
          this.plane.add(wrapper);

          // Re-attach beacon light and ground reticle
          const beaconLight = new THREE.PointLight(0x00f0ff, 4.5, 65);
          beaconLight.position.set(0, 3.5, 0);
          this.plane.add(beaconLight);

          const reticleGeo = new THREE.RingGeometry(2.4, 3.0, 32);
          const reticleMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending
          });
          const reticle = new THREE.Mesh(reticleGeo, reticleMat);
          reticle.rotation.x = Math.PI / 2;
          reticle.position.set(0, -1.2, 0);
          this.plane.add(reticle);
        },
        undefined,
        () => {
          if (url === '/aeroplane.glb') {
            tryLoad('/airplane.glb');
          }
        }
      );
    };

    tryLoad('/aeroplane.glb');
  }

  /**
   * Parks the plane at a specific location coordinates, strictly above the Earth surface
   */
  parkAtLocation(loc, orientationQuat = null) {
    if (!loc || !this.plane) return;
    const pos = latLngToVector3(loc.lat, loc.lng, this.radius, 0.035);
    this.plane.position.copy(pos);

    if (orientationQuat) {
      this.plane.quaternion.copy(orientationQuat);
    } else {
      const up = pos.clone().normalize();
      const tangent = new THREE.Vector3(-pos.z, 0.05, pos.x).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();
      const correctedUp = new THREE.Vector3().crossVectors(right, tangent).normalize();
      const rotMatrix = new THREE.Matrix4();
      rotMatrix.makeBasis(right, correctedUp, tangent);
      this.plane.quaternion.setFromRotationMatrix(rotMatrix);
    }
  }

  /**
   * Evaluates the 3D position above Earth along the Great-Circle flight arc.
   * GUARANTEED to strictly stay on the top layer (altitude >= radius + 3.5) across the entire arc.
   */
  getFlightPoint(t) {
    if (!this.flightState) return this.plane.position.clone();

    const { vStartUnit, vEndUnit, omega, sinOmega, startRadius, targetRadius, maxArcElevation } = this.flightState;

    // 1. Great-Circle Unit Vector via SLERP
    let uVec;
    if (sinOmega > 0.001) {
      const a = Math.sin((1 - t) * omega) / sinOmega;
      const b = Math.sin(t * omega) / sinOmega;
      uVec = new THREE.Vector3(
        a * vStartUnit.x + b * vEndUnit.x,
        a * vStartUnit.y + b * vEndUnit.y,
        a * vStartUnit.z + b * vEndUnit.z
      ).normalize();
    } else {
      uVec = vStartUnit.clone().lerp(vEndUnit, t).normalize();
    }

    // 2. Parabolic Altitude Profile strictly above the globe surface
    const baseAlt = startRadius * (1 - t) + targetRadius * t;
    const liftOffAltitude = Math.sin(t * Math.PI) * maxArcElevation;
    const currentRadius = baseAlt + liftOffAltitude;

    return uVec.multiplyScalar(currentRadius);
  }

  /**
   * Initiates flight from current position to a destination location on click.
   * Uses Spherical Great-Circle arc navigation to guarantee zero ground clipping.
   */
  flyTo(destinationLoc) {
    if (!destinationLoc) return;

    let dest = destinationLoc;
    if (typeof destinationLoc === 'string') {
      dest = LOCATIONS.find(l => l.id === destinationLoc) || LOCATIONS[0];
    }

    // If already at this location and not flying, trigger callback and return
    if (this.currentLocation?.id === dest.id && !this.isFlying) {
      if (this.onArrive) this.onArrive(dest);
      return;
    }

    // Origin is the CURRENT position of the plane
    const vStart = this.plane.position.clone();
    const vStartUnit = vStart.clone().normalize();
    const startRadius = vStart.length();

    // Destination waypoint coordinates (elevated above globe surface)
    const vEnd = latLngToVector3(dest.lat, dest.lng, this.radius, 0.035);
    const vEndUnit = vEnd.clone().normalize();
    const targetRadius = vEnd.length();

    // Great Circle Angular Distance
    const dot = Math.min(1.0, Math.max(-1.0, vStartUnit.dot(vEndUnit)));
    const omega = Math.acos(dot);
    const sinOmega = Math.sin(omega);

    // Scale flight duration between 3.0s and 4.2s based on distance
    this.flightDuration = Math.min(4.2, Math.max(3.0, 2.6 + omega * 0.7));

    // Peak parabolic arc elevation (rises 14 to 32 units above the globe surface)
    const maxArcElevation = Math.min(32.0, Math.max(14.0, (omega / Math.PI) * 36.0));

    this.flightState = {
      vStartUnit,
      vEndUnit,
      omega,
      sinOmega,
      startRadius,
      targetRadius,
      maxArcElevation
    };

    this.targetLocation = dest;
    this.flightProgress = 0;
    this.isFlying = true;

    // Immediately orient plane heading towards the departure trajectory towards destination
    const p0 = this.getFlightPoint(0.0);
    const p1 = this.getFlightPoint(0.01);
    const initForward = p1.clone().sub(p0).normalize();
    const initUp = p0.clone().normalize();
    const initRight = new THREE.Vector3().crossVectors(initForward, initUp).normalize();
    const initCorrectedUp = new THREE.Vector3().crossVectors(initRight, initForward).normalize();
    const initRot = new THREE.Matrix4();
    initRot.makeBasis(initRight, initCorrectedUp, initForward);
    this.plane.quaternion.setFromRotationMatrix(initRot);

    // Remove old route line if exists
    if (this.routeLine) {
      this.group.remove(this.routeLine);
      if (this.routeLine.geometry) this.routeLine.geometry.dispose();
      if (this.routeLine.material) this.routeLine.material.dispose();
      this.routeLine = null;
    }

    // Build Thin Dashed Cyan Route Line strictly elevated above the globe surface
    const pathSamples = 90;
    const pathPoints = [];
    for (let s = 0; s <= pathSamples; s++) {
      pathPoints.push(this.getFlightPoint(s / pathSamples));
    }

    const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMat = new THREE.LineDashedMaterial({
      color: 0x00f0ff,
      dashSize: 2.6,
      gapSize: 1.6,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.routeLine = new THREE.Line(pathGeo, pathMat);
    this.routeLine.computeLineDistances();
    this.routeLine.raycast = () => {};
    this.group.add(this.routeLine);

    // Reset trail buffer
    this.trailHistory = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      this.trailHistory.push(vStart.clone());
    }
    if (this.trailLine && this.trailLine.material) {
      this.trailLine.material.opacity = 0.95;
    }
  }

  /**
   * Main per-frame update loop called from requestAnimationFrame.
   * Realistic takeoff climb, cruise bank, destination heading & landing flare.
   */
  update(delta = 0.016) {
    if (!this.plane) return;

    if (this.isFlying && this.flightState) {
      // 1. Advance progress with ultra-smooth Quintic easing
      this.flightProgress += delta / this.flightDuration;
      const rawT = Math.min(1.0, this.flightProgress);
      const easedT = smoothQuintic(rawT);

      // 2. Position strictly on the TOP LAYER of Earth
      const pos = this.getFlightPoint(easedT);
      this.plane.position.copy(pos);

      // 3. Tangent Heading towards Destination along Great Circle
      let forward;
      if (easedT < 0.996) {
        const nextT = Math.min(1.0, easedT + 0.008);
        const nextPos = this.getFlightPoint(nextT);
        forward = nextPos.clone().sub(pos).normalize();
      } else {
        const prevT = Math.max(0.0, easedT - 0.008);
        const prevPos = this.getFlightPoint(prevT);
        forward = pos.clone().sub(prevPos).normalize();
      }

      const upNormal = pos.clone().normalize();
      const right = new THREE.Vector3().crossVectors(forward, upNormal).normalize();
      const correctedUp = new THREE.Vector3().crossVectors(right, forward).normalize();

      // 4. Realistic Aviation Flight Dynamics:
      // A. Takeoff Climb Pitch (Nose pitches UP +15 deg on liftoff)
      const climbFactor = Math.max(0.0, 1.0 - easedT / 0.32);
      const climbPitch = Math.sin(climbFactor * (Math.PI / 2)) * 0.26;

      // B. Landing Flare Pitch (Nose pulls up +10 deg to cushion touchdown)
      const flareFactor = Math.max(0.0, (easedT - 0.72) / 0.28);
      const flarePitch = Math.sin(flareFactor * Math.PI) * 0.16;

      // C. Net Pitch Angle
      const pitchAngle = climbPitch + flarePitch;

      // D. Aerodynamic Banking Roll into Turns
      const bankAngle = Math.sin(easedT * Math.PI) * 0.28;

      // Apply Banking (Roll)
      const bankedUp = correctedUp.clone().addScaledVector(right, bankAngle).normalize();
      const bankedRight = new THREE.Vector3().crossVectors(forward, bankedUp).normalize();

      // Apply Pitch (Climb / Flare)
      const pitchedForward = forward.clone().multiplyScalar(Math.cos(pitchAngle)).addScaledVector(bankedUp, Math.sin(pitchAngle)).normalize();
      const pitchedUp = bankedUp.clone().multiplyScalar(Math.cos(pitchAngle)).addScaledVector(forward, -Math.sin(pitchAngle)).normalize();

      const targetRot = new THREE.Matrix4();
      targetRot.makeBasis(bankedRight, pitchedUp, pitchedForward);
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(targetRot);

      // Delta-dampened frame-rate independent smooth rotation slerp
      const slerpFactor = Math.min(1.0, delta * 16.0);
      this.plane.quaternion.slerp(targetQuat, slerpFactor);

      // 5. Jet engine plasma pulse during flight
      const lFlame = this.plane.getObjectByName('leftFlame');
      const rFlame = this.plane.getObjectByName('rightFlame');
      if (lFlame && rFlame) {
        const pulse = 1.0 + Math.sin(rawT * Math.PI * 4) * 0.25;
        lFlame.scale.set(pulse, pulse, pulse * 1.3);
        rFlame.scale.set(pulse, pulse, pulse * 1.3);
      }

      // 6. Update Fading Glowing Trail
      this.trailHistory.unshift(pos.clone());
      if (this.trailHistory.length > TRAIL_LENGTH) {
        this.trailHistory.pop();
      }

      if (this.trailLine) {
        const posAttr = this.trailLine.geometry.attributes.position;
        const arr = posAttr.array;
        for (let j = 0; j < this.trailHistory.length; j++) {
          const p = this.trailHistory[j];
          arr[j * 3] = p.x;
          arr[j * 3 + 1] = p.y;
          arr[j * 3 + 2] = p.z;
        }
        posAttr.needsUpdate = true;
      }

      // 7. Telemetry callback during flight
      if (this.onTelemetry) {
        const pNorm = pos.clone().normalize();
        const lat = (Math.asin(pNorm.y) * 180 / Math.PI).toFixed(2);
        const lng = ((Math.atan2(pNorm.z, -pNorm.x) * 180 / Math.PI - 180) % 360).toFixed(2);
        this.onTelemetry({
          lat,
          lng,
          targetName: this.targetLocation?.title || 'TRANSIT',
          targetCity: this.targetLocation?.city || ''
        });
      }

      // 8. Arrival Touchdown Check
      if (rawT >= 1.0) {
        this.isFlying = false;
        this.currentLocation = this.targetLocation;

        // Level off and park facing arrival direction
        const finalUp = pos.clone().normalize();
        const finalRight = new THREE.Vector3().crossVectors(forward, finalUp).normalize();
        const finalCorrectedUp = new THREE.Vector3().crossVectors(finalRight, forward).normalize();
        const finalRot = new THREE.Matrix4();
        finalRot.makeBasis(finalRight, finalCorrectedUp, forward);
        const finalQuat = new THREE.Quaternion().setFromRotationMatrix(finalRot);

        this.parkAtLocation(this.currentLocation, finalQuat);

        // Fade out route line & trail
        if (this.routeLine && this.routeLine.material) {
          const lineRef = this.routeLine;
          const fadeOut = () => {
            if (lineRef && lineRef.material) {
              lineRef.material.opacity -= 0.04;
              if (lineRef.material.opacity <= 0) {
                this.group.remove(lineRef);
                if (lineRef.geometry) lineRef.geometry.dispose();
                if (lineRef.material) lineRef.material.dispose();
                if (this.routeLine === lineRef) this.routeLine = null;
              } else {
                requestAnimationFrame(fadeOut);
              }
            }
          };
          fadeOut();
        }

        if (this.trailLine && this.trailLine.material) {
          this.trailLine.material.opacity = 0;
        }

        if (this.onArrive) {
          this.onArrive(this.currentLocation);
        }
      }

    } else {
      // IDLE ANIMATION: Slow gentle bob and soft pulse at parked location
      this.idleTime += delta;
      if (this.currentLocation) {
        const basePos = latLngToVector3(this.currentLocation.lat, this.currentLocation.lng, this.radius, 0.035);
        const bob = Math.sin(this.idleTime * 1.8) * 0.35;
        const curPos = basePos.clone().normalize().multiplyScalar(this.radius + 3.5 + bob);
        this.plane.position.copy(curPos);

        // Soft pulse on ground reticle
        const reticle = this.plane.getObjectByName('groundReticle');
        if (reticle) {
          const reticleScale = 1.0 + Math.sin(this.idleTime * 2.5) * 0.15;
          reticle.scale.set(reticleScale, reticleScale, 1.0);
        }

        // Soft cyan glow pulse on materials
        const pulse = 0.35 + Math.sin(this.idleTime * 2.5) * 0.18;
        this.plane.traverse(child => {
          if (child.isMesh && child.material && child.material.emissive) {
            child.material.emissiveIntensity = pulse;
          }
        });
      }
    }
  }

  /**
   * Cleanup
   */
  dispose() {
    if (this.routeLine) {
      if (this.routeLine.geometry) this.routeLine.geometry.dispose();
      if (this.routeLine.material) this.routeLine.material.dispose();
    }
    if (this.trailLine) {
      if (this.trailLine.geometry) this.trailLine.geometry.dispose();
      if (this.trailLine.material) this.trailLine.material.dispose();
    }
    if (this.plane) {
      this.plane.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
    if (this.group.parent) {
      this.group.parent.remove(this.group);
    }
  }
}
