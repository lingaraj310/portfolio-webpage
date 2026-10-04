import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { latLngToVector3 } from './geoData';
import { LOCATIONS } from '../../data/portfolioData';

/**
 * Creates a sleek, lightweight low-poly aeroplane model from primitives as initial/fallback model.
 */
function createLowPolyAirplaneMesh() {
  const plane = new THREE.Group();
  plane.name = 'flightAirplane';

  // 1. Fuselage
  const bodyGeo = new THREE.ConeGeometry(0.7, 4.2, 8);
  bodyGeo.rotateX(Math.PI / 2);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.85,
    roughness: 0.15,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.35
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  plane.add(bodyMesh);

  // 2. Cockpit Visor
  const visorGeo = new THREE.BoxGeometry(0.5, 0.35, 1.2);
  visorGeo.translate(0, 0.32, 0.4);
  const visorMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.95
  });
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  plane.add(visorMesh);

  // 3. Delta Swept Main Wings
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0.8);
  wingShape.lineTo(2.8, -1.4);
  wingShape.lineTo(0.6, -1.0);
  wingShape.lineTo(-0.6, -1.0);
  wingShape.lineTo(-2.8, -1.4);
  wingShape.closePath();

  const wingExtrude = new THREE.ExtrudeGeometry(wingShape, { depth: 0.12, bevelEnabled: false });
  wingExtrude.rotateX(Math.PI / 2);
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.9,
    roughness: 0.15,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.25
  });
  const wingMesh = new THREE.Mesh(wingExtrude, wingMat);
  wingMesh.position.y = 0.02;
  plane.add(wingMesh);

  // 4. Vertical Stabilizer Tail Fin
  const tailShape = new THREE.Shape();
  tailShape.moveTo(0, 0);
  tailShape.lineTo(0, 1.2);
  tailShape.lineTo(-0.8, 0);
  tailShape.closePath();
  const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.1, bevelEnabled: false });
  tailGeo.rotateY(Math.PI / 2);
  const tailMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    metalness: 0.9,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.45
  });
  const tailMesh = new THREE.Mesh(tailGeo, tailMat);
  tailMesh.position.set(0, 0.18, -1.6);
  plane.add(tailMesh);

  // 5. Wingtip Lights (Port Red / Starboard Cyan)
  const tipGeo = new THREE.SphereGeometry(0.2, 6, 6);
  const leftTip = new THREE.Mesh(tipGeo, new THREE.MeshBasicMaterial({ color: 0xff0055 }));
  leftTip.position.set(-2.8, 0.05, -1.4);
  plane.add(leftTip);

  const rightTip = new THREE.Mesh(tipGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
  rightTip.position.set(2.8, 0.05, -1.4);
  plane.add(rightTip);

  // 6. Jet Flame Glow Cones
  const flameGeo = new THREE.ConeGeometry(0.3, 1.6, 6);
  flameGeo.rotateX(-Math.PI / 2);
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const flameMesh = new THREE.Mesh(flameGeo, flameMat);
  flameMesh.position.set(0, 0, -2.4);
  flameMesh.name = 'engineFlame';
  plane.add(flameMesh);

  // Prevent raycast interception
  plane.traverse(child => {
    child.raycast = () => {};
  });

  return plane;
}

/**
 * 6 Intercontinental City-to-City Flight Routes between portfolio waypoints
 */
const ROUTE_DEFINITIONS = [
  { fromId: 'about', toId: 'projects', speed: 0.045, heightFactor: 0.20 },      // Madurai -> Tokyo
  { fromId: 'projects', toId: 'protosem', speed: 0.038, heightFactor: 0.24 },   // Tokyo -> San Francisco
  { fromId: 'protosem', toId: 'experience', speed: 0.052, heightFactor: 0.18 }, // San Francisco -> New York
  { fromId: 'experience', toId: 'skillset', speed: 0.042, heightFactor: 0.22 }, // New York -> Berlin
  { fromId: 'skillset', toId: 'resume', speed: 0.036, heightFactor: 0.25 },     // Berlin -> Cape Town
  { fromId: 'resume', toId: 'about', speed: 0.048, heightFactor: 0.21 }         // Cape Town -> Madurai
];

const TRAIL_LENGTH = 40;

