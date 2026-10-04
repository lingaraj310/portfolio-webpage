import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { 
  RotateCw, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Download, 
  Layers, 
  Sun, 
  Grid, 
  Sparkles, 
  Box, 
  RefreshCw,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function Interactive3DModelViewer({
  modelUrl = '/protosem/week-06/Lingaraj_v.glb',
  fallbackStlUrl = '/protosem/week-06/Lingaraj v.stl',
  title = 'Lingaraj_v — 3D CAD Parametric Model',
  subtitle = 'OPPO A3x 5G Custom Snap-Fit Phone Case Prototype',
  initialMaterialMode = 'studio' // 'studio' | 'wireframe' | 'metallic' | 'blueprint'
}) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [materialMode, setMaterialMode] = useState(initialMaterialMode);
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelStats, setModelStats] = useState({ vertices: 0, faces: 0, dimensions: 'Loading...' });

  // Refs for animation & controls
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelMeshRef = useRef(null);
  const gridHelperRef = useRef(null);
  const initialCameraPosRef = useRef(new THREE.Vector3(0, 50, 150));
  const reqAnimationIdRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf1f5f9); // Crisp platinum studio background

    // 2. CAMERA SETUP
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 80, 180);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;
    controls.maxDistance = 600;
    controls.minDistance = 20;
    controlsRef.current = controls;

    // 5. LIGHTING SETUP (Studio 3-Point PBR Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainKeyLight.position.set(120, 200, 150);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 2048;
    mainKeyLight.shadow.mapSize.height = 2048;
    mainKeyLight.shadow.bias = -0.0001;
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.8);
    fillLight.position.set(-120, -60, -100);
    scene.add(fillLight);

    const topRimLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
    topRimLight.position.set(0, 250, -150);
    scene.add(topRimLight);

    // 6. BUILD PLATE GRID HELPER (Engineering Bed)
    const grid = new THREE.GridHelper(240, 24, 0x3b82f6, 0xcbd5e1);
    grid.position.y = -0.1;
    scene.add(grid);
    gridHelperRef.current = grid;

    // Subtle Ground Shadow Plane
    const planeGeo = new THREE.PlaneGeometry(300, 300);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowPlane = new THREE.Mesh(planeGeo, planeMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Helper to process geometry and center model
    const setupModelObject = (object3D) => {
      let vertCount = 0;
      let faceCount = 0;

      // Center and scale object to fit view
      const box = new THREE.Box3().setFromObject(object3D);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Re-center geometry at origin
      object3D.position.x += object3D.position.x - center.x;
      object3D.position.y += object3D.position.y - center.y + (size.y / 2);
      object3D.position.z += object3D.position.z - center.z;

      // Apply materials & shadows
      object3D.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.geometry) {
            child.geometry.computeVertexNormals();
            if (child.geometry.attributes.position) {
              vertCount += child.geometry.attributes.position.count;
            }
            if (child.geometry.index) {
              faceCount += child.geometry.index.count / 3;
            } else if (child.geometry.attributes.position) {
              faceCount += child.geometry.attributes.position.count / 3;
            }
          }
        }
      });

      // Fit camera nicely
      const maxDim = Math.max(size.x, size.y, size.z) || 100;
      const fov = camera.fov * (Math.PI / 180);
      let cameraDistance = Math.abs(maxDim / Math.sin(fov / 2)) * 0.9;
      camera.position.set(maxDim * 0.9, maxDim * 0.8, cameraDistance);
      camera.lookAt(0, size.y / 2, 0);
      controls.target.set(0, size.y / 2, 0);
      controls.update();

      initialCameraPosRef.current.copy(camera.position);
      modelMeshRef.current = object3D;
      scene.add(object3D);

      setModelStats({
        vertices: vertCount.toLocaleString(),
        faces: Math.round(faceCount).toLocaleString(),
        dimensions: `${size.x.toFixed(1)} × ${size.y.toFixed(1)} × ${size.z.toFixed(1)} mm`
      });

      applyMaterial(materialMode, object3D);
      setLoading(false);
    };

    // 7. LOAD 3D MODEL (.GLB FIRST, FALLBACK TO .STL)
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      modelUrl,
      (gltf) => {
        setupModelObject(gltf.scene);
      },
      undefined,
      (err) => {
        console.warn('GLTF loading failed, attempting STL fallback...', err);
        const stlLoader = new STLLoader();
        stlLoader.load(
          fallbackStlUrl,
          (geometry) => {
            const material = new THREE.MeshStandardMaterial({
              color: 0x2563eb,
              roughness: 0.25,
              metalness: 0.15,
            });
            const mesh = new THREE.Mesh(geometry, material);
            const group = new THREE.Group();
            group.add(mesh);
            setupModelObject(group);
          },
          undefined,
          (stlErr) => {
            console.error('3D Model STL load failed:', stlErr);
            setLoadError('Unable to load 3D CAD model file. Please ensure the file is in public/protosem/week-06.');
            setLoading(false);
          }
        );
      }
    );

    // 8. ANIMATION LOOP
    const animate = () => {
      reqAnimationIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqAnimationIdRef.current) cancelAnimationFrame(reqAnimationIdRef.current);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl, fallbackStlUrl]);

  // MATERIAL STYLES ENGINE
  const applyMaterial = (mode, modelObj = modelMeshRef.current) => {
    if (!modelObj) return;

    modelObj.traverse((child) => {
      if (child.isMesh) {
        switch (mode) {
          case 'wireframe':
            child.material = new THREE.MeshStandardMaterial({
              color: 0x0284c7,
              wireframe: true,
              roughness: 0.1,
              metalness: 0.9
            });
            break;
          case 'metallic':
            child.material = new THREE.MeshStandardMaterial({
              color: 0x334155,
              metalness: 0.85,
              roughness: 0.15,
              envMapIntensity: 1.5
            });
            break;
          case 'blueprint':
            child.material = new THREE.MeshStandardMaterial({
              color: 0x1d4ed8,
              roughness: 0.3,
              metalness: 0.1,
              transparent: true,
              opacity: 0.85
            });
            break;
          case 'studio':
          default:
            child.material = new THREE.MeshStandardMaterial({
              color: 0x1e293b,
              roughness: 0.2,
              metalness: 0.3,
              clearcoat: 0.4,
              clearcoatRoughness: 0.1
            });
            break;
        }
        child.material.needsUpdate = true;
      }
    });
  };

  const handleMaterialChange = (mode) => {
    sound.playSelect();
    setMaterialMode(mode);
    applyMaterial(mode);
  };

  const toggleAutoRotate = () => {
    sound.playSelect();
    const next = !autoRotate;
    setAutoRotate(next);
    if (controlsRef.current) controlsRef.current.autoRotate = next;
  };

  const toggleGrid = () => {
    sound.playSelect();
    const next = !showGrid;
    setShowGrid(next);
    if (gridHelperRef.current) gridHelperRef.current.visible = next;
  };

  const resetCamera = () => {
    sound.playSelect();
    if (cameraRef.current && controlsRef.current && modelMeshRef.current) {
      const box = new THREE.Box3().setFromObject(modelMeshRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 100;
      cameraRef.current.position.set(maxDim * 0.9, maxDim * 0.8, maxDim * 1.5);
      controlsRef.current.target.set(0, size.y / 2, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-slate-300 bg-slate-900 shadow-2xl transition-all ${
      isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : 'w-full my-6'
    }`}>
      
      {/* TOP CAD WORKBENCH CONTROLS BAR */}
      <div className="absolute top-0 inset-x-0 z-20 px-4 sm:px-6 py-3.5 bg-white/90 backdrop-blur-xl border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-slate-800">
        
        {/* Left: Title & Spec */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 shadow-sm">
            <Box className="w-5 h-5 text-blue-600 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-orbitron font-extrabold text-sm sm:text-base text-slate-900">
                {title}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold">
                INTERACTIVE 3D
              </span>
            </div>
            <p className="text-xs text-slate-500 font-space font-medium hidden sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Render Modes & View Controls */}
        <div className="flex items-center space-x-2">
          
          {/* Shading Material Dropdown / Toggle */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs font-mono">
            <button
              onClick={() => handleMaterialChange('studio')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                materialMode === 'studio' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Solid Studio Shading"
            >
              Solid
            </button>
            <button
              onClick={() => handleMaterialChange('wireframe')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                materialMode === 'wireframe' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Wireframe CAD Inspection"
            >
              Wireframe
            </button>
            <button
              onClick={() => handleMaterialChange('metallic')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                materialMode === 'metallic' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Metallic Titanium Render"
            >
              Metallic
            </button>
          </div>

          {/* Turntable Auto-Rotate */}
          <button
            onClick={toggleAutoRotate}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              autoRotate 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title={autoRotate ? 'Pause Turntable Rotation' : 'Enable 360° Auto-Rotate'}
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          {/* Grid Toggle */}
          <button
            onClick={toggleGrid}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              showGrid 
                ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-sm' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Toggle Engineering Build Grid"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Reset Camera */}
          <button
            onClick={resetCamera}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
            title="Reset Camera View"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Download 3D Model */}
          <a
            href={modelUrl}
            download="Lingaraj_v.glb"
            className="p-2 rounded-xl bg-slate-900 hover:bg-blue-700 text-white transition-all shadow-sm flex items-center space-x-1"
            title="Download 3D CAD .GLB / .STL Model"
          >
            <Download className="w-4 h-4" />
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              sound.playSelect();
              setIsFullscreen(!isFullscreen);
            }}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D CANVAS VIEWPORT */}
      <div 
        ref={mountRef} 
        className={`w-full cursor-grab active:cursor-grabbing ${
          isFullscreen ? 'h-full' : 'h-[440px] sm:h-[520px]'
        }`}
      />

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="absolute inset-0 z-30 bg-slate-100/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">
            Loading 3D CAD Mesh & Initializing Shaders...
          </p>
        </div>
      )}

      {/* ERROR FALLBACK */}
      {loadError && (
        <div className="absolute inset-0 z-30 bg-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <Box className="w-12 h-12 text-rose-500" />
          <p className="font-orbitron font-bold text-sm text-slate-900">{loadError}</p>
          <a
            href="/protosem/week-06/Lingaraj v.stl"
            download="Lingaraj v.stl"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Lingaraj v.stl directly</span>
          </a>
        </div>
      )}

      {/* BOTTOM HUD STATUS & INSTRUCTION OVERLAY */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Geometric Specs Badge */}
        <div className="px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-mono font-bold text-slate-700 shadow-lg flex items-center space-x-3 pointer-events-auto">
          <span className="flex items-center space-x-1 text-blue-700">
            <Cpu className="w-3.5 h-3.5" />
            <span>VERTS: {modelStats.vertices}</span>
          </span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-slate-600">FACES: {modelStats.faces}</span>
          <span className="text-slate-300 hidden sm:inline">&bull;</span>
          <span className="text-emerald-700 hidden sm:inline">BOUNDS: {modelStats.dimensions}</span>
        </div>

        {/* Right: Interaction Guide */}
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-200 shadow-lg flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Left Drag: Orbit &bull; Right Drag: Pan &bull; Scroll: Zoom</span>
        </div>
      </div>
    </div>
  );
}
