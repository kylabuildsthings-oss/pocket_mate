import { PocketMateMode } from "@/store/mode/useModeStore";

export type ModeAwareContext = {
  mode: PocketMateMode;
  fundsLabel: string;
  riskLabel: string;
  executionLabel: string;
  glowColor: string;
};

export function getModeAwareContext(mode: PocketMateMode): ModeAwareContext {
  if (mode === "live") {
    return {
      mode,
      fundsLabel: "Real wallet funds",
      riskLabel: "Real market risk",
      executionLabel: "Read-only live + simulated execution",
      glowColor: "green.400",
    };
  }

  return {
    mode,
    fundsLabel: "Demo testnet funds",
    riskLabel: "Zero financial risk",
    executionLabel: "Simulated execution",
    glowColor: "pm.primarySoft",
  };
}
