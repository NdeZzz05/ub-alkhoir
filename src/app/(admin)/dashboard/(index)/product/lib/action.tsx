"use server";

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function storeProduct(_: unknown, formData: FormData): Promise<ActionResult> {
  const parse = schemaProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    stock: formData.get("stock"),
    image: formData.get("image") as File,
  });

  if (!parse.success) {
    return { error: parse.error.errors[0].message };
  }

  const uploadedImage = parse.data.image as File;
  let filename = "";

  try {
    filename = await uploadFile(uploadedImage, "product");

    const cleanPrice = parse.data.price.replace(/\./g, "");
    const cleanStock = parse.data.stock.replace(/\./g, "");

    await prisma.product.create({
      data: {
        name: parse.data.name,
        price: Number.parseInt(cleanPrice),
        description: parse.data.description,
        category_id: parse.data.category_id,
        stock: Number.parseInt(cleanStock),
        image: filename,
      },
    });
  } catch (error) {
    console.error("Gagal membuat produk:", error);
    return { error: "Gagal membuat produk baru" };
  }

  return redirect("/dashboard/product");
}

export async function updateProduct(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const parse = schemaProductEdit.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    stock: formData.get("stock"),
    image: formData.get("image") as File,
    id: id,
  });

  if (!parse.success) {
    return { error: parse.error.errors[0].message };
  }

  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    return { error: "Produk tidak ditemukan" };
  }

  let filename = product.image;
  const uploadedImage = formData.get("image") as File;

  if (uploadedImage) {
    try {
      filename = await uploadFile(uploadedImage, "product");
    } catch (error) {
      console.error("Gagal mengunggah gambar:", error);
      return { error: "Gagal mengunggah gambar" };
    }
  }

  try {
    const cleanPrice = parse.data.price.replace(/\./g, "");
    const cleanStock = parse.data.stock.replace(/\./g, "");

    await prisma.product.update({
      where: { id },
      data: {
        name: parse.data.name,
        price: Number.parseInt(cleanPrice),
        description: parse.data.description,
        category_id: parse.data.category_id,
        stock: Number.parseInt(cleanStock),
        image: filename,
      },
    });
  } catch (error) {
    console.error("Gagal mengubah produk:", error);
    return { error: "Gagal mengubah produk" };
  }

  return redirect("/dashboard/product");
}

export async function deleteProduct(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const product = await prisma.product.findFirst({
    where: { id },
    select: { id: true, image: true },
  });

  if (!product) {
    return { error: "Produk tidak ditemukan" };
  }

  try {
    for (const image of product.image) {
      await deleteFile(image, "product");
    }

    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return { error: "Gagal menghapus produk" };
  }
  return redirect("/dashboard/product");
}
