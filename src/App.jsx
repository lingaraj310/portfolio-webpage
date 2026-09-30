import React, { useState, useEffect, useCallback } from 'react';
import GlobeCanvas from './components/globe/GlobeCanvas';
import HeroOverlay from './components/ui/HeroOverlay';
import RadialNav from './components/ui/RadialNav';
import PinOverlays from './components/ui/PinOverlays';
import TelemetryHUD from './components/ui/TelemetryHUD';
import DetailModal from './components/panels/DetailModal';
import { LOCATIONS } from './data/portfolioData';
import { sound } from './utils/audioEffects';

export default function App() {
  // Navigation & Lifecycle Stages: 'hero' | 'descending' | 'orbit' | 'traveling' | 'landed'
  const [currentStage, setCurrentStage] = useState('hero');
  const [activeLocation, setActiveLocation] = useState(LOCATIONS[0]); // Default: Madurai / Tamil Nadu
  const [projectedPins, setProjectedPins] = useState({});
  const [telemetryData, setTelemetryData] = useState(null);
  
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
    }, 3000);
  };

  // 2. Direct Section Entry: Revolve Earth + Directly Open Full-Screen Room (No dialog popup)
  const handleSelectSection = (loc) => {
    if (!loc) return;
    sound.playSelect();
    sound.playWarp();
    setActiveLocation(loc);
    setCurrentStage('landed');
    setModalOpen(true);
  };

  // 3. Back to My World / Exit Section Room -> Return to India & Re-enable constant radial menu
  const handleCloseDetail = () => {
    sound.playSelect();
    setModalOpen(false);
    setActiveLocation(LOCATIONS[0]);
    setCurrentStage('orbit');
  };

  // 4. Return to Home Base (India photo pin)
  const handleReturnToHomeBase = () => {
    setActiveLocation(LOCATIONS[0]);
    setCurrentStage('traveling');
    setTimeout(() => {
      setCurrentStage('orbit');
      sound.playArrival();
    }, 2000);
  };

  // 5. Reset to Cover Page ("Welcome to My World")
  const handleResetToHero = () => {
    sound.playSelect();
    setModalOpen(false);
    setCurrentStage('hero');
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

  const homePinScreenPos = projectedPins['about'] || null;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-space-950 text-slate-100 font-space select-none">
      {/* 3D Cyber Tech Graph Earth Canvas with Cursor Gravity & Telemetry */}
      <GlobeCanvas
        activeLocation={activeLocation}
        onSelectLocation={handleSelectSection}
        currentStage={currentStage}
        onPinProject={handlePinProject}
        onTelemetryUpdate={handleTelemetryUpdate}
      />

      {/* 1. Cover Page: 'Welcome to My World' + Enter button */}
      {currentStage === 'hero' && (
        <HeroOverlay onEnterUniverse={handleEnterUniverse} />
      )}

      {/* Clean Top Navigation (Return to India / Cover Page + Live Telemetry + Audio Equalizer) */}
      <TelemetryHUD
        activeLocation={activeLocation}
        currentStage={currentStage}
        onResetToHero={handleResetToHero}
        onReturnToHomeBase={handleReturnToHomeBase}
        telemetryData={telemetryData}
      />

      {/* 2. CONSTANT 9-Section Radial Menu & Central Circular Photo Pin */}
      {currentStage === 'orbit' && !modalOpen && (
        <RadialNav
          screenPos={homePinScreenPos}
          activeLocation={activeLocation}
          onSelectNode={handleSelectSection}
        />
      )}

      {/* 3. Destination Pin Marker */}
      <PinOverlays
        projectedPins={projectedPins}
        activeLocation={activeLocation}
        onSelectLocation={handleSelectSection}
        onEnterDetail={handleSelectSection}
        currentStage={currentStage}
      />

      {/* 4. Independent Section Room Environment (Direct Entry) */}
      {modalOpen && (
        <DetailModal
          location={activeLocation}
          onClose={handleCloseDetail}
          onReturnHome={handleReturnToHomeBase}
        />
      )}
    </main>
  );
}
