"use server";

import { schemaLogIn } from "@/lib/schema";
import { ActionResult } from "@/types";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import prisma from "../../../../../lib/prisma";

export async function LogIn(_: unknown, formData: FormData): Promise<ActionResult> {
  const validate = schemaLogIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message };
  }

  const existingUser = await prisma.user.findFirst({
    where: { email: validate.data.email },
  });

  if (!existingUser) {
    return { error: "Email atau Kata Sandi salah" };
  }

  const comparePassword = bcrypt.compareSync(validate.data.password, existingUser.password);

  if (!comparePassword) {
    return { error: "Email atau Kata Sandi salah" };
  }

  const session = await prisma.session.create({
    data: {
      id: crypto.randomUUID(),
      user_id: existingUser.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return {
    error: "",
    success: "Berhasil masuk. Senang melihatmu lagi!",
    redirectURL: existingUser.role === "admin" ? "/dashboard" : "/",
  };
}
