'use client';

import React, { useState } from 'react';
import { downloadFile } from '@/lib/download';
import { arrayToCsv, formatJsonPretty } from '@/lib/export';

interface DataPoint {
  id: string;
  label: string;
  value: number;
}

const DEFAULT_DATA: DataPoint[] = [
  { id: '1', label: 'Mon', value: 45 },
  { id: '2', label: 'Tue', value: 72 },
  { id: '3', label: 'Wed', value: 38 },
  { id: '4', label: 'Thu', value: 92 },
  { id: '5', label: 'Fri', value: 65 },
  { id: '6', label: 'Sat', value: 84 },
  { id: '7', label: 'Sun', value: 50 }
];

export const ChartPlaygroundWorkspace: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>(DEFAULT_DATA);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area' | 'sparkline'>('bar');
  const [color, setColor] = useState<string>('#3b82f6');
  const [newLabel, setNewLabel] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('50');

  const maxValue = Math.max(...data.map((d) => d.value), 100);

  const handleAddRow = () => {
    if (!newLabel.trim()) return;
    const val = parseInt(newValue) || 10;
    setData([...data, { id: Date.now().toString(), label: newLabel.trim(), value: val }]);
    setNewLabel('');
    setNewValue('50');
  };

  const handleDeleteRow = (id: string) => {
    setData(data.filter((d) => d.id !== id));
  };

  const handleUpdateValue = (id: string, val: number) => {
    setData(data.map((d) => (d.id === id ? { ...d, value: val } : d)));
  };

  const handleExportCsv = () => {
    const csv = arrayToCsv(['Label', 'Value'], data.map((d) => [d.label, d.value]));
    downloadFile('chart-dataset.csv', csv, 'text/csv');
  };

  const handleExportJson = () => {
    downloadFile('chart-dataset.json', formatJsonPretty(data), 'application/json');
  };

  // SVG coordinate calculations for line and area charts
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = 30;
  const chartW = svgWidth - padding * 2;
  const chartH = svgHeight - padding * 2;

  const points = data.map((d, idx) => {
    const x = padding + (idx / Math.max(data.length - 1, 1)) * chartW;
    const y = svgHeight - padding - (d.value / maxValue) * chartH;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${svgHeight - padding} L ${padding} ${svgHeight - padding} Z`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Chart Canvas & Visuals */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 700 }}>Interactive Chart Canvas</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Zero-dependency reactive SVG chart updated live from dataset table</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['bar', 'line', 'area', 'sparkline'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: chartType === type ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: chartType === type ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div
          style={{
            background: '#040711',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            overflowX: 'auto'
          }}
        >
          {chartType === 'bar' && (
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              {data.map((d) => (
                <div key={d.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.value}</span>
                  <div
                    style={{
                      width: '100%',
                      height: `${(d.value / maxValue) * 100}%`,
                      background: `linear-gradient(180deg, ${color}, rgba(59, 130, 246, 0.4))`,
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s ease'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{d.label}</span>
                </div>
              ))}
            </div>
          )}

          {(chartType === 'line' || chartType === 'area' || chartType === 'sparkline') && (
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '220px' }}>
              {/* Area Gradient Fill */}
              {chartType === 'area' && (
                <path d={areaD} fill={`url(#areaGrad)`} opacity="0.3" />
              )}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {chartType !== 'sparkline' && (
                <>
                  <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="rgba(255,255,255,0.1)" />
                  <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="rgba(255,255,255,0.05)" strokeDasharray="4,4" />
                </>
              )}

              {/* Line Stroke */}
              <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Point Circles */}
              {chartType !== 'sparkline' &&
                points.map((pt) => (
                  <g key={pt.id}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#040711" stroke={color} strokeWidth="2.5" />
                    <text x={pt.x} y={svgHeight - 10} textAnchor="middle" fill="#94a3b8" fontSize="11">{pt.label}</text>
                  </g>
                ))}
            </svg>
          )}
        </div>
      </div>

      {/* Editable Dataset Rows Table & Export Buttons */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Editable Dataset Table</h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleExportCsv}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Export CSV
            </button>
            <button
              onClick={handleExportJson}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Export JSON
            </button>
          </div>
        </div>

        {/* Dataset Table */}
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px' }}>Label</th>
                <th style={{ padding: '8px' }}>Value</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px', fontWeight: 600 }}>{row.label}</td>
                  <td style={{ padding: '8px' }}>
                    <input
                      type="number"
                      value={row.value}
                      onChange={(e) => handleUpdateValue(row.id, parseInt(e.target.value) || 0)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        width: '80px'
                      }}
                    />
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Row Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="New label (e.g. Next)..."
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '180px'
            }}
          />
          <input
            type="number"
            placeholder="Value..."
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '100px'
            }}
          />
          <button
            onClick={handleAddRow}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.08)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Add Data Point
          </button>
        </div>
      </div>
    </div>
  );
};
