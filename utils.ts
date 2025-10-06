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