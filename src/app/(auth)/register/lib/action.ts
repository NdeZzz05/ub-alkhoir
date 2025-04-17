"use server";

import { schemaRegister } from "@/lib/schema";
import { ActionResult } from "@/types";
import bcrypt from "bcrypt";
import prisma from "../../../../../lib/prisma";

export async function Register(_: unknown, formData: FormData): Promise<ActionResult> {
  const parse = schemaRegister.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
    phone_number: formData.get("phone_number") ?? "",
  });

  if (!parse.success) {
    return { error: parse.error.errors[0].message };
  }

  const existingUser = await prisma.user.findFirst({
    where: { email: parse.data.email },
  });

  if (existingUser) {
    return {
      error: "Email sudah dipakai. Gunakan email yang lain, ya!",
    };
  }

  const hashedPassword = await bcrypt.hash(parse.data.password, 12);

  try {
    await prisma.user.create({
      data: {
        name: parse.data.name,
        email: parse.data.email,
        password: hashedPassword,
        phone_number: parse.data.phone_number,
        role: "customer",
      },
    });

    return {
      error: "",
      success: "Akun berhasil dibuat! Silakan masuk untuk mulai belanja.",
      redirectURL: "/login",
    };
  } catch (error) {
    console.log(error);
    return { error: "Oops! Gagal membuat akun. Silakan coba lagi." };
  }
}
