// src/hooks/useCoins.ts

"use client";

import { useEffect, useState } from "react";
import type { Coin } from "../types/coin";
import { getMarkets } from "../lib/coingecko";

export default function useCoins(perPage = 10) {
  // Fix: Properly type the state variables instead of using implicit 'any'
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getMarkets(perPage)
      .then((data) => {
        if (!mounted) return;
        setCoins(data);
      })
      .catch((e) => {
        if (!mounted) return;
        // Fix: Properly type the error as Error
        setError(e instanceof Error ? e : new Error(String(e)));
        console.error("useCoins error:", e);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [perPage]);

  return { 
    coins, 
    loading, 
    error, 
    refetch: () => getMarkets(perPage).then(setCoins) 
  };
}
