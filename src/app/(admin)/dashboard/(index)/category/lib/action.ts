"use server";

import { schemaCategory } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function postCategory(_: unknown, formData: FormData): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message };
  }

  try {
    const fileName = await uploadFile(validate.data.image, "category");

    await prisma.category.create({
      data: {
        name: validate.data.name,
        image: fileName,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Gagal membuat kategori" };
  }
  return redirect("/dashboard/category");
}

export async function updateCategory(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const fileUpload = formData.get("image") as File;

  const validate = schemaCategory.pick({ name: true }).safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message };
  }

  const category = await prisma.category.findFirst({
    where: { id },
    select: { image: true },
  });

  let fileName = category?.image;

  if (fileUpload.size > 0) {
    fileName = await uploadFile(fileUpload, "category");
  }

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name: validate.data.name,
        image: fileName,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Gagal mengubah kategori" };
  }

  return redirect("/dashboard/category");
}

export async function deleteCategory(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const category = await prisma.category.findFirst({
    where: { id },
    select: { image: true },
  });

  if (!category) {
    return { error: "Kategori tidak ditemukan" };
  }

  try {
    deleteFile(category.image, "category");

    await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return { error: "Gagal menghapus kategori" };
  }
  return redirect("/dashboard/category");
}
