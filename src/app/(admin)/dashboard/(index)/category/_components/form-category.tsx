"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { postCategory, updateCategory } from "../lib/action";
import { ActionResult } from "@/types";
import { Category } from "@prisma/client";
import Link from "next/link";
import { pushAlert } from "@/lib/client";

const initialState: ActionResult = {
  error: "",
};

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  data?: Category | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>{pending ? "Loading..." : "Simpan Kategori"}</Button>;
}

export default function FormCategory({ data, type }: FormCategoryProps) {
  const updateWithId = (_: unknown, formData: FormData) => updateCategory(_, formData, data?.id ?? "");

  const [state, formAction] = useActionState(type === "ADD" ? postCategory : updateWithId, initialState);

  useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }
  }, [state]);
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="w-full bg-muted/50 p-4 pt-8 justify-items-center h-full">
          <form action={formAction}>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Kategori</CardTitle>
                <CardDescription>Kamu wajib memasukkan nama dan gambar kategori</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nama Kategori</Label>
                    <Input id="name" name="name" type="text" placeholder="nama kategori" defaultValue={data?.name} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="image">Gambar Kategori</Label>
                    <Input id="image" name="image" type="file" placeholder="gambar kategori" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Link href={"/dashboard/category"}>Keluar</Link>
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
