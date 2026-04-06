import { extendTheme } from "@chakra-ui/react";
import { modalTheme } from "@/components/theme/modalTheme";
import { switchTheme } from "@/components/theme/switchTheme";
import { menuTheme } from "@/components/theme/menuTheme";
import { drawerTheme } from "@/components/theme/drawerTheme";

export const colors = {
  brand: {
    purple: "#4F1B7C",
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  /** PocketMate design tokens (Deep Ether–inspired dark navy + accents) */
  pm: {
    bg: "#0b0e14",
    surface: "#12151c",
    surfaceHover: "#1a1f2a",
    border: "#2a3142",
    text: "#f1f5f9",
    muted: "#94a3b8",
    primary: "#0d00a4",
    primarySoft: "#6366f1",
    accent: "#7c3aed",
    success: "#22c55e",
    danger: "#ef4444",
    warning: "#f59e0b",
  },
};

const fonts = {
  heading: `'Slackey', sans-serif`,
  body: `'JetBrains Mono', monospace`,
  /** Use with className from next/font on <html> */
  pmHeading: "var(--font-pm-heading), system-ui, sans-serif",
  pmBody: "var(--font-pm-body), system-ui, sans-serif",
};

const breakpoints = {
  sm: "48em",
  md: "62em",
  lg: "80em",
  xl: "96em",
  "2xl": "120em",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const components = {
  Modal: modalTheme,
  Switch: switchTheme,
  Menu: menuTheme,
  Drawer: drawerTheme,
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  breakpoints,
});
