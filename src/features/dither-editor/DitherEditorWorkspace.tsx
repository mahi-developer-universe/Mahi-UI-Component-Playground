'use client';

import React, { useState, useRef, useEffect } from 'react';
import { downloadCanvasAsPng } from '@/lib/download';

export const DitherEditorWorkspace: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'bayer' | 'halftone' | 'threshold' | 'pixelate'>('bayer');
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [pixelSize, setPixelSize] = useState<number>(4);
  const [threshold, setThreshold] = useState<number>(128);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);

  // 4x4 Bayer Matrix
  const bayerMatrix4x4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5]
  ];

  // Draw procedural test pattern if no image uploaded
  const drawProceduralGradient = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#4f46e5');
    grad.addColorStop(1, '#050810');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add geometric circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(236, 72, 153, 0.7)';
    ctx.fill();
  };

  const processImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw source
    if (sourceImageRef.current) {
      ctx.drawImage(sourceImageRef.current, 0, 0, width, height);
    } else {
      drawProceduralGradient(ctx, width, height);
    }

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Contrast and brightness adjustment factor
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

    if (filterMode === 'pixelate') {
      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          const i = (y * width + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
            for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
              const target = ((y + dy) * width + (x + dx)) * 4;
              data[target] = r;
              data[target + 1] = g;
              data[target + 2] = b;
            }
          }
        }
      }
    } else {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;

          // Apply brightness and contrast
          let r = factor * (data[i] - 128) + 128 + brightness;
          let g = factor * (data[i + 1] - 128) + 128 + brightness;
          let b = factor * (data[i + 2] - 128) + 128 + brightness;

          // Grayscale luminance
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;

          if (filterMode === 'bayer') {
            const bayerVal = (bayerMatrix4x4[y % 4][x % 4] / 16) * 255;
            const finalVal = gray < bayerVal ? 0 : 255;
            data[i] = finalVal;
            data[i + 1] = finalVal;
            data[i + 2] = finalVal;
          } else if (filterMode === 'threshold') {
            const finalVal = gray < threshold ? 0 : 255;
            data[i] = finalVal;
            data[i + 1] = finalVal;
            data[i + 2] = finalVal;
          } else if (filterMode === 'halftone') {
            const dot = (x % 6 - 3) * (x % 6 - 3) + (y % 6 - 3) * (y % 6 - 3);
            const radius = (1 - gray / 255) * 8;
            const finalVal = dot < radius ? 0 : 255;
            data[i] = finalVal;
            data[i + 1] = finalVal;
            data[i + 2] = finalVal;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  };

  useEffect(() => {
    processImage();
  }, [filterMode, brightness, contrast, pixelSize, threshold]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        sourceImageRef.current = img;
        processImage();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadPng = () => {
    if (canvasRef.current) {
      downloadCanvasAsPng(canvasRef.current, `dither-${filterMode}.png`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Canvas Viewport */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>Image Dither & Halftone Canvas</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bayer ordered dithering, dot-halftone, and pixelation via HTML5 Canvas</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleDownloadPng}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Download PNG
            </button>
          </div>
        </div>

        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          width={480}
          height={300}
          style={{
            maxWidth: '100%',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--glass-shadow)',
            background: '#040711'
          }}
        />
      </div>

      {/* Filter and Adjustment Controls */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        {/* Filter Switcher */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['bayer', 'halftone', 'threshold', 'pixelate'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setFilterMode(m)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-md)',
                background: filterMode === m ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: filterMode === m ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {m} Filter
            </button>
          ))}
        </div>

        {/* Sliders Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Brightness: {brightness}
            </label>
            <input type="range" min="-100" max="100" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Contrast: {contrast}
            </label>
            <input type="range" min="-100" max="100" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          {filterMode === 'threshold' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Threshold: {threshold}
              </label>
              <input type="range" min="0" max="255" value={threshold} onChange={(e) => setThreshold(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
          )}

          {filterMode === 'pixelate' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Pixel Pitch: {pixelSize}px
              </label>
              <input type="range" min="2" max="20" value={pixelSize} onChange={(e) => setPixelSize(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Upload Local Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
