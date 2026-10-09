// tests/unit/contrast-calculator.test.js
// Unit tests for WCAG contrast ratio calculation and thresholds
const assert = require('assert');

function getLuminance(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function calculateContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

console.log('🧪 Running WCAG Contrast Ratio Unit Tests...\n');

// Black on White: 21:1
const blackWhite = calculateContrastRatio('#000000', '#ffffff');
assert.strictEqual(blackWhite, 21, 'Black on white must equal 21:1');
console.log(`✅ Black on White: ${blackWhite}:1 (Passed)`);

// White on Black: 21:1
const whiteBlack = calculateContrastRatio('#ffffff', '#000000');
assert.strictEqual(whiteBlack, 21, 'White on black must equal 21:1');
console.log(`✅ White on Black: ${whiteBlack}:1 (Passed)`);

// Brand Dark Theme: Text #f8fafc on Background #090d16
const brandTextRatio = calculateContrastRatio('#f8fafc', '#090d16');
assert.ok(brandTextRatio >= 14, `Brand theme contrast must exceed 14:1 (got ${brandTextRatio}:1)`);
console.log(`✅ Brand text on background: ${brandTextRatio}:1 (Passed AAA)`);

// Identical colors: 1:1
const sameColor = calculateContrastRatio('#10b981', '#10b981');
assert.strictEqual(sameColor, 1, 'Identical colors must equal 1:1');
console.log(`✅ Identical colors: ${sameColor}:1 (Passed)`);

console.log('\n🎉 ALL CONTRAST RATIO UNIT TESTS PASSED!\n');
