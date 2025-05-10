import React from "react";
import FormLogout from "../_components/form-logout";
import BackButton from "../../_components/back-button";

export default function LogoutPage() {
  return (
    <>
      <header className="bg-gray-50 w-full p-2">
        <BackButton />
      </header>

      <section className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Keluar dari Akun?</h2>
        <p className="text-muted-foreground mb-6 max-w-md">Kamu yakin ingin keluar dari akun? Kamu bisa login lagi kapan saja untuk melanjutkan aktivitas.</p>

        <div className="w-full max-w-xs">
          <FormLogout />
        </div>
        <span className="text-xs text-muted-foreground pt-8">Versi 1.0.1</span>
      </section>
    </>
  );
}
