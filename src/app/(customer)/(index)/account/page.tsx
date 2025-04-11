import React from "react";
import BackButton from "../_components/back-button";
import { getUser } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormLogout from "./_components/form-logout";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const { session, user } = await getUser();

  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <header className="bg-gray-50 w-full p-2">
        <BackButton />
      </header>
      <section className="w-full">
        <div className="flex flex-col justify-center w-full items-center p-4 ">
          <Avatar className="w-36 h-36">
            <AvatarImage src="https://github.com/shadcn.png" alt="profile-picture" />
            <AvatarFallback>UB</AvatarFallback>
          </Avatar>
          <div className="w-2/3 grid gap-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Pengguna</Label>
              <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                {user?.name}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                {user?.email}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone_number">Nomor Whatsapp</Label>
              <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                {user?.phone_number}
              </div>
            </div>
          </div>
          <div className="w-2/3 pt-4">
            <FormLogout />
          </div>
        </div>
      </section>
    </>
  );
}
