"use server";

import { getUser, lucia } from "@/lib/auth";
import { ActionResult } from "@/types";
import { cookies } from "next/headers";

export async function Logout(): Promise<ActionResult> {
  const { session } = await getUser();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return {
    error: "",
    success: "Kamu sudah keluar dari akun. Jangan lupa balik lagi ya!",
    redirectURL: "/login",
  };
}
