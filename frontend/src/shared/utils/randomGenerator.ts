class SeededRandom {
  private seed: number;

  constructor(seed: string) {
    this.seed = this.hashString(seed);
  }

  // Improved string hashing function
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash >>> 0; // Ensure positive 32-bit integer
  }

  // Linear Congruential Generator
  private lcg(): number {
    // Parameters for the generator
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);

    // Update the seed
    this.seed = (a * this.seed + c) % m;
    return this.seed / m;
  }

  public next(): number {
    return this.lcg();
  }
}

export function generateNormalRandom(
  seed: string,
  mean: number = 0,
  stdDeviation: number = 1
): number {
  const seededRandom = new SeededRandom(seed);
  let u = 0,
    v = 0;
  while (u === 0) u = seededRandom.next(); // Converting [0,1) to (0,1)
  while (v === 0) v = seededRandom.next();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return num * stdDeviation + mean;
}

export function getCentralTendencyRandomInteger(seed: string, min: number, max: number): number {
  const mean = (min + max) / 2;
  const stdDeviation = (max - min) / 6; // 99.7% of values will fall within [min, max]
  let value;
  do {
    value = Math.round(generateNormalRandom(seed, mean, stdDeviation));
  } while (value < min || value > max);
  return value;
}
