import React, { useState, useEffect, useCallback } from 'react';
import GlobeCanvas from './components/globe/GlobeCanvas';
import HeroOverlay from './components/ui/HeroOverlay';
import SideMissionMatrix from './components/ui/SideMissionMatrix';
import GlobeControlsWidget from './components/ui/GlobeControlsWidget';
import PinOverlays from './components/ui/PinOverlays';
import TelemetryHUD from './components/ui/TelemetryHUD';
import DetailModal from './components/panels/DetailModal';
import ErrorBoundary from './components/common/ErrorBoundary';
import { LOCATIONS } from './data/portfolioData';
import { sound } from './utils/audioEffects';

export default function App() {
  // Navigation & Lifecycle Stages: 'hero' | 'descending' | 'orbit' | 'traveling' | 'landed'
  const [currentStage, setCurrentStage] = useState('hero');
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0]); // Default: Madurai / Tamil Nadu
  const [projectedPins, setProjectedPins] = useState({});
  const [telemetryData, setTelemetryData] = useState(null);
  const [zoomAction, setZoomAction] = useState(null);
  
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [flightsEnabled, setFlightsEnabled] = useState(true);
  
  // Section Room Modal state (Direct Entry - No confirmation popup)
  const [modalOpen, setModalOpen] = useState(false);

  // 1. Enter Universe Action (Cover page -> Global View centered on India)
  const handleEnterUniverse = () => {
    sound.playWarp();
    setCurrentStage('descending');
    setActiveLocation(LOCATIONS[0]); // Madurai, Tamil Nadu, India
    
    setTimeout(() => {
      setCurrentStage('orbit');
      sound.playArrival();
    }, 2800);
  };

  // 2. Direct Section Entry: Fly plane to target location + Open Full-Screen Room upon touchdown
  const handleSelectSection = (loc, isArrival = false) => {
    if (!loc) return;

    if (isArrival) {
      // Plane has arrived and landed at the destination city pin
      setCurrentStage('landed');
      setModalOpen(true);
      sound.playArrival();
      return;
    }

    // If already parked at this location and modal is closed, open it directly
    if (activeLocation?.id === loc.id && currentStage !== 'traveling') {
      setCurrentStage('landed');
      setModalOpen(true);
      sound.playSelect();
      return;
    }

    // Take off and fly to destination
    sound.playSelect();
    sound.playWarp();
    setActiveLocation(loc);
    setCurrentStage('traveling');
  };

  // 3. Smoothly rotate the Earth without immediately opening modal (on hover or preview)
  const handleFlyToLocation = (loc) => {
    if (!loc) return;
    setActiveLocation(loc);
  };

  // 4. Back to My World / Exit Section Room -> Return to India & Orbit view
  const handleCloseDetail = () => {
    sound.playSelect();
    setModalOpen(false);
    setCurrentStage('orbit');
  };

  // 5. Return to Home Base (Madurai, Tamil Nadu)
  const handleReturnToHomeBase = () => {
    handleSelectSection(LOCATIONS[0]);
  };

  // 6. Reset to Cover Page ("Welcome to My World")
  const handleResetToHero = () => {
    sound.playSelect();
    setModalOpen(false);
    setCurrentStage('hero');
  };

  // 7. Zoom Handlers
  const handleZoomIn = () => {
    setZoomAction({ type: 'in', timestamp: Date.now() });
  };

  const handleZoomOut = () => {
    setZoomAction({ type: 'out', timestamp: Date.now() });
  };

  const handleToggleAutoRotate = () => {
    setIsAutoRotating(prev => !prev);
  };

  const handleToggleFlights = () => {
    setFlightsEnabled(prev => !prev);
  };

  const handleOpenResume = () => {
    const resumeLoc = LOCATIONS.find(l => l.id === 'resume') || LOCATIONS[7];
    handleSelectSection(resumeLoc);
  };

  // Callback from Three.js render loop to project 3D pins to 2D screen coordinates
  const handlePinProject = useCallback((projected) => {
    setProjectedPins(projected);
  }, []);

  // Telemetry callback
  const handleTelemetryUpdate = useCallback((data) => {
    setTelemetryData(data);
  }, []);

  // Global Keyboard Shortcuts (1-9 to fast jump, ESC to exit, M for sound)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC key to return from section room
      if (e.key === 'Escape') {
        if (modalOpen) {
          handleCloseDetail();
        }
      }

      // M key to toggle sound
      if (e.key === 'm' || e.key === 'M') {
        sound.toggleSound();
      }

      // Number keys 1-9 to fast jump directly to sections
      if (currentStage === 'orbit' && !modalOpen) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= LOCATIONS.length) {
          handleSelectSection(LOCATIONS[num - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentStage]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-space-950 text-slate-100 font-space select-none">
      {/* 3D Cyber Tech Graph Earth Canvas with Cursor Gravity & Telemetry */}
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-space-950 flex items-center justify-center text-neon-cyan font-mono text-xs">Initializing Cyber-Globe System...</div>}>
        <GlobeCanvas
          activeLocation={activeLocation}
          onSelectLocation={handleSelectSection}
          currentStage={currentStage}
          onPinProject={handlePinProject}
          onTelemetryUpdate={handleTelemetryUpdate}
          zoomAction={zoomAction}
          isAutoRotating={isAutoRotating}
          flightsEnabled={flightsEnabled}
        />
      </ErrorBoundary>

      {/* 1. Cover Page: 'Welcome to My World' + Enter button */}
      {currentStage === 'hero' && (
        <HeroOverlay 
          onEnterUniverse={handleEnterUniverse} 
          onOpenResume={handleOpenResume}
        />
      )}

      {/* Clean Top Navigation (Return to India / Cover Page + Live Telemetry + Audio Equalizer + Profile Badge + Quick CV) */}
      <TelemetryHUD
        activeLocation={activeLocation}
        currentStage={currentStage}
        onResetToHero={handleResetToHero}
        onReturnToHomeBase={handleReturnToHomeBase}
        onOpenProfile={() => handleSelectSection(LOCATIONS[0])}
        onOpenResume={handleOpenResume}
        telemetryData={telemetryData}
      />

      {/* 2. Interactive 3D Spatial Cards on the Rotating Earth */}
      <PinOverlays
        projectedPins={projectedPins}
        activeLocation={activeLocation}
        onSelectLocation={handleSelectSection}
        currentStage={currentStage}
      />

      {/* 3. Futuristic Side Mission Matrix (1-Click Selection & Auto-Orbit) */}
      {currentStage === 'orbit' && !modalOpen && (
        <SideMissionMatrix
          activeLocation={activeLocation}
          onSelectSection={handleSelectSection}
          onFlyToLocation={handleFlyToLocation}
        />
      )}

      {/* 4. Interactive Camera & Orbit Controls Widget */}
      {currentStage === 'orbit' && !modalOpen && (
        <GlobeControlsWidget
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReturnToBase={handleReturnToHomeBase}
          isAutoRotating={isAutoRotating}
          onToggleAutoRotate={handleToggleAutoRotate}
          flightsEnabled={flightsEnabled}
          onToggleFlights={handleToggleFlights}
          currentStage={currentStage}
        />
      )}

      {/* 4. Independent Section Room Environment (Direct Entry) */}
      {modalOpen && (
        <ErrorBoundary>
          <DetailModal
            location={activeLocation}
            onClose={handleCloseDetail}
            onReturnHome={handleReturnToHomeBase}
          />
        </ErrorBoundary>
      )}
    </main>
  );
}
