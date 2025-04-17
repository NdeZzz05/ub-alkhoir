import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { redirect } from "next/navigation";

export async function updateStatusOrderById(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  try {
    await prisma.order.update({
      where: { id },
      data: {
        status_order: "shipped",
      },
    });

    return redirect("/dashboard/order");
  } catch (error) {
    console.error(error);
    return { error: "Gagal mengubah kategori" };
  }
}
