export type Link =
  | { href: string; id: string; label: string }
  | { href?: never; id: string; label: React.ReactNode };