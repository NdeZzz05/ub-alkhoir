import React from "react";
import BackButton from "../_components/back-button";
import { getUser } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

export default async function AccountPage() {
  const { session, user } = await getUser();

  return (
    <>
      <header className="bg-gray-50 w-full p-2">
        <BackButton />
      </header>
      {!session ? (
        <section className="w-full">
          <div className="flex flex-col justify-center items-center p-6 pt-16 text-center">
            <Avatar className="w-28 h-28 mb-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="profile-picture" />
              <AvatarFallback>UB</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold mb-2">Akses akun Anda</h2>
            <p className="text-muted-foreground mb-6">Masuk atau daftar untuk menikmati fitur-fitur terbaik kami!</p>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="default">Masuk</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Daftar</Button>
              </Link>
            </div>
          </div>
        </section>
      ) : (
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
              <Link href="/account/logout">
                <Button variant="destructive" className="w-full flex items-center gap-2">
                  <LogOutIcon size={16} />
                  Keluar
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
