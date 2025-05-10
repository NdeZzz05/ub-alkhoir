"use client";

import * as React from "react";
import { useActionState } from "react";
import { Logout } from "../lib/action";
import { ActionResult } from "@/types";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { pushAlert } from "@/lib/client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const initialState: ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant={"destructive"} disabled={pending} className="w-full flex justify-center items-center gap-2">
      {pending ? (
        "Loading..."
      ) : (
        <>
          <LogOutIcon size={16} /> Keluar
        </>
      )}
    </Button>
  );
}

export default function FormLogout() {
  const [state, formAction] = useActionState(Logout, initialState);
  const clearCart = useCart((state) => state.clearCart);
  const router = useRouter();

  React.useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }
    if (state.success && state.redirectURL) {
      clearCart();
      pushAlert(state.success, "success");
      router.push(state.redirectURL);
    }
  }, [state, clearCart, router]);
  return (
    <>
      <form action={formAction}>
        <SubmitButton />
      </form>
    </>
  );
}
