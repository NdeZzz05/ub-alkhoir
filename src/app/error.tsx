"use client";

import { pushAlert } from "@/lib/client";
import { useEffect } from "react";

export const runtime = "nodejs";

export const metadata = {
  title: "Galat | UB Al-Khoir",
};

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    pushAlert(error.message, "danger");
  }, [error.message]);
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-red-100 grow text-stone-700">
      <h2 className="mt-4 text-3xl font-bold text-center animate-bounce md:text-5xl">Oops, galat pada server.</h2>
      <button className="text-center px-8 transition-colors py-1 hover:text-orange-400 hover:underline rounded-full md:text-xl" onClick={() => reset()}>
        Coba lagi
      </button>
    </main>
  );
}
