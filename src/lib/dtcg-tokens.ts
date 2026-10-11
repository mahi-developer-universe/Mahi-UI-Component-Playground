import { ThemeName } from '@/types';

export interface DTCGToken {
  $value: string | number;
  $type: 'color' | 'dimension' | 'number' | 'shadow';
  $description?: string;
}

export interface DTCGTokenGroup {
  [key: string]: DTCGToken | DTCGTokenGroup;
}

export function exportDTCGDesignTokens(themeName: ThemeName, radius: number, blur: number, borderAlpha: number): Record<string, any> {
  const themeColors: Record<ThemeName, { brand: string; bg: string; card: string; text: string }> = {
    dark: { brand: '#6366f1', bg: '#0b0f19', card: '#111827', text: '#f9fafb' },
    light: { brand: '#4f46e5', bg: '#ffffff', card: '#f3f4f6', text: '#111827' },
    cyberpunk: { brand: '#00ffcc', bg: '#05050d', card: '#0f0f1b', text: '#00ffcc' },
    emerald: { brand: '#10b981', bg: '#061a14', card: '#0d281e', text: '#ecfdf5' },
    sunset: { brand: '#f97316', bg: '#1c0b05', card: '#2a1208', text: '#fff7ed' }
  };

  const currentTheme = themeColors[themeName] || themeColors.dark;

  return {
    $name: `Mahi Design Tokens - ${themeName}`,
    $version: '1.0.0',
    color: {
      brand: {
        primary: {
          $value: currentTheme.brand,
          $type: 'color',
          $description: 'Primary brand accent color for active interactive states'
        }
      },
      surface: {
        background: {
          $value: currentTheme.bg,
          $type: 'color',
          $description: 'Page background canvas color'
        },
        card: {
          $value: currentTheme.card,
          $type: 'color',
          $description: 'Elevated container card background'
        }
      },
      text: {
        main: {
          $value: currentTheme.text,
          $type: 'color',
          $description: 'Primary foreground text color'
        }
      }
    },
    dimension: {
      radius: {
        custom: {
          $value: `${radius}px`,
          $type: 'dimension',
          $description: 'Calibrated boundary corner radius'
        },
        sm: { $value: '4px', $type: 'dimension' },
        md: { $value: '8px', $type: 'dimension' },
        lg: { $value: '16px', $type: 'dimension' },
        xl: { $value: '24px', $type: 'dimension' }
      },
      blur: {
        glass: {
          $value: `${blur}px`,
          $type: 'dimension',
          $description: 'Glassmorphic backdrop blur filter depth'
        }
      }
    },
    opacity: {
      border: {
        $value: borderAlpha / 100,
        $type: 'number',
        $description: 'Surface border opacity multiplier'
      }
    }
  };
}