export class FlightSystem {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'flightSystemGroup';
    this.flights = [];
    this.visible = true;
    this.radius = 100;
    this.customGlbModel = null;
  }

  /**
   * Initializes all routes, planes, and fading trails as children of earthGroup.
   */
  init(earthGroup, radius = 100) {
    this.radius = radius;
    const baseModel = createLowPolyAirplaneMesh();

    ROUTE_DEFINITIONS.forEach((def, index) => {
      const fromLoc = LOCATIONS.find(l => l.id === def.fromId);
      const toLoc = LOCATIONS.find(l => l.id === def.toId);
      if (!fromLoc || !toLoc) return;

      // 1. Start & End 3D vectors
      const vStart = latLngToVector3(fromLoc.lat, fromLoc.lng, radius, 0.015);
      const vEnd = latLngToVector3(toLoc.lat, toLoc.lng, radius, 0.015);

      // 2. Parabolic Midpoint Control Vector
      const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
      const targetAltitude = radius * (1 + def.heightFactor);
      const controlPoint = mid.clone().normalize().multiplyScalar(targetAltitude);

      // 3. 3D Quadratic Bezier Flight Curve
      const curve = new THREE.QuadraticBezierCurve3(vStart, controlPoint, vEnd);

      // 4. Dashed Arc Flight Path (Low Opacity ~0.28)
      const pathPoints = curve.getPoints(70);
      const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
      const pathMat = new THREE.LineDashedMaterial({
        color: 0x00f0ff,
        dashSize: 2.2,
        gapSize: 1.6,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const pathLine = new THREE.Line(pathGeo, pathMat);
      pathLine.computeLineDistances();
      pathLine.raycast = () => {};
      this.group.add(pathLine);

      // 5. Plane Mesh (Clone of base model)
      const plane = baseModel.clone();
      const initialProgress = (index * (1.0 / ROUTE_DEFINITIONS.length)) % 1.0;
      this.group.add(plane);

      // 6. Fading Glowing Trail Buffer Geometry (40 historical positions)
      const trailPositions = new Float32Array(TRAIL_LENGTH * 3);
      const trailColors = new Float32Array(TRAIL_LENGTH * 3);
      const startPt = curve.getPointAt(initialProgress);

      const cyanColor = new THREE.Color(0x00f0ff);
      const darkColor = new THREE.Color(0x010814);

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        trailPositions[i * 3] = startPt.x;
        trailPositions[i * 3 + 1] = startPt.y;
        trailPositions[i * 3 + 2] = startPt.z;

        // Fade from cyan (head) to transparent/dark (tail)
        const alpha = 1.0 - (i / TRAIL_LENGTH);
        const c = darkColor.clone().lerp(cyanColor, alpha * alpha);
        trailColors[i * 3] = c.r;
        trailColors[i * 3 + 1] = c.g;
        trailColors[i * 3 + 2] = c.b;
      }

      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

      const trailMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const trailLine = new THREE.Line(trailGeo, trailMat);
      trailLine.raycast = () => {};
      this.group.add(trailLine);

      // History ring buffer for the trail
      const history = [];
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        history.push(startPt.clone());
      }

      this.flights.push({
        plane,
        curve,
        speed: def.speed,
        progress: initialProgress,
        trailLine,
        trailPositions,
        history,
        pathLine
      });
    });

    earthGroup.add(this.group);

    // Asynchronously load custom aeroplane.glb model and apply to all flight routes
    this.loadCustomGlbModel();
  }

  /**
   * Loads the custom 3D aeroplane.glb model and updates all active flight planes.
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
                node.material.roughness = 0.25;
                node.material.metalness = 0.75;
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

          // Proportionate scale for flight routes
          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleVal = 5.2 / (maxDim || 1);
          wrapper.scale.set(scaleVal, scaleVal, scaleVal);

          this.customGlbModel = wrapper;

          // Replace model inside all active flight instances
          this.flights.forEach(f => {
            if (f.plane) {
              const modelClone = wrapper.clone(true);
              modelClone.traverse(child => {
                child.raycast = () => {};
              });

              // Clear procedural meshes and add GLB model
              while (f.plane.children.length > 0) {
                f.plane.remove(f.plane.children[0]);
              }
              f.plane.add(modelClone);
            }
          });
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
   * Updates all airplane positions, tangents, banking, and trails per frame with delta time.
   */
  update(delta = 0.016) {
    if (!this.visible || this.flights.length === 0) return;

    for (let i = 0; i < this.flights.length; i++) {
      const f = this.flights[i];
      f.progress = (f.progress + delta * f.speed) % 1.0;
      const t = f.progress;

      // 1. Position on Curve
      const pos = f.curve.getPointAt(t);
      f.plane.position.copy(pos);

      // 2. Tangent & Orientation Along Path
      const tangent = f.curve.getTangentAt(t).normalize();
      const upNormal = pos.clone().normalize();
      const right = new THREE.Vector3().crossVectors(tangent, upNormal).normalize();
      const correctedUp = new THREE.Vector3().crossVectors(right, tangent).normalize();

      // Banking into curved turn + altitude sine variation
      const bankAngle = Math.sin(t * Math.PI * 2) * 0.24;
      const bankedUp = correctedUp.clone().addScaledVector(right, bankAngle).normalize();
      const bankedRight = new THREE.Vector3().crossVectors(tangent, bankedUp).normalize();

      const rotMatrix = new THREE.Matrix4();
      rotMatrix.makeBasis(bankedRight, bankedUp, tangent);
      f.plane.quaternion.setFromRotationMatrix(rotMatrix);

      // 3. Update Fading Trail History
      f.history.unshift(pos.clone());
      if (f.history.length > TRAIL_LENGTH) {
        f.history.pop();
      }

      const posAttr = f.trailLine.geometry.attributes.position;
      const arr = posAttr.array;
      for (let j = 0; j < f.history.length; j++) {
        const p = f.history[j];
        arr[j * 3] = p.x;
        arr[j * 3 + 1] = p.y;
        arr[j * 3 + 2] = p.z;
      }
      posAttr.needsUpdate = true;
    }
  }

  /**
   * Toggle visibility of all flight routes and aircraft
   */
  setVisible(show) {
    this.visible = show;
    this.group.visible = show;
  }

  /**
   * Cleans up all geometries, materials, and meshes
   */
  dispose() {
    this.flights.forEach(f => {
      if (f.pathLine) {
        if (f.pathLine.geometry) f.pathLine.geometry.dispose();
        if (f.pathLine.material) f.pathLine.material.dispose();
      }
      if (f.trailLine) {
        if (f.trailLine.geometry) f.trailLine.geometry.dispose();
        if (f.trailLine.material) f.trailLine.material.dispose();
      }
      if (f.plane) {
        f.plane.traverse(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      }
    });
    this.flights = [];
    if (this.group.parent) {
      this.group.parent.remove(this.group);
    }
  }
}
