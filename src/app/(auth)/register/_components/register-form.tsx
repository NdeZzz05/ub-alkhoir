"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/types";
import { useActionState, useEffect } from "react";
import { pushAlert } from "@/lib/client";
import { Register } from "../lib/action";
import Link from "next/link";
import { redirect } from "next/navigation";

const initialState: ActionResult = {
  error: "",
};

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [state, formAction, isPending] = useActionState(async (_: unknown, formData: FormData) => {
    return await Register(_, formData);
  }, initialState);

  useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }
    if (state.success && state.redirectURL) {
      pushAlert(state.success, "success");
      redirect(state.redirectURL);
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Daftar</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Pengguna</Label>
                <Input name="name" id="name" type="text" placeholder="fernandes" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" placeholder="email@google.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone_number">Nomor Whatsapp (Diawali 62)</Label>
                <Input name="phone_number" id="phone_number" type="number" placeholder="6289531405606" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Kata Sandi</Label>
                </div>
                <Input name="password" id="password" type="password" placeholder="*****" required />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Memproses..." : "Daftar"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Sudah punya akun?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Masuk sekarang
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
