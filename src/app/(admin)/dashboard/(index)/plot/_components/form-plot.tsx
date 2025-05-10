// "use client";

// import React, { useActionState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useFormStatus } from "react-dom";
// import { postPlot, updatePlot } from "../lib/action";
// import { ActionResult } from "@/types";
// import { Plot } from "@prisma/client";
// import Link from "next/link";
// import { pushAlert } from "@/lib/client";
// import { redirect } from "next/navigation";

// const initialState: ActionResult = {
//   error: "",
// };

// interface FormPlotProps {
//   type?: "ADD" | "EDIT";
//   data?: Plot | null;
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return <Button disabled={pending}>{pending ? "Loading..." : "Simpan Kavling"}</Button>;
// }

// export default function FormPlot({ data, type }: FormPlotProps) {
//   const updateWithId = (_: unknown, formData: FormData) => updatePlot(_, formData, data?.id ?? "");

//   const [state, formAction] = useActionState(type === "ADD" ? postPlot : updateWithId, initialState);

//   useEffect(() => {
//     if (state.error) {
//       pushAlert(state.error, "danger");
//     }
//     if (type === "EDIT" && state.success && state.redirectURL) {
//       pushAlert(state.success, "success");
//       redirect(state.redirectURL);
//     }
//     if (type === "ADD" && state.success && state.redirectURL) {
//       pushAlert(state.success, "success");
//       redirect(state.redirectURL);
//     }
//   }, [state, type]);
//   return (
//     <>
//       <div className="flex flex-1 flex-col gap-4 p-4">
//         <div className="w-full bg-muted/50 p-4 pt-8 justify-items-center h-full">
//           <form action={formAction}>
//             <Card className="w-[350px]">
//               <CardHeader>
//                 <CardTitle>Kavling</CardTitle>
//                 <CardDescription>Kamu wajib memasukkan nama kavling beserta blok</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid w-full items-center gap-4">
//                   <div className="flex flex-col space-y-1.5">
//                     <Label htmlFor="name">Nama Kavling</Label>
//                     <Input id="name" name="name" type="text" placeholder="Perumnas 1" defaultValue={data?.name} />
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button variant="outline" type="button">
//                   <Link href={"/dashboard/plot"}>Keluar</Link>
//                 </Button>
//                 <SubmitButton />
//               </CardFooter>
//             </Card>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
