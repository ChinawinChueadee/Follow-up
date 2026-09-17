import type { Tone } from "./mock-data";

export const toneText: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  error: "text-error",
  muted: "text-on-surface-variant",
};

export const toneBg: Record<Tone, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  error: "bg-error",
  muted: "bg-on-surface-variant",
};

export const toneHex: Record<Tone, string> = {
  primary: "#3d42cc",
  secondary: "#0277a8",
  tertiary: "#007a53",
  error: "#d93838",
  muted: "#62748e",
};
