"use client";

import * as React from "react";
import { format, subDays } from "date-fns";
import { CalendarIcon, Download } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import * as XLSX from "xlsx";
import { getDownloadReport } from "../lib/data";

export type ReportData = {
  order: {
    id: string;
    code: string;
    status_order: "processed" | "shipped" | "completed" | "canceled";
    status_payment: "pending" | "paid" | "failed";
    token_payment: string | null;
    total: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  orderDetail: {
    id: string;
    name: string;
    phone: string;
    address: string | null;
    notes: string | null;
    order_type: "pick_up" | "delivery";
    payment_method: "cod" | "transfer";
    plot_id: string;
    created_at: string;
    updated_at: string;
  } | null;
  orderProducts: {
    id: string;
    subtotal: string;
    quantity: number;
    product_id: string;
    created_at: string;
    updated_at: string;
    product_name: string;
  }[];
}[];

export type ExcelRow = {
  "Id Pesanan": string;
  "Kode Pesanan": string;
  Total: string;
  "Status Pesanan": string;
  "Status Pembayaran": string;
  "Token Pembayaran": string;
  "Id User": string;
  "Nama Pemesan": string;
  "Nomor WA Pemesan": string;
  "Alamat Pemesanan": string;
  "Metode Pembayaran": string;
  "Tipe Pesanan": string;
  "Id Produk": string;
  "Nama Produk": string;
  Quantity: number;
  Subtotal: string;
  "Tanggal Pesanan": string;
};

export default function DownloadReport({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const handleDownloadExcel = async () => {
    if (!date?.from || !date?.to) return;

    const rawData = await getDownloadReport(date.from, date.to);

    const data: ReportData = rawData.map((order) => ({
      order: {
        id: order.order.id,
        code: order.order.code,
        status_order: order.order.status_order,
        status_payment: order.order.status_payment,
        token_payment: order.order.token_payment,
        total: order.order.total,
        user_id: order.order.user_id,
        created_at: order.order.created_at,
        updated_at: order.order.updated_at,
      },
      orderDetail: order.orderDetail
        ? {
            id: order.orderDetail.id,
            name: order.orderDetail.name,
            phone: order.orderDetail.phone,
            address: order.orderDetail.address,
            notes: order.orderDetail.notes,
            order_type: order.orderDetail.order_type,
            payment_method: order.orderDetail.payment_method,
            plot_id: order.orderDetail.plot_id,
            created_at: order.orderDetail.created_at,
            updated_at: order.orderDetail.updated_at,
          }
        : null,
      orderProducts: order.orderProducts.map((product) => ({
        id: product.id,
        subtotal: product.subtotal,
        quantity: product.quantity,
        product_id: product.product_id,
        created_at: product.created_at,
        updated_at: product.updated_at,
        product_name: product.product_name,
      })),
    }));

    const excelData: ExcelRow[] = [];
    data.forEach((item) => {
      if (!item?.order || !item?.orderProducts) return;

      item.orderProducts.forEach((product) => {
        excelData.push({
          "Id Pesanan": item.order.id,
          "Kode Pesanan": item.order.code,
          Total: item.order.total.toString(),
          "Status Pesanan": item.order.status_order,
          "Status Pembayaran": item.order.status_payment,
          "Token Pembayaran": item.order.token_payment || "N/A",
          "Id User": item.order.user_id,
          "Nama Pemesan": item.orderDetail?.name || "N/A",
          "Nomor WA Pemesan": item.orderDetail?.phone || "N/A",
          "Alamat Pemesanan": item.orderDetail?.address || "N/A",
          "Metode Pembayaran": item.orderDetail?.payment_method || "N/A",
          "Tipe Pesanan": item.orderDetail?.order_type || "N/A",
          "Id Produk": product.product_id,
          "Nama Produk": product.product_name,
          Quantity: product.quantity,
          Subtotal: product.subtotal.toString(),
          "Tanggal Pesanan": item.order.created_at,
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();

    const fromStr = format(date.from, "dd-MM-yyyy");
    const toStr = format(date.to, "dd-MM-yyyy");
    const fileName = `laporan-penjualan-${fromStr}_to_${toStr}.xlsx`;

    XLSX.utils.book_append_sheet(wb, ws, "Laporan Penjualan");
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="flex gap-2 mx-6 justify-end">
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button id="date" variant="outline" className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pilih Tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} fromDate={new Date(2025, 3, 1)} toDate={new Date()} />
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={handleDownloadExcel} disabled={!date?.from || !date?.to}>
        <Download className="w-4 h-4" />
        Unduh Laporan Penjualan
      </Button>
    </div>
  );
}
