"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error("Error fetching coins:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Top 10 Cryptocurrencies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="border p-4 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <h2 className="text-lg font-semibold">{coin.name}</h2>
              <span className="text-gray-500 uppercase">
                {coin.symbol}
              </span>
            </div>
            <p className="mt-2 text-xl font-bold">${coin.current_price}</p>
            <p
              className={`mt-1 ${
                coin.price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}% (24h)
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
