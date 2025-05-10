// import { Button } from "@/components/ui/button";
// import { ActionResult } from "@/types";
// import { Trash } from "lucide-react";
// import React, { useActionState, useEffect } from "react";
// import { useFormStatus } from "react-dom";
// import { deletePlot } from "../lib/action";
// import { pushAlert } from "@/lib/client";
// import { redirect } from "next/navigation";

// const initialState: ActionResult = {
//   error: "",
// };

// interface FormDeleteProps {
//   id: string;
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button size="sm" variant="destructive" disabled={pending}>
//       {" "}
//       <Trash className="w-4 h-4" />
//       {pending ? "Loading..." : "Hapus"}
//     </Button>
//   );
// }
// export default function FormDelete({ id }: FormDeleteProps) {
//   const deletePlotWithId = (_: unknown, formData: FormData) => deletePlot(_, formData, id);
//   const [state, formAction] = useActionState(deletePlotWithId, initialState);

//   useEffect(() => {
//     if (state.error) {
//       pushAlert(state.error, "danger");
//     }
//     if (state.success && state.redirectURL) {
//       pushAlert(state.success, "success");
//       redirect(state.redirectURL);
//     }
//   }, [state]);
//   return (
//     <form action={formAction}>
//       <SubmitButton />
//     </form>
//   );
// }
