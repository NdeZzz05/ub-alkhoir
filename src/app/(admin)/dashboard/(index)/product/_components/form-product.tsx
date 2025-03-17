"use client";

import React, { ReactNode, useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "./upload-image";
import { NumericFormat } from "react-number-format";
import { ActionResult } from "@/types";
import { storeProduct, updateProduct } from "../lib/action";
import { pushAlert } from "@/lib/client";
import { Product } from "@prisma/client";

interface FormProductProps {
  children: ReactNode;
  type: "ADD" | "EDIT";
  data?: Product | null;
}

const initialFormState: ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>{pending ? "Loading..." : "Simpan Produk"}</Button>;
}

export default function FormProduct({ children, type, data }: FormProductProps) {
  const updateProductWithId = (_: unknown, formData: FormData) => updateProduct(_, formData, data?.id ?? "");

  const [state, formAction] = useActionState(type === "ADD" ? storeProduct : updateProductWithId, initialFormState);

  useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }
    console.log(state.error);
  }, [state]);
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="w-full bg-muted/50 p-4 pt-8 justify-items-center h-full">
          <form action={formAction}>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Produk</CardTitle>
                <CardDescription>aa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <UploadImage data={data?.image} />
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nama Produk</Label>
                    <Input id="name" name="name" type="text" placeholder="nama produk" required defaultValue={data?.name} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Harga</Label>
                    <NumericFormat
                      id="price"
                      name="price"
                      required
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={0}
                      allowNegative={false}
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="harga produk"
                      defaultValue={data?.price}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="stock">Stok</Label>
                    <NumericFormat
                      id="stock"
                      name="stock"
                      required
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={0}
                      allowNegative={false}
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="stok produk"
                      defaultValue={data?.stock}
                    />
                  </div>
                  {children}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea id="description" name="description" placeholder="Deskripsi produk" defaultValue={data?.description} required />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Link href={"/dashboard/product"}>Keluar</Link>
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
