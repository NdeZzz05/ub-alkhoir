import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { deleteCategory } from "../lib/action";
import { pushAlert } from "@/lib/client";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" variant="destructive" disabled={pending}>
      {" "}
      <Trash className="w-4 h-4" />
      {pending ? "Loading..." : "Hapus"}
    </Button>
  );
}
export default function FormDelete({ id }: FormDeleteProps) {
  const deleteCategoryWithId = (_: unknown, formData: FormData) => deleteCategory(_, formData, id);
  const [state, formAction] = useActionState(deleteCategoryWithId, initialState);

  useEffect(() => {
    if (state.error) {
      pushAlert(state.error, "danger");
    }
  }, [state]);
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}
