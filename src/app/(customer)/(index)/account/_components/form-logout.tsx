"use client";

import * as React from "react";
import { useActionState } from "react";
import { Logout } from "../lib/action";
import { ActionResult } from "@/types";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

const initialState: ActionResult = {
  error: "",
};

export default function FormLogout() {
  const [, formAction] = useActionState(Logout, initialState);
  return (
    <>
      <form action={formAction}>
        <Button variant={"destructive"} className="w-full">
          <LogOutIcon />
          <span className="font-normal ">Keluar</span>
        </Button>
      </form>
    </>
  );
}
