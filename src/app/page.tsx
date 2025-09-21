"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

// Define a proper type for coins
type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get<Coin[]>(
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

  if (loading)
    return <p className="text-center mt-10 text-xl font-medium">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Top 10 Cryptocurrencies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="border p-4 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={coin.image}
                alt={coin.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-lg font-semibold">{coin.name}</h2>
              <span className="text-gray-500 uppercase">{coin.symbol}</span>
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
