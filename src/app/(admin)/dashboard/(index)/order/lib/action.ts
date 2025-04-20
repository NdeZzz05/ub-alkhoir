"use server";

import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { getUser } from "@/lib/auth";
import { Prisma, StatusOrder } from "@prisma/client";

export async function updateStatusOrder(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const { user } = await getUser();
  if (user?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  let redirectURL = "";
  const page = formData.get("page")?.toString();
  if (page === "list") {
    redirectURL = "/dashboard/order";
  } else if (page === "detail") {
    redirectURL = `/dashboard/order/detail/${id}`;
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        order_detail: true,
      },
    });

    if (!order) {
      return { error: "Order tidak ditemukan" };
    }

    let nextStatus: StatusOrder;

    switch (order.status_order) {
      case "processed":
        nextStatus = "shipped";
        break;
      case "shipped":
        nextStatus = "completed";
        break;
      default:
        return { error: "Status tidak dapat diubah dari posisi saat ini" };
    }

    // Siapkan data yang akan diupdate
    const updateData: Prisma.OrderUpdateInput = {
      status_order: nextStatus,
    };

    // Jika sedang di tahap shipped dan metode pembayaran COD & belum dibayar
    if (nextStatus === "completed" && order.order_detail?.payment_method === "cod" && order.status_payment === "pending") {
      updateData.status_payment = "paid";
    }

    console.log(updateData, "update data");

    await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return {
      error: "",
      success: "Berhasil mengubah status order",
      redirectURL,
    };
  } catch (error) {
    console.error("Gagal update status order:", error);
    return { error: "Terjadi kesalahan saat mengubah status" };
  }
}
