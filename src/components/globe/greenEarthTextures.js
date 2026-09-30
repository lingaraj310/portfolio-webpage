import * as THREE from 'three';

// High-fidelity Procedural Lush Green Moss Earth Texture Generator
// Creates realistic tactile green foliage landmasses and vibrant azure oceans matching the reference

export function createGreenEarthTextures() {
  const width = 2048;
  const height = 1024;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Vibrant Azure Blue Oceans with soft depth variations
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#1e6bb8'); // Vibrant Arctic blue
  oceanGrad.addColorStop(0.3, '#257ecf');
  oceanGrad.addColorStop(0.5, '#2f8ee3'); // Tropical azure
  oceanGrad.addColorStop(0.7, '#257ecf');
  oceanGrad.addColorStop(1, '#1b5ea3');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle ocean tactile surface stippling
  for (let i = 0; i < 4000; i++) {
    const ox = Math.random() * width;
    const oy = Math.random() * height;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.04)' : 'rgba(10, 50, 100, 0.05)';
    ctx.fillRect(ox, oy, Math.random() * 3 + 1, Math.random() * 3 + 1);
  }

  // Continental landmasses coordinates for lush moss coverage
  const landmasses = [
    // India & South Asia (Lush emerald green)
    { minLat: 8, maxLat: 35, minLng: 68, maxLng: 92 },
    // Southeast Asia & Indonesia
    { minLat: -10, maxLat: 22, minLng: 95, maxLng: 145 },
    // East Asia (China, Japan, Korea)
    { minLat: 20, maxLat: 52, minLng: 100, maxLng: 145 },
    // Central Asia & Middle East
    { minLat: 15, maxLat: 48, minLng: 35, maxLng: 75 },
    // Europe
    { minLat: 36, maxLat: 64, minLng: -10, maxLng: 42 },
    // Scandinavia & Russia
    { minLat: 55, maxLat: 75, minLng: 10, maxLng: 180 },
    // Africa (Full lush green canopy with golden moss ridges)
    { minLat: -35, maxLat: 37, minLng: -18, maxLng: 52 },
    // North America (USA & Canada)
    { minLat: 25, maxLat: 68, minLng: -130, maxLng: -60 },
    // Central America
    { minLat: 8, maxLat: 25, minLng: -105, maxLng: -75 },
    // South America (Amazon, Brazil, Andes)
    { minLat: -55, maxLat: 12, minLng: -80, maxLng: -35 },
    // Australia
    { minLat: -40, maxLat: -11, minLng: 113, maxLng: 154 },
    // New Zealand
    { minLat: -47, maxLat: -34, minLng: 166, maxLng: 179 },
    // Greenland
    { minLat: 60, maxLat: 83, minLng: -55, maxLng: -20 }
  ];

  const toXY = (lat, lng) => {
    const x = ((lng + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return { x, y };
  };

  // Lush Moss & Foliage Color Palette
  const mossColors = [
    '#3ea043', // Vibrant moss green
    '#4cb352', // Emerald foliage
    '#2e7d32', // Deep forest moss
    '#5cb85c', // Bright spring green
    '#689f38', // Lime moss
    '#827717', // Earthy olive moss
    '#8d6e63', // Soft earth/timber soil accents
    '#33691e'  // Dense jungle
  ];

  // 2. Paint Lush Volumetric Moss Continents
  landmasses.forEach(({ minLat, maxLat, minLng, maxLng }) => {
    const stepsLat = 28;
    const stepsLng = 36;
    const dLat = (maxLat - minLat) / stepsLat;
    const dLng = (maxLng - minLng) / stepsLng;

    for (let i = 0; i <= stepsLat; i++) {
      for (let j = 0; j <= stepsLng; j++) {
        const lat = minLat + i * dLat + (Math.random() - 0.5) * dLat * 0.5;
        const lng = minLng + j * dLng + (Math.random() - 0.5) * dLng * 0.5;

        // Skip ocean voids
        if (lat > 0 && lat < 15 && lng > -40 && lng < -20) continue;
        if (lat > -20 && lat < 8 && lng > 60 && lng < 90) continue;

        const { x, y } = toXY(lat, lng);
        const radius = Math.random() * 14 + 12;
        const baseColor = mossColors[Math.floor(Math.random() * mossColors.length)];

        // Radial moss clump with organic gradient
        const radial = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
        radial.addColorStop(0, baseColor);
        radial.addColorStop(0.65, baseColor);
        radial.addColorStop(0.85, '#2e7d32');
        radial.addColorStop(1, 'rgba(46, 125, 50, 0)');

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Add micro-foliage stipples for dense moss texture
        for (let k = 0; k < 6; k++) {
          const fx = x + (Math.random() - 0.5) * radius * 1.2;
          const fy = y + (Math.random() - 0.5) * radius * 1.2;
          ctx.fillStyle = mossColors[Math.floor(Math.random() * mossColors.length)];
          ctx.beginPath();
          ctx.arc(fx, fy, Math.random() * 3 + 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  });

  // Coastal shallows/sand contour
  landmasses.forEach(({ minLat, maxLat, minLng, maxLng }) => {
    const { x, y } = toXY((minLat + maxLat) / 2, (minLng + maxLng) / 2);
    ctx.strokeStyle = 'rgba(76, 175, 80, 0.2)';
    ctx.lineWidth = 4;
  });

  const greenTexture = new THREE.CanvasTexture(canvas);
  greenTexture.colorSpace = THREE.SRGBColorSpace;

  return greenTexture;
}

// Generate 3D Volumetric Moss Canopy particles for continents
export function generateVolumetricMossParticles(count = 4800) {
  const particles = [];
  
  const landmasses = [
    // India (Dense foliage)
    [8, 35, 68, 92, 2.2],
    // Africa (Lush moss dome)
    [-35, 37, -18, 52, 2.0],
    // Europe
    [36, 64, -10, 42, 1.8],
    // Asia
    [15, 65, 75, 145, 1.8],
    // Americas
    [-55, 65, -130, -35, 2.0],
    // Australia
    [-40, -11, 113, 154, 1.6]
  ];

  const palette = [
    new THREE.Color(0x3ea043), // Vibrant moss
    new THREE.Color(0x4cb352), // Emerald
    new THREE.Color(0x689f38), // Lime green
    new THREE.Color(0x2e7d32), // Forest green
    new THREE.Color(0x827717), // Earthy olive
    new THREE.Color(0x8d6e63), // Mountain soil
    new THREE.Color(0xaed581)  // Light spring moss
  ];

  landmasses.forEach(([minLat, maxLat, minLng, maxLng, weight]) => {
    const numPoints = Math.floor((count / landmasses.length) * weight);
    for (let i = 0; i < numPoints; i++) {
      const lat = minLat + Math.random() * (maxLat - minLat);
      const lng = minLng + Math.random() * (maxLng - minLng);

      if (lat > 0 && lat < 15 && lng > -40 && lng < -20) continue;
      if (lat > -20 && lat < 8 && lng > 60 && lng < 90) continue;

      const altitude = Math.random() * 0.028 + 0.008; // Raised 3D moss canopy height
      const size = Math.random() * 3.2 + 2.0;
      const color = palette[Math.floor(Math.random() * palette.length)];

      particles.push({ lat, lng, altitude, size, color });
    }
  });

  return particles;
}
