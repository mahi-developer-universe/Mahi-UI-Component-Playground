'use client';

import React, { useState, useId } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { CopyButton } from '@/components/ui/CopyButton';

export interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

const DEFAULT_METRICS: DataPoint[] = [
  { label: 'Jan', value: 45, color: 'var(--accent-primary)' },
  { label: 'Feb', value: 68, color: 'var(--accent-primary)' },
  { label: 'Mar', value: 52, color: 'var(--accent-primary)' },
  { label: 'Apr', value: 89, color: 'var(--accent-primary)' },
  { label: 'May', value: 74, color: 'var(--accent-primary)' },
  { label: 'Jun', value: 95, color: 'var(--accent-primary)' }
];

export const AccessibleChartStudio: React.FC = () => {
  const chartId = useId();
  const [chartType, setChartType] = useState<'bar' | 'donut' | 'line'>('bar');
  const [chartTitle, setChartTitle] = useState('Monthly Active Developer Telemetry');
  const [showDataTable, setShowDataTable] = useState(false);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(DEFAULT_METRICS);

  const maxValue = Math.max(...dataPoints.map((d) => d.value), 100);
  const totalValue = dataPoints.reduce((acc, curr) => acc + curr.value, 0);

  const generateChartCode = () => {
    return `import React from 'react';

// WCAG 2.2 AA Accessible Chart Component with Hidden Screen-Reader Table Equivalent
export const TelemetryChart = () => {
  const data = ${JSON.stringify(dataPoints, null, 2)};
  const max = Math.max(...data.map(d => d.value));

  return (
    <figure 
      role="region" 
      aria-labelledby="chart-title" 
      style={{ margin: 0, padding: '1.5rem', background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}
    >
      <figcaption id="chart-title" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
        ${chartTitle}
      </figcaption>

      {/* Visual Chart Graphic (Hidden from screen-readers via aria-hidden) */}
      <div aria-hidden="true" style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {data.map((item, idx) => (
          <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>{item.value}</span>
            <div style={{ width: '80%', height: \`\${(item.value / max) * 160}px\`, background: 'var(--accent-primary)', borderRadius: '4px 4px 0 0', transition: 'height 0.3s ease' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Screen Reader Accessible Data Table Equivalent (sr-only) */}
      <div className="sr-only">
        <p>Accessible data summary for screen readers. Total aggregated volume: ${totalValue}.</p>
        <table>
          <caption>${chartTitle} Data Breakdown</caption>
          <thead>
            <tr>
              <th scope="col">Period / Category</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
};`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* Studio Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Accessible Chart & Data Studio</h2>
            <Badge variant="primary">WCAG 2.2 AA</Badge>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Interactive SVG data visualizations automatically paired with semantic tabular text equivalents for assistive technology.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Button
            variant={showDataTable ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowDataTable(!showDataTable)}
          >
            {showDataTable ? '👁️ Hide Screen-Reader Table' : '♿ Inspect Accessible Table'}
          </Button>
          <CopyButton text={generateChartCode()} label="Copy Component" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Visual Chart Canvas & Screen Reader Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card variant="bento" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h3 id={`chart-heading-${chartId}`} style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  {chartTitle}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Total aggregate: <strong>{totalValue.toLocaleString()} units</strong>
                </span>
              </div>
              <Badge variant="default">Interactive SVG</Badge>
            </div>

            {/* Visual Chart Representation */}
            {chartType === 'bar' && (
              <div aria-hidden="true" style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                {dataPoints.map((dp, idx) => {
                  const heightPercent = (dp.value / maxValue) * 180;
                  return (
                    <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        {dp.value}
                      </span>
                      <div
                        style={{
                          width: '75%',
                          height: `${heightPercent}px`,
                          background: 'linear-gradient(180deg, var(--accent-primary) 0%, rgba(99, 102, 241, 0.4) 100%)',
                          borderRadius: '6px 6px 0 0',
                          transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500 }}>
                        {dp.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {chartType === 'donut' && (
              <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.5rem', padding: '1.5rem 0' }}>
                <svg width="200" height="200" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--bg-secondary)" strokeWidth="5" />
                  {dataPoints.map((dp, idx) => {
                    const percentage = (dp.value / totalValue) * 100;
                    const strokeDasharray = `${percentage} ${100 - percentage}`;
                    const priorPercent = dataPoints.slice(0, idx).reduce((acc, cur) => acc + (cur.value / totalValue) * 100, 0);
                    const strokeDashoffset = 100 - priorPercent + 25;
                    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
                    return (
                      <circle
                        key={idx}
                        cx="21"
                        cy="21"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke={colors[idx % colors.length]}
                        strokeWidth="5"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    );
                  })}
                  <text x="21" y="22" textAnchor="middle" dominantBaseline="middle" fill="var(--text-main)" fontSize="4.5" fontWeight="bold">
                    {totalValue}
                  </text>
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {dataPoints.map((dp, idx) => {
                    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: colors[idx % colors.length] }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{dp.label}:</span>
                        <span style={{ fontWeight: 600 }}>{dp.value} ({Math.round((dp.value / totalValue) * 100)}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {chartType === 'line' && (
              <div aria-hidden="true" style={{ height: '220px', position: 'relative', borderBottom: '2px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
                <svg width="100%" height="180" viewBox="0 0 500 180" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth="3"
                    points={dataPoints
                      .map((dp, i) => {
                        const x = (i / (dataPoints.length - 1)) * 480 + 10;
                        const y = 170 - (dp.value / maxValue) * 140;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                  {dataPoints.map((dp, i) => {
                    const x = (i / (dataPoints.length - 1)) * 480 + 10;
                    const y = 170 - (dp.value / maxValue) * 140;
                    return (
                      <circle key={i} cx={x} cy={y} r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                    );
                  })}
                </svg>
              </div>
            )}
          </Card>

          {/* Accessible Table Equivalent (Always present for screen readers, toggleable for visual inspection) */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1rem' }}>♿</span>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Screen Reader Accessible Table Representation</h4>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--status-success)', fontWeight: 600 }}>WCAG 1.1.1 Non-text Content Met</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <caption style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>
                Tabular summary for {chartTitle}
              </caption>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th scope="col" style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-muted)' }}>Index</th>
                  <th scope="col" style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-muted)' }}>Category / Period</th>
                  <th scope="col" style={{ textAlign: 'right', padding: '6px 8px', color: 'var(--text-muted)' }}>Metric Value</th>
                  <th scope="col" style={{ textAlign: 'right', padding: '6px 8px', color: 'var(--text-muted)' }}>Share (%)</th>
                </tr>
              </thead>
              <tbody>
                {dataPoints.map((dp, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '6px 8px', color: 'var(--text-muted)' }}>#{idx + 1}</td>
                    <td style={{ padding: '6px 8px', fontWeight: 600 }}>{dp.label}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right' }}>{dp.value}</td>
                    <td style={{ padding: '6px 8px', textAlign: 'right', color: 'var(--accent-primary)', fontWeight: 600 }}>
                      {Math.round((dp.value / totalValue) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Chart Controls */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Studio Controls
          </h4>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Visualization Format
            </span>
            <Select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as any)}
              options={[
                { value: 'bar', label: 'Bar Histogram' },
                { value: 'donut', label: 'Donut Distribution' },
                { value: 'line', label: 'Continuous Line' }
              ]}
            />
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Chart Title
            </span>
            <input
              type="text"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
              className="proj-input"
              style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Data Points ({dataPoints.length})
            </span>
            {dataPoints.map((dp, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ width: '45px', fontSize: '0.8rem', fontWeight: 600 }}>{dp.label}</span>
                <input
                  type="number"
                  value={dp.value}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setDataPoints((prev) => prev.map((p, idx) => (idx === i ? { ...p, value: val } : p)));
                  }}
                  style={{ width: '70px', padding: '3px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '0.8rem' }}
                />
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={dp.value}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setDataPoints((prev) => prev.map((p, idx) => (idx === i ? { ...p, value: val } : p)));
                  }}
                  style={{ flex: 1, accentColor: 'var(--accent-primary)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
