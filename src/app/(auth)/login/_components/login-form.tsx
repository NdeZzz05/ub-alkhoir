"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "../lib/action";
import { ActionResult } from "@/types";
import { useActionState, useEffect } from "react";
import { pushAlert } from "@/lib/client";
import Link from "next/link";
import { redirect } from "next/navigation";

const initialState: ActionResult = {
  error: "",
};

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [state, formAction, isPending] = useActionState(async (_: unknown, formData: FormData) => {
    return await LogIn(_, formData);
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
          <CardTitle className="text-2xl">Masuk</CardTitle>
          <CardDescription>Silakan masuk, silakan berbelanja!</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Button variant="outline" className="w-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Masuk Dengan Akun Google
          </Button> */}
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">Atau</span>
              </div> */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" placeholder="email@google.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Kata Sandi</Label>
                  {/* <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Lupa kata sandi?
                  </a> */}
                </div>
                <Input name="password" id="password" type="password" placeholder="*****" required />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Memproses..." : "Masuk"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Belum punya akun?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Daftar Sekarang
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
