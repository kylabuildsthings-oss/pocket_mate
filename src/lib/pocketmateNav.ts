export type PocketMateNavItem = {
  href: string;
  label: string;
};

export const POCKETMATE_NAV: PocketMateNavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/learn", label: "Learn" },
  { href: "/trade", label: "Trade" },
  { href: "/build", label: "Build" },
  { href: "/glossary", label: "Glossary" },
  /** DefiKids legacy page lives at `/community`; PocketMate hub uses `/hub` for now */
  { href: "/hub", label: "Community" },
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
];

export function isPocketMateAppPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname.startsWith("/legal")) return true;
  return POCKETMATE_NAV.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
}
