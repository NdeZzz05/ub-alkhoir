"use server";

import { schemaPromo } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function postPromo(_: unknown, formData: FormData): Promise<ActionResult> {
  const validate = schemaPromo.safeParse({
    discount_percentage: Number(formData.get("discount_percentage")),
    image: formData.get("image"),
    products: formData.getAll("products"),
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message };
  }

  try {
    const fileName = await uploadFile(validate.data.image, "promo");

    await prisma.promo.create({
      data: {
        discount_percentage: validate.data.discount_percentage,
        image: fileName,
        products: {
          connect: validate.data.products.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Gagal membuat promo" };
  }
  return redirect("/dashboard/promo");
}

export async function updatePromo(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const fileUpload = formData.get("image") as File;

  const validate = schemaPromo.pick({ discount_percentage: true }).safeParse({
    discount_percentage: Number(formData.get("discount_percentage")),
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message };
  }

  const promo = await prisma.promo.findFirst({
    where: { id },
    select: { image: true, products: true },
  });

  let fileName = promo?.image;

  if (fileUpload && fileUpload.name !== "undefined" && fileUpload.size > 0) {
    fileName = await uploadFile(fileUpload, "promo");
  }

  try {
    await prisma.promo.update({
      where: { id },
      data: {
        discount_percentage: validate.data.discount_percentage,
        image: fileName,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Gagal mengubah promo" };
  }

  return redirect("/dashboard/promo");
}

export async function deletePromo(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const promo = await prisma.promo.findFirst({
    where: { id },
    select: { image: true },
  });

  if (!promo) {
    return { error: "Promo tidak ditemukan" };
  }

  try {
    deleteFile(promo.image, "promo");

    await prisma.promo.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return { error: "Gagal menghapus promo" };
  }
  return redirect("/dashboard/promo");
}
