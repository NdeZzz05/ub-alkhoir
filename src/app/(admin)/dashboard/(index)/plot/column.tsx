// "use client";

// import * as React from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { Edit } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Plot } from "@prisma/client";
// import Link from "next/link";
// import FormDelete from "./_components/form-delete";

// export const columns: ColumnDef<Plot>[] = [
//   {
//     accessorKey: "name",
//     header: "Nama Kavling",
//   },
//   {
//     id: "actions",
//     header: "Aksi",
//     cell: ({ row }) => {
//       const plot = row.original;
//       return (
//         <div className="space-x-2 flex">
//           <Button size="sm" asChild>
//             <Link href={`/dashboard/plot/edit/${plot.id}`}>
//               <Edit className="w-4 h-4" />
//               Edit
//             </Link>
//           </Button>
//           <FormDelete id={plot.id} />
//         </div>
//       );
//     },
//   },
// ];
