import * as THREE from 'three';

// Procedural Geo-Matrix & Landmass coordinate density generator
// Generates accurate dot-matrix clusters representing Earth's continents

export function generateLandParticles(count = 3500) {
  const particles = [];
  
  // Approximate bounding boxes for continental landmasses [minLat, maxLat, minLng, maxLng, densityWeight]
  const landmasses = [
    // India & South Asia
    [8, 35, 68, 92, 1.8],
    // East Asia (China, Japan, Korea)
    [20, 50, 100, 145, 1.6],
    // Southeast Asia & Indonesia
    [-10, 20, 95, 140, 1.4],
    // Europe
    [36, 65, -10, 40, 1.7],
    // North America (USA, Canada, Mexico)
    [15, 65, -130, -60, 1.7],
    // South America
    [-55, 12, -80, -35, 1.4],
    // Africa
    [-35, 37, -18, 51, 1.5],
    // Australia & NZ
    [-45, -10, 112, 178, 1.4],
    // Middle East
    [15, 40, 35, 65, 1.3],
    // Scandinavia & Russia
    [55, 75, 10, 170, 1.1]
  ];

  landmasses.forEach(([minLat, maxLat, minLng, maxLng, weight]) => {
    const numPoints = Math.floor((count / landmasses.length) * weight);
    for (let i = 0; i < numPoints; i++) {
      // Add slight jitter for organic coastline clustering
      const lat = minLat + Math.random() * (maxLat - minLat);
      const lng = minLng + Math.random() * (maxLng - minLng);
      
      // Filter out deep ocean pockets in simple boxes
      if (lat > 0 && lat < 15 && lng > -40 && lng < -20) continue; // Atlantic gap
      if (lat > -20 && lat < 10 && lng > 60 && lng < 90 && lat < 8) continue; // Indian ocean gap
      
      particles.push({ lat, lng, size: Math.random() * 1.5 + 0.8 });
    }
  });

  return particles;
}

export function latLngToVector3(lat, lng, radius, altitude = 0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius * (1 + altitude);
  
  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

// Generate 3D curved Great-Circle Arc between two lat/lng pairs
export function createCurveBetweenPoints(startLat, startLng, endLat, endLng, radius, maxAltitude = 0.35) {
  const start = latLngToVector3(startLat, startLng, radius);
  const end = latLngToVector3(endLat, endLng, radius);
  
  // Calculate mid-point vector
  const mid = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
    z: (start.z + end.z) / 2
  };
  
  // Distance between points to scale altitude
  const distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) +
    Math.pow(end.y - start.y, 2) +
    Math.pow(end.z - start.z, 2)
  );
  
  const midLength = Math.sqrt(mid.x * mid.x + mid.y * mid.y + mid.z * mid.z);
  const targetAltitude = radius * (1 + Math.min(maxAltitude, distance / (radius * 2) * 0.5 + 0.1));
  
  const controlPoint = {
    x: (mid.x / midLength) * targetAltitude,
    y: (mid.y / midLength) * targetAltitude,
    z: (mid.z / midLength) * targetAltitude
  };
  
  return { start, controlPoint, end };
}
