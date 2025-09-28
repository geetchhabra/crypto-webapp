// src/lib/coingecko.ts
import axios from "axios";
import type { Coin } from "../types/coin";

export const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

export async function getMarkets(per_page = 10): Promise<Coin[]> {
  const res = await api.get<Coin[]>("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page,
      page: 1,
      sparkline: true,
    },
  });
  return res.data;
}

export async function getMarketChartRange(id: string, from: number, to: number) {
  const res = await api.get(`/coins/${encodeURIComponent(id)}/market_chart/range`, {
    params: { vs_currency: "usd", from, to },
  });
  return res.data;
}
