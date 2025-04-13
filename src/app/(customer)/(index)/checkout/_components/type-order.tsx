import { Button } from "@/components/ui/button";
import { Store, Truck } from "lucide-react";
import React from "react";

export default function TypeOrder() {
  return (
    <>
      <div className="bg-gray-100 rounded-md ring-1 ring-[#E5E5E5] p-2 mb-2">
        <p>Tipe Pemesanan</p>
        <div className="flex w-full justify-between gap-3">
          <Button className="w-1/2" variant={"outline"}>
            <Truck />
            Pesan Antar
          </Button>
          <Button className="w-1/2">
            <Store />
            Ambil di Toko
          </Button>
        </div>
      </div>
    </>
  );
}
