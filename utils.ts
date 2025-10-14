/**
 * Simple utility function to join an array of dynamic classes. Removes empty/null/undefined values.
 * @example
 * classes('flex items-center gap-3', className || '')
 */
export function classes(...args: (string | undefined | null)[]): string {
  return (
    args
      // Remove empty/null/undefined values.
      .filter(Boolean)
      .join(' ')
  )
}

export function shuffle(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * Helper function to generate random year between two years
 */
export function getRandomYear(start: number = 2000, end: number = 2025): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
