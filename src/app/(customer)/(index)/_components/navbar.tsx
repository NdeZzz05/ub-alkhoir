"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";

const data = [
  {
    title: "Beranda",
    url: "/",
    emoji: "🏠",
  },
  {
    title: "Katalog",
    url: "/catalog",
    emoji: "📇",
  },
  {
    title: "Keranjang",
    url: "/carts",
    emoji: "🛒",
  },
  {
    title: "Transaksi",
    url: "/transactions",
    emoji: "💸",
  },
  {
    title: "Akun",
    url: "/account",
    emoji: "🙍‍♂️",
  },
];
export default function Navbar() {
  const { products } = useCart();
  const totalItems = products.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div id="navbar" className="fixed bottom-0 z-20 w-full max-w-sm">
      <div className="bg-gray-50 p-2 border-t">
        <div className="flex items-center gap-4">
          {data.map((item) => (
            <Link href={item.url} key={item.title} className="w-full flex flex-col items-center hover:bg-green-100 rounded-md relative">
              <p>{item.emoji} </p>
              <p className="text-gray-800 hover:text-gray-900 text-sm">{item.title}</p>
              {item.title === "Keranjang" ? (
                <div className="bg-red-500 text-xs text-white rounded-sm absolute top-0 right-2 px-[2px]">
                  <span>{totalItems}</span>
                </div>
              ) : (
                ""
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
