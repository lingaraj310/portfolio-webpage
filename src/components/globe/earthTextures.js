import * as THREE from 'three';

// High-fidelity procedural Earth texture generator
// Creates realistic Day, Night Lights, Specular, and Cloud maps using HTML5 Canvas

export function createEarthTextures() {
  const width = 2048;
  const height = 1024;

  // 1. Day Surface Texture Canvas
  const dayCanvas = document.createElement('canvas');
  dayCanvas.width = width;
  dayCanvas.height = height;
  const ctx = dayCanvas.getContext('2d');

  // Deep Ocean Base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0a2342'); // Arctic
  oceanGrad.addColorStop(0.3, '#0b3558');
  oceanGrad.addColorStop(0.5, '#0d426d'); // Equator
  oceanGrad.addColorStop(0.7, '#0b3558');
  oceanGrad.addColorStop(1, '#081a33'); // Antarctic
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Draw Continental Landmasses with realistic biomes
  const landmasses = [
    // [minLat, maxLat, minLng, maxLng, biomeType: 'green' | 'desert' | 'taiga' | 'india']
    // India & South Asia (High detail)
    { minLat: 8, maxLat: 35, minLng: 68, maxLng: 92, biome: 'india' },
    // Southeast Asia
    { minLat: -10, maxLat: 22, minLng: 95, maxLng: 145, biome: 'green' },
    // East Asia (China, Japan, Korea)
    { minLat: 20, maxLat: 50, minLng: 100, maxLng: 145, biome: 'green' },
    // Central Asia & Middle East
    { minLat: 15, maxLat: 45, minLng: 35, maxLng: 75, biome: 'desert' },
    // Europe
    { minLat: 36, maxLat: 62, minLng: -10, maxLng: 40, biome: 'green' },
    // Scandinavia & Russia
    { minLat: 55, maxLat: 75, minLng: 10, maxLng: 180, biome: 'taiga' },
    // North Africa & Sahara
    { minLat: 15, maxLat: 35, minLng: -18, maxLng: 52, biome: 'desert' },
    // Central & Southern Africa
    { minLat: -35, maxLat: 15, minLng: 10, maxLng: 52, biome: 'green' },
    // North America (USA & Canada)
    { minLat: 25, maxLat: 68, minLng: -130, maxLng: -60, biome: 'green' },
    // Central America
    { minLat: 8, maxLat: 25, minLng: -105, maxLng: -75, biome: 'green' },
    // South America (Amazon & Andes)
    { minLat: -55, maxLat: 12, minLng: -80, maxLng: -35, biome: 'green' },
    // Australia
    { minLat: -40, maxLat: -11, minLng: 113, maxLng: 154, biome: 'desert' },
    // New Zealand
    { minLat: -47, maxLat: -34, minLng: 166, maxLng: 179, biome: 'green' },
    // Greenland / Arctic
    { minLat: 60, maxLat: 83, minLng: -55, maxLng: -20, biome: 'snow' },
    // Antarctica
    { minLat: -90, maxLat: -65, minLng: -180, maxLng: 180, biome: 'snow' }
  ];

  // Function to convert Lat/Lng to Canvas X/Y
  const toXY = (lat, lng) => {
    const x = ((lng + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return { x, y };
  };

  // Paint landmasses with soft organic edges and coastal shelves
  landmasses.forEach(({ minLat, maxLat, minLng, maxLng, biome }) => {
    const stepsLat = 24;
    const stepsLng = 32;
    const dLat = (maxLat - minLat) / stepsLat;
    const dLng = (maxLng - minLng) / stepsLng;

    for (let i = 0; i <= stepsLat; i++) {
      for (let j = 0; j <= stepsLng; j++) {
        const lat = minLat + i * dLat + (Math.random() - 0.5) * dLat * 0.4;
        const lng = minLng + j * dLng + (Math.random() - 0.5) * dLng * 0.4;

        // Skip Atlantic & Indian Ocean gaps in simple bounding boxes
        if (lat > 0 && lat < 15 && lng > -40 && lng < -20) continue;
        if (lat > -20 && lat < 8 && lng > 60 && lng < 90) continue;

        const { x, y } = toXY(lat, lng);
        const radius = (Math.random() * 12 + 10);

        // Biome colors
        let color = '#2e5d34'; // Lush forest green
        if (biome === 'desert') {
          color = Math.random() > 0.4 ? '#b8860b' : '#c29b38'; // Golden desert
        } else if (biome === 'taiga') {
          color = '#204028'; // Deep pine
        } else if (biome === 'snow') {
          color = '#e2edf8'; // Glacial ice
        } else if (biome === 'india') {
          // India: rich green peninsula + golden Deccan + northern Himalayan snow
          if (lat > 28) color = '#dce8f5'; // Himalayas
          else if (lat > 18 && lng < 78) color = '#a68a3e'; // Deccan plateau
          else color = '#236b35'; // Lush Kerala/Tamil Nadu & Gangetic plains
        }

        // Draw coastal shelf gradient
        const radial = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.4);
        radial.addColorStop(0, color);
        radial.addColorStop(0.7, color);
        radial.addColorStop(1, 'rgba(15, 68, 105, 0)');

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });

  // 2. Night Lights Canvas (Warm golden city illumination)
  const nightCanvas = document.createElement('canvas');
  nightCanvas.width = width;
  nightCanvas.height = height;
  const nCtx = nightCanvas.getContext('2d');
  nCtx.fillStyle = '#02040a';
  nCtx.fillRect(0, 0, width, height);

  // Dense urban light clusters
  const cityClusters = [
    // India (Madurai, Chennai, Bangalore, Mumbai, Delhi, Kolkata)
    { lat: 9.92, lng: 78.12, intensity: 1.0 },
    { lat: 13.08, lng: 80.27, intensity: 1.0 },
    { lat: 12.97, lng: 77.59, intensity: 1.0 },
    { lat: 19.07, lng: 72.87, intensity: 1.0 },
    { lat: 28.61, lng: 77.20, intensity: 1.0 },
    { lat: 22.57, lng: 88.36, intensity: 0.9 },
    // Japan / Tokyo
    { lat: 35.67, lng: 139.65, intensity: 1.0 },
    { lat: 34.69, lng: 135.50, intensity: 0.9 },
    // Europe
    { lat: 51.50, lng: -0.12, intensity: 1.0 }, // London
    { lat: 48.85, lng: 2.35, intensity: 1.0 }, // Paris
    { lat: 52.52, lng: 13.40, intensity: 0.9 }, // Berlin
    // USA
    { lat: 40.71, lng: -74.00, intensity: 1.0 }, // New York
    { lat: 37.77, lng: -122.41, intensity: 1.0 }, // San Francisco
    { lat: 34.05, lng: -118.24, intensity: 0.9 }, // LA
    { lat: 41.87, lng: -87.62, intensity: 0.9 }, // Chicago
    // Middle East / Dubai
    { lat: 25.20, lng: 55.27, intensity: 1.0 },
    // Singapore
    { lat: 1.35, lng: 103.81, intensity: 1.0 },
    // Australia / Sydney
    { lat: -33.86, lng: 151.20, intensity: 0.9 }
  ];

  // Draw cities & regional web lights
  cityClusters.forEach(({ lat, lng, intensity }) => {
    const { x, y } = toXY(lat, lng);
    // Central bright hub
    const grad = nCtx.createRadialGradient(x, y, 0, x, y, 16 * intensity);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#ffcc44');
    grad.addColorStop(0.7, '#ff8800');
    grad.addColorStop(1, 'rgba(255, 136, 0, 0)');

    nCtx.fillStyle = grad;
    nCtx.beginPath();
    nCtx.arc(x, y, 16 * intensity, 0, Math.PI * 2);
    nCtx.fill();

    // Surrounding metropolitan network dots
    for (let k = 0; k < 18; k++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 22 * intensity + 2;
      const dx = x + Math.cos(angle) * dist;
      const dy = y + Math.sin(angle) * dist;
      nCtx.fillStyle = Math.random() > 0.5 ? '#ffe082' : '#ffb74d';
      nCtx.fillRect(dx, dy, Math.random() * 2 + 1, Math.random() * 2 + 1);
    }
  });

  // 3. Clouds Texture Canvas (Semi-transparent realistic cloud swirl layers)
  const cloudsCanvas = document.createElement('canvas');
  cloudsCanvas.width = width;
  cloudsCanvas.height = height;
  const cCtx = cloudsCanvas.getContext('2d');
  cCtx.clearRect(0, 0, width, height);

  // Generate fractal cloud belts
  for (let y = 0; y < height; y += 4) {
    const lat = 90 - (y / height) * 180;
    // Cloud band density varies with latitude (intertropical convergence zone, mid-latitude storms)
    const bandDensity = Math.sin((lat * Math.PI) / 45) * 0.3 + 0.5;

    for (let x = 0; x < width; x += 6) {
      const noise = (Math.sin(x * 0.02 + y * 0.01) + Math.cos(x * 0.01 - y * 0.03) + Math.sin(x * 0.05 + y * 0.04)) / 3;
      if (noise > 0.15 && Math.random() < bandDensity) {
        const alpha = Math.min(0.85, (noise - 0.15) * 1.5);
        cCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        cCtx.beginPath();
        cCtx.arc(x, y, Math.random() * 8 + 4, 0, Math.PI * 2);
        cCtx.fill();
      }
    }
  }

  // Create Three.js Textures
  const dayTexture = new THREE.CanvasTexture(dayCanvas);
  dayTexture.colorSpace = THREE.SRGBColorSpace;

  const nightTexture = new THREE.CanvasTexture(nightCanvas);
  nightTexture.colorSpace = THREE.SRGBColorSpace;

  const cloudsTexture = new THREE.CanvasTexture(cloudsCanvas);
  cloudsTexture.colorSpace = THREE.SRGBColorSpace;

  return { dayTexture, nightTexture, cloudsTexture };
}
