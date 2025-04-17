import { getUser } from "@/lib/auth";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Tidak Ditemukan | UB AL-Khoir",
};

export default async function NotFound() {
  const { session } = await getUser();
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-stone-100 grow text-stone-700">
      <h2 className="mt-4 text-3xl font-bold text-center animate-bounce md:text-5xl">404 Tidak Ditemukan</h2>
      <p className="text-center md:text-xl">Halaman yang kamu cari tidak ada.</p>
      <p className="text-center md:text-xl">
        Kembali ke{" "}
        <Link className="transition-all text-primary hover:underline hover:text-stone-500" href={session ? "/" : "/"}>
          {"Beranda"}
        </Link>
      </p>
    </main>
  );
}
