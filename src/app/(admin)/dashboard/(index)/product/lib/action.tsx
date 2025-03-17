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
    image: (formData.getAll("image") as File[]).slice(0, 3),
  });

  if (!parse.success) {
    return { error: parse.error.errors[0].message };
  }

  const uploaded_image = parse.data.image as File[];
  const filenames = [];

  for (const image of uploaded_image) {
    const fileName = await uploadFile(image, "product");
    filenames.push(fileName);
  }

  const cleanPrice = parse.data.price.replace(/\./g, "");
  const cleanStock = parse.data.stock.replace(/\./g, "");

  try {
    await prisma.product.create({
      data: {
        name: parse.data.name,
        price: Number.parseInt(cleanPrice),
        description: parse.data.description,
        category_id: parse.data.category_id,
        stock: Number.parseInt(cleanStock),
        image: filenames,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Gagal membuat produk baru" };
  }
  return redirect("/dashboard/product");
}

export async function updateProduct(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  console.log(id, "upp");
  const parse = schemaProductEdit.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    stock: formData.get("stock"),
    id: id,
  });

  if (!parse.success) {
    return { error: parse.error.errors[0].message };
  }

  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });

  if (!product) {
    return { error: "Produk tidak ditemukan" };
  }

  const uploaded_image = formData.getAll("image") as File[];
  let filename = [];

  if (uploaded_image.length === 3) {
    const parseImage = schemaProduct.pick({ image: true }).safeParse({
      image: uploaded_image,
    });

    if (!parseImage.success) {
      return { error: "Gagal dalam unggah gambar" };
    }

    for (const image of uploaded_image) {
      const fileName = await uploadFile(image, "product");
      filename.push(fileName);
    }
  } else {
    filename = product.image;
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: parse.data.name,
        price: Number.parseInt(parse.data.price.replace(/\./g, "")),
        description: parse.data.description,
        category_id: parse.data.category_id,
        stock: Number.parseInt(parse.data.stock.replace(/\./g, "")),
        image: filename,
      },
    });
  } catch (error) {
    console.log(error);

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
    return { error: "Gagal menghapus kategori" };
  }
  return redirect("/dashboard/product");
}
