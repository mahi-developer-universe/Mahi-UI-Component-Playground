/**
 * React Native Code Generator for Mahi UI Components
 * Transforms component specifications and prop configurations into native StyleSheet and JSX implementations.
 */

export function generateReactNativeSnippet(componentId: string, props: Record<string, any>): string {
  switch (componentId) {
    case 'buttons': {
      const label = props.label || 'Interactive Button';
      const variant = props.variant || 'primary';
      const size = props.size || 'md';
      const disabled = Boolean(props.disabled);
      const isLoading = Boolean(props.isLoading);

      return `import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated
} from 'react-native';

interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'shimmer';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const MahiButton: React.FC<ButtonProps> = ({
  label = '${label}',
  variant = '${variant}',
  size = '${size}',
  isLoading = ${isLoading},
  disabled = ${disabled},
  onPress
}) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
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
        activeOpacity={0.85}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || isLoading}
        style={[
          styles.baseButton,
          styles[\`size_\${size}\`],
          styles[\`variant_\${variant}\`],
          disabled && styles.disabledButton
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      >
        {isLoading ? (
          <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#10b981' : '#ffffff'} size="small" />
        ) : (
          <Text
            style={[
              styles.baseText,
              styles[\`text_\${size}\`],
              styles[\`textVariant_\${variant}\`],
              disabled && styles.disabledText
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  baseText: {
    fontWeight: '700',
    letterSpacing: 0.3
  },
  // Sizes
  size_sm: { paddingVertical: 8, paddingHorizontal: 14 },
  size_md: { paddingVertical: 12, paddingHorizontal: 20 },
  size_lg: { paddingVertical: 16, paddingHorizontal: 28 },
  text_sm: { fontSize: 13 },
  text_md: { fontSize: 15 },
  text_lg: { fontSize: 17 },
  // Variants
  variant_primary: { backgroundColor: '#10b981' },
  variant_secondary: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' },
  variant_outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#10b981' },
  variant_ghost: { backgroundColor: 'transparent', shadowOpacity: 0, elevation: 0 },
  variant_gradient: { backgroundColor: '#6366f1' },
  variant_shimmer: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#10b981' },
  textVariant_primary: { color: '#000000' },
  textVariant_secondary: { color: '#f8fafc' },
  textVariant_outline: { color: '#10b981' },
  textVariant_ghost: { color: '#10b981' },
  textVariant_gradient: { color: '#ffffff' },
  textVariant_shimmer: { color: '#34d399' },
  // Disabled
  disabledButton: { opacity: 0.5, shadowOpacity: 0, elevation: 0 },
  disabledText: { color: '#64748b' }
});`;
    }

    case 'badges': {
      const label = props.label || 'Verified Status';
      const variant = props.variant || 'primary';

      return `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  label?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'pulse';
}

export const MahiBadge: React.FC<BadgeProps> = ({
  label = '${label}',
  variant = '${variant}'
}) => {
  return (
    <View style={[styles.badge, styles[\`badge_\${variant}\`]]}>
      {variant === 'pulse' && <View style={styles.pulseDot} />}
      <Text style={[styles.text, styles[\`text_\${variant}\`]]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    gap: 6
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981'
  },
  badge_default: { backgroundColor: '#1e293b', borderColor: '#334155' },
  badge_primary: { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981' },
  badge_success: { backgroundColor: 'rgba(34, 197, 94, 0.15)', borderColor: '#22c55e' },
  badge_warning: { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: '#f59e0b' },
  badge_danger: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: '#ef4444' },
  badge_pulse: { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981' },
  text_default: { color: '#94a3b8' },
  text_primary: { color: '#10b981' },
  text_success: { color: '#22c55e' },
  text_warning: { color: '#f59e0b' },
  text_danger: { color: '#ef4444' },
  text_pulse: { color: '#10b981' }
});`;
    }

    case 'cards': {
      const title = props.title || 'Mahi Card';
      const description = props.description || 'Flexible native container for mobile layouts.';

      return `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  title?: string;
  description?: string;
  onPress?: () => void;
}

export const MahiCard: React.FC<CardProps> = ({
  title = '${title}',
  description = '${description}',
  onPress
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={styles.card}
      accessibilityRole="summary"
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.footer}>
        <Text style={styles.actionText}>Learn more →</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6
  },
  header: {
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff'
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#94a3b8',
    marginBottom: 16
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 12
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981'
  }
});`;
    }

    default: {
      return `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Mahi${componentId.charAt(0).toUpperCase() + componentId.slice(1)}: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mahi UI ${componentId} Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#161e2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  text: {
    color: '#10b981',
    fontWeight: '600'
  }
});`;
    }
  }
}
