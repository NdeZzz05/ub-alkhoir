"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandCoins, Store, Truck, Wallet } from "lucide-react";
import React, { useActionState, useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { useFormStatus } from "react-dom";
import { rupiahFormat } from "@/lib/utils";
import { ActionResult } from "@/types";
import { storeOrder } from "../lib/action";
import { pushAlert } from "@/lib/client";
import { redirect } from "next/navigation";

const initialFormState: ActionResult = {
  error: "",
};

type Plot = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

type FormOrderProps = {
  plot: Plot[];
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-1/2">
      {pending ? "Loading..." : "Buat Pesanan"}
    </Button>
  );
}

export default function FormOrder({ plot }: FormOrderProps) {
  const { products, clearCart } = useCart();

  const [orderType, setOrderType] = useState<"delivery" | "pick_up">("delivery");
  const [methodPayment, setMethodPayment] = useState<"cod" | "transfer">("cod");

  const grandTotal = useMemo(() => {
    return products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  }, [products]);

  const storeOrderParams = (_: unknown, formData: FormData) => storeOrder(_, formData, grandTotal, products);
  const [state, formAction] = useActionState(storeOrderParams, initialFormState);

  useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }

    if (state.success && state.redirectPaymentURL) {
      clearCart();
      redirect(state.redirectPaymentURL);
    }
  }, [state, clearCart]);

  return (
    <>
      <form action={formAction}>
        <div className="bg-gray-100 rounded-md ring-1 ring-[#E5E5E5] p-2 mb-2">
          <div className="flex flex-col w-full justify-between gap-3">
            <div>
              <input type="hidden" name="order_type" value={orderType} />
              <p>Tipe Pemesanan</p>
              <div className="flex gap-3">
                <Button className="w-1/2" variant={orderType === "delivery" ? "default" : "outline"} type="button" onClick={() => setOrderType("delivery")}>
                  <Truck className="mr-2 h-4 w-4" />
                  Pesan Antar
                </Button>
                <Button className="w-1/2" variant={orderType === "pick_up" ? "default" : "outline"} type="button" onClick={() => setOrderType("pick_up")}>
                  <Store className="mr-2 h-4 w-4" />
                  Ambil di Toko
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
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
              {orderType === "delivery" && <Textarea name="address" placeholder="Alamat rumah" required />}
              <Input name="notes" placeholder="Catatan" />
            </div>
            <div>
              <input type="hidden" name="payment_method" value={methodPayment} />
              <p>Metode Pembayaran</p>
              <div className="flex gap-3">
                <Button className="w-1/2" type="button" variant={methodPayment === "cod" ? "default" : "outline"} onClick={() => setMethodPayment("cod")}>
                  <HandCoins className="mr-2 h-4 w-4" />
                  COD
                </Button>
                <Button className="w-1/2" type="button" variant={methodPayment === "transfer" ? "default" : "outline"} onClick={() => setMethodPayment("transfer")}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-md ring-1 ring-[#E5E5E5] p-2 mb-2">
          <p>Rincian Pembayaran</p>
          <div className="flex items-center justify-between">
            <p className="text-sm pt-2 text-gray-600">Total Pembayaran</p>
            <p className="font-bold text-sm text-primary">{rupiahFormat(grandTotal)}</p>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
