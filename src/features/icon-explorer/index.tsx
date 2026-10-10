'use client';

import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { Slider } from '@/components/ui/Slider';

interface IconMetadata {
  name: string;
  category: 'interface' | 'media' | 'communication' | 'devices' | 'arrows';
}

const CURATED_ICONS: IconMetadata[] = [
  // Interface
  { name: 'Home', category: 'interface' },
  { name: 'Search', category: 'interface' },
  { name: 'Settings', category: 'interface' },
  { name: 'User', category: 'interface' },
  { name: 'Bell', category: 'interface' },
  { name: 'Check', category: 'interface' },
  { name: 'CheckCircle2', category: 'interface' },
  { name: 'AlertCircle', category: 'interface' },
  { name: 'Info', category: 'interface' },
  { name: 'X', category: 'interface' },
  { name: 'Menu', category: 'interface' },
  { name: 'MoreVertical', category: 'interface' },
  { name: 'Trash2', category: 'interface' },
  { name: 'Edit', category: 'interface' },
  { name: 'Plus', category: 'interface' },
  { name: 'Filter', category: 'interface' },
  { name: 'Share2', category: 'interface' },
  { name: 'Download', category: 'interface' },
  { name: 'Upload', category: 'interface' },
  { name: 'Copy', category: 'interface' },
  { name: 'Sparkles', category: 'interface' },
  { name: 'Bookmark', category: 'interface' },
  { name: 'Star', category: 'interface' },
  { name: 'Heart', category: 'interface' },
  { name: 'Shield', category: 'interface' },
  { name: 'Lock', category: 'interface' },
  { name: 'Eye', category: 'interface' },
  { name: 'Folder', category: 'interface' },
  { name: 'FileText', category: 'interface' },

  // Arrows & Navigation
  { name: 'ArrowRight', category: 'arrows' },
  { name: 'ArrowLeft', category: 'arrows' },
  { name: 'ArrowUp', category: 'arrows' },
  { name: 'ArrowDown', category: 'arrows' },
  { name: 'ChevronRight', category: 'arrows' },
  { name: 'ChevronLeft', category: 'arrows' },
  { name: 'ChevronDown', category: 'arrows' },
  { name: 'ChevronUp', category: 'arrows' },
  { name: 'ExternalLink', category: 'arrows' },
  { name: 'RefreshCw', category: 'arrows' },

  // Devices & Tech
  { name: 'Monitor', category: 'devices' },
  { name: 'Smartphone', category: 'devices' },
  { name: 'Tablet', category: 'devices' },
  { name: 'Laptop', category: 'devices' },
  { name: 'Cpu', category: 'devices' },
  { name: 'Terminal', category: 'devices' },
  { name: 'Code', category: 'devices' },
  { name: 'Database', category: 'devices' },
  { name: 'Server', category: 'devices' },

  // Media
  { name: 'Play', category: 'media' },
  { name: 'Pause', category: 'media' },
  { name: 'Volume2', category: 'media' },
  { name: 'Image', category: 'media' },
  { name: 'Camera', category: 'media' },
  { name: 'Music', category: 'media' },

  // Communication
  { name: 'Mail', category: 'communication' },
  { name: 'MessageSquare', category: 'communication' },
  { name: 'Phone', category: 'communication' },
  { name: 'Send', category: 'communication' },
  { name: 'Globe', category: 'communication' }
];

export const IconExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIconName, setSelectedIconName] = useState<string>('Sparkles');

  // Customization controls
  const [iconSize, setIconSize] = useState<number>(24);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [iconColor, setIconColor] = useState<string>('#38bdf8');
  const [containerShape, setContainerShape] = useState<'none' | 'circle' | 'rounded' | 'square'>('rounded');
  const [containerBg, setContainerBg] = useState<string>('rgba(56, 189, 248, 0.12)');

  const filteredIcons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CURATED_ICONS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  // Selected Icon component resolution
  const ActiveIconComponent = (LucideIcons as any)[selectedIconName] || LucideIcons.Sparkles;

  // Code exports
  const reactSnippet = `import { ${selectedIconName} } from 'lucide-react';

export const MyIcon = () => (
  <${selectedIconName}
    size={${iconSize}}
    strokeWidth={${strokeWidth}}
    color="${iconColor}"
  />
);`;

  const shapeBorderRadius: Record<string, string> = {
    none: '0px',
    circle: '9999px',
    rounded: '12px',
    square: '0px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search & Customization Toolbar */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          alignItems: 'end'
        }}
      >
        {/* Search */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            SEARCH ICONS ({filteredIcons.length})
          </label>
          <input
            type="text"
            placeholder="Search icon name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem'
            }}
          />
        </div>

        {/* Category */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            CATEGORY FILTER
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">All Categories</option>
            <option value="interface">Interface</option>
            <option value="arrows">Arrows & Navigation</option>
            <option value="devices">Devices & Tech</option>
            <option value="media">Media & Audio</option>
            <option value="communication">Communication</option>
          </select>
        </div>

        {/* Size Slider */}
        <div>
          <Slider
            label="Icon Size"
            value={iconSize}
            min={16}
            max={64}
            step={2}
            unit="px"
            onChange={setIconSize}
          />
        </div>

        {/* Stroke Width Slider */}
        <div>
          <Slider
            label="Stroke Width"
            value={strokeWidth}
            min={1}
            max={3.5}
            step={0.25}
            unit="px"
            onChange={setStrokeWidth}
          />
        </div>

        {/* Color Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            ICON COLOR
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="color"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
              style={{
                width: '36px',
                height: '36px',
                padding: 0,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                background: 'transparent'
              }}
            />
            <input
              type="text"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                width: '90px'
              }}
            />
          </div>
        </div>

        {/* Container Shape */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            CONTAINER SHAPE
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['none', 'circle', 'rounded', 'square'] as const).map((shape) => (
              <button
                key={shape}
                onClick={() => setContainerShape(shape)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: containerShape === shape ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.03)',
                  color: containerShape === shape ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Available Icons & Preview Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {/* Icons Grid */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            maxHeight: '440px',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(68px, 1fr))', gap: '8px' }}>
            {filteredIcons.map((item) => {
              const IconComp = (LucideIcons as any)[item.name] || LucideIcons.Sparkles;
              const isSelected = selectedIconName === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedIconName(item.name)}
                  title={item.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '10px 4px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    background: isSelected ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.02)',
                    color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <IconComp size={20} strokeWidth={2} />
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      maxWidth: '60px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Preview & Code Inspector */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
                Selected Icon: {selectedIconName}
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {iconSize}px · {strokeWidth}px stroke
              </span>
            </div>

            {/* Rendered Container Preview */}
            <div
              style={{
                height: '140px',
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: containerShape === 'none' ? '0' : '16px',
                  borderRadius: shapeBorderRadius[containerShape],
                  background: containerShape === 'none' ? 'transparent' : containerBg,
                  border: containerShape === 'none' ? 'none' : `1px solid ${iconColor}44`,
                  transition: 'all 0.2s ease'
                }}
              >
                <ActiveIconComponent
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  color={iconColor}
                />
              </div>
            </div>
          </div>

          {/* Export */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                React / TSX Import
              </span>
              <CopyButton text={reactSnippet} label="Copy Import" />
            </div>
            <pre
              style={{
                background: '#090d16',
                padding: '0.9rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#38bdf8',
                margin: 0,
                border: '1px solid var(--border-color)'
              }}
            >
              {reactSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
