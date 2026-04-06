"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pocketmate_demo_wallet_v1";

function makeDemoAddress(): string {
  const bytes = new Uint8Array(20);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 20; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return `0x${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    ""
  )}`;
}

export type DemoWallet = {
  /** Checksummed-style hex address for display only (no keys stored). */
  address: string;
  /** True after reading or creating localStorage value (avoids hydration flash). */
  ready: boolean;
};

export function useDemoWallet(): DemoWallet {
  const [state, setState] = useState<DemoWallet>({ address: "", ready: false });

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing && /^0x[a-fA-F0-9]{40}$/.test(existing)) {
        setState({ address: existing, ready: true });
        return;
      }
      const next = makeDemoAddress();
      localStorage.setItem(STORAGE_KEY, next);
      setState({ address: next, ready: true });
    } catch {
      setState({ address: makeDemoAddress(), ready: true });
    }
  }, []);

  return state;
}
