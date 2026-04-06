export type PocketMateNavItem = {
  href: string;
  label: string;
};

export const POCKETMATE_NAV: PocketMateNavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/learn", label: "Learn" },
  { href: "/trade", label: "Trade" },
  { href: "/build", label: "Build" },
  /** Legacy community page lives at `/community`; PocketMate hub uses `/hub` for now */
  { href: "/hub", label: "Community" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" },
];

export function isPocketMateAppPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname.startsWith("/legal")) return true;
  if (pathname === "/credits" || pathname.startsWith("/credits/")) return true;
  return POCKETMATE_NAV.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
}
