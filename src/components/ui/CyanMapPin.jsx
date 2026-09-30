import React from 'react';

export default function CyanMapPin({ className = "w-7 h-7", size, style = {} }) {
  const width = size || undefined;
  const height = size || undefined;

  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cyan Holographic Teardrop Body */}
      <path
        d="M12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.58 16.42 2 12 2Z"
        fill="#00f0ff"
        stroke="#ffffff"
        strokeWidth="0.8"
      />
      {/* Center White Circular Cutout Hole */}
      <circle
        cx="12"
        cy="10"
        r="3.8"
        fill="#030712"
      />
      <circle
        cx="12"
        cy="10"
        r="2"
        fill="#00f0ff"
      />
    </svg>
  );
}
