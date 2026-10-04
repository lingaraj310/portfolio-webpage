import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Play, 
  Pause, 
  Home, 
  Ruler, 
  Maximize2, 
  Download, 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Box, 
  Sparkles,
  AlertCircle,
  Clock,
  Weight,
  Check
} from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

export default function Model3DViewer() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelMeshRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const initialCamPosRef = useRef(new THREE.Vector3(0, 0, 200));

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [dimensions, setDimensions] = useState(null); // { length, width, height }
  const [loadedFormat, setLoadedFormat] = useState('GLB');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup (Perspective)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 80, 220);
    cameraRef.current = camera;

    // 3. Renderer Setup
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

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.minDistance = 30;
    controls.maxDistance = 600;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // Stop auto-rotate on user manual interaction
    const onUserInteraction = () => {
      if (controls.autoRotate) {
        controls.autoRotate = false;
        setIsAutoRotating(false);
      }
    };
    controls.addEventListener('start', onUserInteraction);
    controlsRef.current = controls;

    // 5. Lighting (Engineering Studio Rig)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    mainKeyLight.position.set(150, 200, 180);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.4);
    fillLight.position.set(-180, 80, -120);
    scene.add(fillLight);

    const topRimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    topRimLight.position.set(0, 250, 50);
    scene.add(topRimLight);

    const bottomBounce = new THREE.DirectionalLight(0x64748b, 0.8);
    bottomBounce.position.set(0, -180, 80);
    scene.add(bottomBounce);

    // Subtle Grid Floor for Light Stage
    const gridHelper = new THREE.GridHelper(300, 20, 0x0284c7, 0xcfd8dc);
    gridHelper.position.y = -95;
    scene.add(gridHelper);

    // 6. Model Loader (Neutral Matte Tech PLA Finish)
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // Crisp tech royal blue/sky PLA finish for vibrant contrast on light stage
      roughness: 0.35,
      metalness: 0.12,
      flatShading: false,
      side: THREE.DoubleSide
    });

    const setupLoadedMesh = (meshOrGroup) => {
      // 1. Check raw size to detect meter units vs mm units
      let rawBox = new THREE.Box3().setFromObject(meshOrGroup);
      let rawSize = new THREE.Vector3();
      rawBox.getSize(rawSize);

      // If dimensions are < 5, the model was exported in meters -> scale up by 1000 to mm
      if (Math.max(rawSize.x, rawSize.y, rawSize.z) < 5) {
        meshOrGroup.scale.set(1000, 1000, 1000);
        meshOrGroup.updateMatrixWorld(true);
      }

      // Recompute bounding box after scale
      const box = new THREE.Box3().setFromObject(meshOrGroup);
      const size = new THREE.Vector3();
      box.getSize(size);

      // Extract accurate dimensions in millimeters
      const dims = [size.x, size.y, size.z].sort((a, b) => b - a);
      setDimensions({
        length: (Math.round(dims[0] * 10) / 10).toFixed(1), // ~165.7 mm
        width: (Math.round(dims[1] * 10) / 10).toFixed(1),  // ~76.0 mm
        height: (Math.round(dims[2] * 10) / 10).toFixed(1)  // ~7.7 mm
      });

      // Center geometry around origin (0, 0, 0)
      const center = new THREE.Vector3();
      box.getCenter(center);
      meshOrGroup.position.sub(center);

      // Add to scene
      scene.add(meshOrGroup);
      modelMeshRef.current = meshOrGroup;

      // Adjust Grid Floor to be right beneath the phone case
      gridHelper.position.y = -(size.y / 2) - 15;

      // Fit Camera to Model
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraDistance = (maxDim / 2) / Math.tan(fov / 2) * 1.5;
      cameraDistance = Math.max(cameraDistance, 180);

      camera.position.set(0, 30, cameraDistance);
      camera.lookAt(0, 0, 0);
      initialCamPosRef.current.copy(camera.position);

      controls.target.set(0, 0, 0);
      controls.minDistance = 50;
      controls.maxDistance = 800;
      controls.update();

      setIsLoading(false);
    };

    // Load STL directly (100% authentic geometry) with fallback to GLB
    const loadSTL = () => {
      const stlLoader = new STLLoader();
      stlLoader.load(
        '/protosem/week-06/Lingaraj v.stl',
        (geometry) => {
          geometry.computeVertexNormals();
          geometry.center();
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          setLoadedFormat('STL');
          setupLoadedMesh(mesh);
        },
        undefined,
        (stlErr) => {
          console.warn('STL direct load failed, falling back to GLB:', stlErr);
          loadGLB();
        }
      );
    };

    const loadGLB = () => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/protosem/week-06/Lingaraj_v.glb',
        (gltf) => {
          const model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              child.material = material;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          setLoadedFormat('GLB');
          setupLoadedMesh(model);
        },
        undefined,
        (glbErr) => {
          console.error('All 3D model formats failed to load:', glbErr);
          setIsLoading(false);
          setLoadError('Unable to load the 3D model. Please check the model file.');
        }
      );
    };

    // Start loading with STL
    loadSTL();

    // 7. Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (controlsRef.current) {
        controlsRef.current.removeEventListener('start', onUserInteraction);
        controlsRef.current.dispose();
      }
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  // Control Actions
  const handleAutoRotateToggle = () => {
    sound.playSelect();
    if (!controlsRef.current) return;
    const nextState = !isAutoRotating;
    controlsRef.current.autoRotate = nextState;
    setIsAutoRotating(nextState);
  };

  const handleResetView = () => {
    sound.playSelect();
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.copy(initialCamPosRef.current);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  const handleFitModel = () => {
    sound.playSelect();
    handleResetView();
  };

  const handleZoomIn = () => {
    sound.playHover();
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.multiplyScalar(0.85);
    controlsRef.current.update();
  };

  const handleZoomOut = () => {
    sound.playHover();
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.multiplyScalar(1.15);
    controlsRef.current.update();
  };

  const handleRotateStep = () => {
    sound.playSelect();
    if (!modelMeshRef.current) return;
    modelMeshRef.current.rotation.y += Math.PI / 4; // 45 degree snap
  };

  return (
    <div className="w-full space-y-6 font-sans select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-bold tracking-wider uppercase mb-1.5">
            <Box className="w-3.5 h-3.5" />
            <span>Interactive 3D Model Viewer</span>
          </div>
          <h3 
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            OPPO A3x 5G Mobile Cover
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
            Explore the OPPO A3x 5G mobile cover by rotating, zooming and inspecting the model.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>3D Printed Prototype</span>
        </div>
      </div>

      {/* Main Interactive Stage & Technical Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 1. Large 3D Viewer Canvas Column (7 cols on desktop) */}
        <div className="lg:col-span-7 relative rounded-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 border border-slate-200 shadow-md overflow-hidden">
          
          {/* Canvas Viewport */}
          <div 
            ref={containerRef} 
            className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing relative"
          />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center space-y-3 z-20">
              <div className="w-10 h-10 rounded-full border-3 border-sky-200 border-t-sky-600 animate-spin" />
              <div className="text-sm font-mono font-semibold text-slate-700">
                Loading 3D model…
              </div>
            </div>
          )}

          {/* Error Message */}
          {loadError && (
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center space-y-3 z-20">
              <AlertCircle className="w-10 h-10 text-rose-500" />
              <div className="text-sm font-bold text-rose-700">{loadError}</div>
              <p className="text-xs text-slate-600 max-w-sm">
                Expected file at <code className="text-sky-700">/protosem/week-06/Lingaraj v.stl</code>
              </p>
            </div>
          )}

          {/* Floating HUD Controls Bar */}
          <div className="absolute top-4 right-4 z-10 flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-md">
            
            <button
              onClick={handleRotateStep}
              title="Rotate 45°"
              aria-label="Rotate 45 degrees"
              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleZoomIn}
              title="Zoom In"
              aria-label="Zoom in"
              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              aria-label="Zoom out"
              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetView}
              title="Reset View"
              aria-label="Reset view orientation"
              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleAutoRotateToggle}
              title={isAutoRotating ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
              aria-label="Toggle auto rotation"
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                isAutoRotating 
                  ? 'bg-sky-100 text-sky-700 border border-sky-300 shadow-xs' 
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handleFitModel}
              title="Fit Model"
              aria-label="Fit model to view"
              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Left Dimensions Badge */}
          {dimensions && (
            <div className="absolute bottom-4 left-4 z-10 p-2.5 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md text-[11px] font-mono text-slate-700 space-y-0.5 shadow-md">
              <div className="text-sky-700 font-bold flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5" />
                <span>Extracted Bounding Box</span>
              </div>
              <div className="text-slate-900 font-semibold">
                {dimensions.length} mm × {dimensions.width} mm × {dimensions.height} mm
              </div>
            </div>
          )}

          {/* Desktop & Mobile Interaction Tip */}
          <div className="absolute bottom-4 right-4 z-10 hidden sm:block px-2.5 py-1 rounded-lg bg-white/80 border border-slate-200 text-[10px] font-mono text-slate-600 shadow-xs">
            Drag to rotate &bull; Scroll to zoom &bull; Right-drag to pan
          </div>
        </div>

        {/* 2. Technical Information Panel (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Engineering Specs Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono font-bold text-sky-700 uppercase">
                Technical Specifications
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Format: {loadedFormat} / STL
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs font-mono">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">MODEL</span>
                <span className="text-slate-900 font-bold">OPPO A3x 5G Mobile Cover</span>
              </div>

              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">DESIGNED IN</span>
                <span className="text-sky-700 font-bold">Autodesk Fusion 360</span>
              </div>

              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">SOURCE FORMAT</span>
                <span className="text-slate-900 font-semibold">STL</span>
              </div>

              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">WEB VIEW FORMAT</span>
                <span className="text-emerald-700 font-bold">{loadedFormat} (Three.js WebGL)</span>
              </div>

              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">MANUFACTURING METHOD</span>
                <span className="text-slate-900 font-semibold">FDM 3D Printing</span>
              </div>

              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">MATERIAL</span>
                <span className="text-amber-700 font-bold">PLA</span>
              </div>

              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">PRINT TIME</span>
                <span className="text-slate-900 font-bold">1 h 17 min</span>
              </div>

              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">MATERIAL USED</span>
                <span className="text-emerald-700 font-bold">30 g</span>
              </div>

              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500">FIT TEST</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Tested on OPPO A3x 5G
                </span>
              </div>
            </div>

            {/* Direct Download Action */}
            <div className="pt-2">
              <a
                href="/protosem/week-06/Lingaraj v.stl"
                download="Lingaraj_v.stl"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-sky-700 text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Original Source STL File (1.1 MB)</span>
              </a>
            </div>
          </div>

          {/* Expandable Model Details Panel */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <button
              onClick={() => {
                sound.playSelect();
                setShowDetails(!showDetails);
              }}
              className="w-full p-4 flex items-center justify-between text-xs font-mono font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Model Details &amp; Design Notes</span>
              </span>
              {showDetails ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {showDetails && (
              <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed font-normal space-y-2 border-t border-slate-100">
                <p>
                  <strong className="text-slate-800">Designed completely in Autodesk Fusion 360</strong> as a functional OPPO A3x 5G mobile-cover prototype.
                </p>
                <p>
                  The model was created specifically for additive manufacturing (DfAM) with 1.80 mm uniform wall thickness, 2.50 mm chamfered camera island relief, and precision elastic snap-fit retention lips. Sliced in Bambu Studio with 15% Gyroid infill and manufactured on the Bambu Lab H2S printer.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Context Note Below Viewer */}
      <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 text-xs text-slate-700 leading-relaxed font-normal">
        <strong className="text-slate-900 font-semibold">Workflow Provenance: </strong>
        This model was designed completely in Autodesk Fusion 360, exported as an STL file, prepared for slicing in Bambu Studio, and successfully manufactured using PLA through FDM 3D printing.
      </div>
    </div>
  );
}
