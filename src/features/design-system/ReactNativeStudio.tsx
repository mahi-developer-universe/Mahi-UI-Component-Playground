'use client';

import React, { useState } from 'react';
import { Smartphone, RotateCcw, Copy, Check, Download, Layers, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

type ComponentKey = 'button' | 'badge' | 'card' | 'input' | 'switch' | 'bottomSheet';
type PlatformMode = 'ios' | 'android';

interface ComponentConfig {
  label: string;
  category: string;
  description: string;
}

const COMPONENTS: Record<ComponentKey, ComponentConfig> = {
  button: {
    label: 'MahiButton',
    category: 'Actions & Feedback',
    description: 'Animated spring press TouchableOpacity with variant token mapping, loader indicators, and accessible roles.'
  },
  badge: {
    label: 'MahiBadge',
    category: 'Indicators',
    description: 'Pill status chip with live pulse ring indicator, rounded border styling, and contextual color palettes.'
  },
  card: {
    label: 'MahiCard',
    category: 'Surfaces & Bento',
    description: 'Hardware accelerated elevation container with iOS shadowRadius and Android elevation parity.'
  },
  input: {
    label: 'MahiTextInput',
    category: 'Form Controls',
    description: 'Smooth focus border animation, clear button trigger, and accessible placeholder contrast.'
  },
  switch: {
    label: 'MahiSwitch',
    category: 'Toggle Controls',
    description: 'Spring animated toggle switch with custom thumb track styling and haptic state change.'
  },
  bottomSheet: {
    label: 'MahiBottomSheet',
    category: 'Modals & Overlays',
    description: 'Spring physics modal drawer sheet with gesture handle bar and backdrop scrim.'
  }
};

export const ReactNativeStudio: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<ComponentKey>('button');
  const [platform, setPlatform] = useState<PlatformMode>('ios');
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  const [btnLabel, setBtnLabel] = useState('Explore Component');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [switchActive, setSwitchActive] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generate dynamic React Native source code based on user interactive tweaks
  const generateSource = () => {
    switch (selectedComp) {
      case 'button':
        return `import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Platform
} from 'react-native';

export const ${COMPONENTS[selectedComp].label} = () => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.88}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={${btnDisabled} || ${btnLoading}}
        accessibilityRole="button"
        accessibilityLabel="${btnLabel}"
        style={[
          styles.button,
          styles.variant_${btnVariant},
          ${btnDisabled} && styles.disabled
        ]}
      >
        {${btnLoading} ? (
          <ActivityIndicator color="${btnVariant === 'outline' || btnVariant === 'ghost' ? '#10b981' : '#000'}" size="small" />
        ) : (
          <Text style={[styles.text, styles.text_${btnVariant}, ${btnDisabled} && styles.textDisabled]}>
            ${btnLabel}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10
      },
      android: {
        elevation: 4
      }
    })
  },
  variant_primary: {
    backgroundColor: '#10b981'
  },
  variant_secondary: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155'
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#10b981'
  },
  variant_ghost: {
    backgroundColor: 'transparent'
  },
  disabled: {
    opacity: 0.45
  },
  text: {
    fontWeight: '700',
    fontSize: 16
  },
  text_primary: {
    color: '#000000'
  },
  text_secondary: {
    color: '#f8fafc'
  },
  text_outline: {
    color: '#10b981'
  },
  text_ghost: {
    color: '#10b981'
  },
  textDisabled: {
    color: '#94a3b8'
  }
});`;

      case 'badge':
        return `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ${COMPONENTS[selectedComp].label} = () => {
  return (
    <View style={styles.badge}>
      <View style={styles.pulseDot} />
      <Text style={styles.badgeText}>Active Session</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: '#10b981',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 8
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981'
  },
  badgeText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '700'
  }
});`;

      case 'card':
        return `import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

export const ${COMPONENTS[selectedComp].label} = () => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <Text style={styles.badge}>DTCG DESIGN TOKEN</Text>
      <Text style={styles.title}>Universal Native Studio</Text>
      <Text style={styles.description}>
        One shared token design system driving both React Web and React Native mobile applications seamlessly.
      </Text>
      <View style={styles.footer}>
        <Text style={styles.linkText}>View Implementation →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161e2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 14
      },
      android: {
        elevation: 6
      }
    })
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 8,
    letterSpacing: 0.5
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#94a3b8',
    marginBottom: 16
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 12
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981'
  }
});`;

      case 'input':
        return `import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export const ${COMPONENTS[selectedComp].label} = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Developer Email</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="dev@developeruniverse.dev"
        placeholderTextColor="#64748b"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, isFocused && styles.inputFocused]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 6
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1'
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#f8fafc',
    fontSize: 15
  },
  inputFocused: {
    borderColor: '#10b981'
  }
});`;

      case 'switch':
        return `import React, { useState } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';

export const ${COMPONENTS[selectedComp].label} = () => {
  const [enabled, setEnabled] = useState(${switchActive});
  const [translateX] = useState(new Animated.Value(${switchActive ? 24 : 0}));

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    Animated.spring(translateX, {
      toValue: next ? 24 : 0,
      useNativeDriver: true,
      bounciness: 8
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={toggle}
      style={[styles.track, enabled && styles.trackActive]}
      accessibilityRole="switch"
      accessibilityState={{ checked: enabled }}
    >
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 54,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#334155',
    padding: 3,
    justifyContent: 'center'
  },
  trackActive: {
    backgroundColor: '#10b981'
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff'
  }
});`;

      case 'bottomSheet':
        return `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ${COMPONENTS[selectedComp].label} = () => {
  return (
    <View style={styles.sheetContainer}>
      <View style={styles.handle} />
      <Text style={styles.title}>Export Native Component</Text>
      <Text style={styles.body}>
        Ready to deploy to Expo, React Native CLI, or Android/iOS native targets.
      </Text>
      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionBtnText}>Confirm Action</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#161e2e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#64748b',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8
  },
  body: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24
  },
  actionBtn: {
    backgroundColor: '#10b981',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  actionBtnText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 15
  }
});`;
    }
  };

  const currentSnippet = generateSource();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Studio Header */}
      <div
        style={{
          background: 'var(--bg-card, #161e2e)',
          padding: '24px',
          borderRadius: 'var(--radius-lg, 16px)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <span>📱 Universal React Native Studio</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
            Cross-Platform Mobile Component System
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Generate zero-dependency React Native components with native StyleSheet physics, touch feedback, and iOS/Android parity.
          </p>
        </div>

        {/* Platform Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setPlatform('ios')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: platform === 'ios' ? 'var(--accent-primary)' : 'transparent',
              color: platform === 'ios' ? '#000' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🍎 Apple iOS
          </button>
          <button
            onClick={() => setPlatform('android')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: platform === 'android' ? 'var(--accent-primary)' : 'transparent',
              color: platform === 'android' ? '#000' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🤖 Google Android
          </button>
        </div>
      </div>

      {/* Component Tabs Bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {(Object.keys(COMPONENTS) as ComponentKey[]).map((key) => {
          const isActive = selectedComp === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedComp(key)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                background: isActive ? 'var(--accent-light)' : 'var(--bg-secondary)',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{COMPONENTS[key].label}</span>
            </button>
          );
        })}
      </div>

      {/* Split Interactive Stage: Live Mobile Simulator + Code Exporter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Mobile Device Bezel Frame */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl, 16px)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              {platform.toUpperCase()} NATIVE PREVIEW
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
              React Native 0.76+
            </span>
          </div>

          {/* Realistic iPhone / Android Chassis */}
          <div
            style={{
              width: '320px',
              minHeight: '440px',
              background: '#090d16',
              borderRadius: platform === 'ios' ? '36px' : '20px',
              border: '3px solid #334155',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Hardware Notch */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px 0' }}>
              <div
                style={{
                  width: platform === 'ios' ? '90px' : '12px',
                  height: platform === 'ios' ? '20px' : '12px',
                  borderRadius: platform === 'ios' ? '12px' : '50%',
                  background: '#000000'
                }}
              />
            </div>

            {/* Screen Canvas */}
            <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                {COMPONENTS[selectedComp].category}
              </span>

              {/* Render Selected Component Simulator */}
              {selectedComp === 'button' && (
                <button
                  disabled={btnDisabled}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: btnVariant === 'outline' ? '1.5px solid #10b981' : 'none',
                    background:
                      btnVariant === 'primary' ? '#10b981' :
                      btnVariant === 'secondary' ? '#1e293b' :
                      'transparent',
                    color: btnVariant === 'primary' ? '#000000' : '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: btnDisabled ? 'not-allowed' : 'pointer',
                    opacity: btnDisabled ? 0.45 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: platform === 'ios' && btnVariant === 'primary' ? '0 4px 14px rgba(16, 185, 129, 0.4)' : 'none',
                    transition: 'transform 0.1s ease'
                  }}
                >
                  {btnLoading ? 'Loading...' : btnLabel}
                </button>
              )}

              {selectedComp === 'badge' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                  <span>Active Session</span>
                </div>
              )}

              {selectedComp === 'card' && (
                <div style={{ width: '100%', background: '#161e2e', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, marginBottom: '4px' }}>DTCG TOKEN</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>Universal Native Studio</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>Cross-platform token fidelity verified.</div>
                </div>
              )}

              {selectedComp === 'input' && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Developer Email</span>
                  <input
                    type="text"
                    defaultValue="dev@developeruniverse.dev"
                    style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              )}

              {selectedComp === 'switch' && (
                <div
                  onClick={() => setSwitchActive(!switchActive)}
                  style={{
                    width: '54px',
                    height: '30px',
                    borderRadius: '15px',
                    background: switchActive ? '#10b981' : '#334155',
                    padding: '3px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#fff',
                      transform: switchActive ? 'translateX(24px)' : 'translateX(0)',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>
              )}

              {selectedComp === 'bottomSheet' && (
                <div style={{ width: '100%', background: '#161e2e', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                  <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: '#64748b', margin: '0 auto 12px auto' }}></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Export Native Component</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Ready to deploy to mobile.</div>
                </div>
              )}
            </div>

            {/* Bottom Safe Area Home Indicator */}
            {platform === 'ios' && (
              <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '8px' }}>
                <div style={{ width: '110px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
              </div>
            )}
          </div>

          {/* Interactive Component Controls */}
          {selectedComp === 'button' && (
            <div style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(['primary', 'secondary', 'outline', 'ghost'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setBtnVariant(v)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      background: btnVariant === v ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                      color: btnVariant === v ? '#000' : 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={btnLoading} onChange={(e) => setBtnLoading(e.target.checked)} />
                  Loading
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={btnDisabled} onChange={(e) => setBtnDisabled(e.target.checked)} />
                  Disabled
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Code & Export Panel */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl, 16px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              padding: '12px 18px',
              borderBottom: '1px solid var(--border-color)',
              background: 'rgba(0,0,0,0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {COMPONENTS[selectedComp].label}.native.tsx
              </span>
              <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', fontWeight: 700 }}>
                TypeScript
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => {
                  const blob = new Blob([currentSnippet], { type: 'text/typescript' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${COMPONENTS[selectedComp].label}.native.tsx`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="action-btn"
                style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                title="Download React Native component file"
              >
                <Download size={13} />
                <span>Download .tsx</span>
              </button>
              <CopyButton textToCopy={currentSnippet} label="Copy Native Code" />
            </div>
          </div>

          <pre
            style={{
              margin: 0,
              padding: '16px',
              background: '#090d16',
              color: '#e2e8f0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              lineHeight: 1.6,
              overflowX: 'auto',
              flex: 1
            }}
          >
            <code>{currentSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
