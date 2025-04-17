"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { ActionResult, PromoWithProducts } from "@/types";
import Link from "next/link";
import { pushAlert } from "@/lib/client";
import UploadImage from "./upload-image";
import { postPromo, updatePromo } from "../lib/action";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { redirect } from "next/navigation";

const initialState: ActionResult = {
  error: "",
};

export interface Product {
  id: string;
  name: string;
  image: string;
}

interface FormPromoProps {
  type?: "ADD" | "EDIT";
  data?: PromoWithProducts | null;
  products?: Product[];
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>{pending ? "Loading..." : "Simpan Promo"}</Button>;
}

export default function FormPromo({ data, type, products }: FormPromoProps) {
  const updateWithId = (_: unknown, formData: FormData) => updatePromo(_, formData, data?.id ?? "");

  const [state, formAction] = useActionState(type === "ADD" ? postPromo : updateWithId, initialState);

  useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }
    if (type === "EDIT" && state.success && state.redirectURL) {
      pushAlert(state.success, "success");
      redirect(state.redirectURL);
    }
    if (type === "ADD" && state.success && state.redirectURL) {
      pushAlert(state.success, "success");
      redirect(state.redirectURL);
    }
  }, [state, type]);
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="w-full bg-muted/50 p-4 pt-8 justify-items-center h-full">
          <form action={formAction}>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Promo</CardTitle>
                <CardDescription>Kamu wajib memasukkan semua data yang diperlukan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <UploadImage data={data?.image} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="discount_percentage">Persentase Diskon</Label>
                    <Input id="discount_percentage" name="discount_percentage" type="number" placeholder="1-100" max={100} defaultValue={data?.discount_percentage} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="products">Produk</Label>
                    <div className="flex flex-col gap-1">
                      {type === "ADD"
                        ? products?.map((product) => (
                            <div key={product.id} className="flex items-center border p-2 rounded-md">
                              <Checkbox name="products" value={product.id} id={`product-${product.id}`} />
                              <Image className="w-16 h-16 object-cover" src={getImageUrl(product.image, "product")} alt={product.name} width={100} height={100} />
                              <label htmlFor={`product-${product.id}`} className="text-sm font-medium leading-none pl-2">
                                {product.name}
                              </label>
                            </div>
                          ))
                        : data?.products.map((product) => (
                            <div key={product.id} className="flex items-center border p-2 rounded-md">
                              <Checkbox name="products" value={product.id} id={`product-${product?.id}`} defaultChecked={data?.products.some((p) => p.id === product.id)} disabled={type === "EDIT"} />
                              <Image className="w-16 h-16 object-cover" src={getImageUrl(product.image, "product")} alt={product.name} width={100} height={100} />
                              <label htmlFor={`product-${product.id}`} className="text-sm font-medium leading-none pl-2">
                                {product.name}
                              </label>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Link href={"/dashboard/promo"}>Keluar</Link>
                </Button>
                <SubmitButton />
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
}
