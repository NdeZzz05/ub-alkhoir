"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="flex items-center gap-1">
      <ArrowLeft width={20} color="green" />
    </button>
  );
}
