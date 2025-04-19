"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderType, PaymentMethod, StatusOrder, StatusPayment } from "@prisma/client";
import { updateStatusOrder } from "../lib/action";
import { ActionResult } from "@/types";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { pushAlert } from "@/lib/client";
import { redirect, useRouter } from "next/navigation";

type Props = {
  id?: string;
  page?: "list" | "detail";
  status_order?: StatusOrder;
  status_payment?: StatusPayment;
  payment_method?: PaymentMethod;
  type_order?: OrderType;
};

const initialState: ActionResult = {
  error: "",
};

type SubmitButtonProps = {
  label: string;
  disabled: boolean;
  style?: string;
};

function SubmitButton({ label, disabled, style }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;
  return (
    <Button disabled={isDisabled} size="sm" className={style}>
      {pending ? "Loading..." : label}
    </Button>
  );
}

export default function OrderActionButton({ id, page, status_order, status_payment, payment_method, type_order }: Props) {
  const isTransferPending = status_payment === "pending" && payment_method === "transfer";

  const updateStatus = (_: unknown, formData: FormData) => updateStatusOrder(_, formData, id ?? "");

  const [state, formAction] = useActionState(updateStatus, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }
    if (state.success && state.redirectURL) {
      pushAlert(state.success, "success");
      if (state.redirectURL) {
        redirect(state.redirectURL);
      } else {
        redirect(state.redirectURL);
      }
    }
  }, [state, router]);

  if (!id) return null;

  if (status_order === "processed") {
    if (isTransferPending) {
      return <SubmitButton label="Belum Dibayar" disabled={true} style="p-2 text-xs bg-gray-400 text-white cursor-not-allowed" />;
    }

    if (type_order === "pick_up") {
      return (
        <form action={formAction}>
          <input type="hidden" name="page" value={page} />
          <SubmitButton label="Pesanan Siap" disabled={false} style="p-2 text-xs bg-emerald-500 hover:bg-emerald-600 text-white" />
        </form>
      );
    }

    return (
      <form action={formAction}>
        <input type="hidden" name="page" value={page} />
        <SubmitButton label="Kirim Pesanan" disabled={false} style="p-2 text-xs bg-blue-500 hover:bg-blue-600 text-white" />
      </form>
    );
  }

  if (status_order === "shipped") {
    return (
      <form action={formAction}>
        <input type="hidden" name="page" value={page} />
        <SubmitButton label="Pesanan Diterima" disabled={false} style="p-2 text-xs bg-yellow-500 hover:bg-yellow-600 text-white" />
      </form>
    );
  }

  if (status_order === "completed") {
    return <Badge className="bg-green-500 text-white">Selesai</Badge>;
  }

  if (status_order === "canceled") {
    return <Badge variant="destructive">Batal</Badge>;
  }

  return null;
}
