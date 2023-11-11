export function hexToRgb(hex: string): string {
  if (hex.startsWith("#")) {
    hex = hex.substring(1);
  }

  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}

export function shouldUseWhiteText(hex: string): boolean {
  // Helper function to convert hex to decimal
  const hexToDec = (hex: string): number => parseInt(hex, 16);

  const r = hexToDec(hex.substring(1, 3)) / 255;
  const g = hexToDec(hex.substring(3, 5)) / 255;
  const b = hexToDec(hex.substring(5, 7)) / 255;

  const sRGB = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );

  const luminance = 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];

  return luminance < 0.5;
}
