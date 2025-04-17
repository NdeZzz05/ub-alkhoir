"use server";

import { schemaPlot } from "@/lib/schema";
import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";

export async function postPlot(_: unknown, formData: FormData): Promise<ActionResult> {
  const validate = schemaPlot.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message };
  }

  try {
    await prisma.plot.create({
      data: {
        name: validate.data.name,
      },
    });

    return {
      error: "",
      success: "Berhasil buat data kavling",
      redirectURL: "/dashboard/plot",
    };
  } catch (error) {
    console.error(error);
    return { error: "Gagal membuat data kavling" };
  }
}

export async function updatePlot(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const validate = schemaPlot.pick({ name: true }).safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message };
  }

  try {
    await prisma.plot.update({
      where: { id },
      data: {
        name: validate.data.name,
      },
    });
    return {
      error: "",
      success: "Berhasil mengubah data kavling",
      redirectURL: "/dashboard/plot",
    };
  } catch (error) {
    console.error(error);
    return { error: "Gagal mengubah data kavling" };
  }
}

export async function deletePlot(_: unknown, formData: FormData, id: string): Promise<ActionResult> {
  const plot = await prisma.plot.findFirst({
    where: { id },
  });

  if (!plot) {
    return { error: "Kavling tidak ditemukan" };
  }

  try {
    await prisma.plot.delete({
      where: { id },
    });

    return {
      error: "",
      success: "Berhasil menghapus data kavling",
      redirectURL: "/dashboard/plot",
    };
  } catch (error) {
    console.error(error);
    return { error: "Gagal menghapus data Kavling" };
  }
}
