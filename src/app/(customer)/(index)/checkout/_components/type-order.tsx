import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Store, Truck } from "lucide-react";
import React from "react";
import { getPlot } from "../lib/data";
import { Textarea } from "@/components/ui/textarea";

export default async function TypeOrder() {
  const plot = await getPlot();
  return (
    <>
      <div className="bg-gray-100 rounded-md ring-1 ring-[#E5E5E5] p-2 mb-2">
        <p>Tipe Pemesanan</p>
        <div className="flex flex-col w-full justify-between gap-3">
          <div className="flex gap-3">
            <Button className="w-1/2" variant={"outline"}>
              <Truck />
              Pesan Antar
            </Button>
            <Button className="w-1/2">
              <Store />
              Ambil di Toko
            </Button>
          </div>
          <form className="flex flex-col gap-2">
            <Input name="name" placeholder="Nama pembeli" required />
            <Input name="phone" type="number" placeholder="6289531405606 (Nomor WA diawali 62)" required />
            <Select name="plot_id" required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Pilih Data Kavling" />
              </SelectTrigger>
              <SelectContent>
                {plot?.map((item) => (
                  <SelectItem key={item.id} value={`${item.id}`}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea name="address" placeholder="Alamat rumah" />
            <Input name="notes" placeholder="Catatan" />
          </form>
        </div>
      </div>
    </>
  );
}
