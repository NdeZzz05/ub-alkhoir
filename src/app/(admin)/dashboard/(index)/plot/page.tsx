// import { Header } from "../_components/header";
// import * as React from "react";
// import { PlusCircle } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
// import { columns } from "./column";
// import { getPlot } from "./lib/data";
// import Link from "next/link";

// export default async function PlotPage() {
//   const dataPlot = await getPlot();
//   return (
//     <>
//       <Header page={"Kavling"} />
//       <div className="flex flex-1 flex-col gap-4 p-4">
//         <div className="flex items-center">
//           <h1 className="text-2xl font-semibold">Kavling dan Blok</h1>
//           <Button size="sm" className="gap-1 ml-auto" asChild>
//             <Link href="/dashboard/plot/create">
//               <PlusCircle className="h-3.5 w-3.5" />
//               <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Tambah Data</span>
//             </Link>
//           </Button>
//         </div>
//         <div className="w-full bg-muted/50 p-4">
//           <DataTable columns={columns} data={dataPlot} />
//         </div>
//       </div>
//     </>
//   );
// }
