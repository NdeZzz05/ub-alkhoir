"use client";

import * as React from "react";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { getDownloadReport } from "../lib/data";
import { pushAlert } from "@/lib/client";
import { dateFormat } from "@/lib/utils";

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
  "Kode Pesanan": string;
  Total: string;
  "Status Pesanan": string;
  "Status Pembayaran": string;
  "Token Pembayaran": string;
  "Nama Pemesan": string;
  "Nomor WA Pemesan": string;
  "Alamat Pemesanan": string;
  "Metode Pembayaran": string;
  "Tipe Pesanan": string;
  "Nama Produk": string;
  Quantity: number;
  "Harga Perproduk": string;
  Subtotal: number;
  "Tanggal Pesanan": string;
};

type DownloadReportProps = {
  date: DateRange | undefined;
};

export default function DownloadReport({ date }: DownloadReportProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownloadExcel = async () => {
    if (!date?.from || !date?.to) return;
    setIsLoading(true);

    try {
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
          const subtotalPerItem = Number(product.subtotal);
          const totalSubtotal = product.quantity * subtotalPerItem;

          excelData.push({
            "Kode Pesanan": item.order.code,
            Total: item.order.total.toString(),
            "Status Pesanan": item.order.status_order,
            "Status Pembayaran": item.order.status_payment,
            "Token Pembayaran": item.order.token_payment || "N/A",
            "Nama Pemesan": item.orderDetail?.name || "N/A",
            "Nomor WA Pemesan": item.orderDetail?.phone || "N/A",
            "Alamat Pemesanan": item.orderDetail?.address || "N/A",
            "Metode Pembayaran": item.orderDetail?.payment_method || "N/A",
            "Tipe Pesanan": item.orderDetail?.order_type || "N/A",
            "Nama Produk": product.product_name,
            Quantity: product.quantity,
            "Harga Perproduk": product.subtotal.toString(),
            Subtotal: totalSubtotal,
            "Tanggal Pesanan": dateFormat(item.order.created_at),
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
    } catch (error) {
      pushAlert("Gagal mengunduh laporan", "danger");
      console.error("Gagal mengunduh laporan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleDownloadExcel} disabled={!date?.from || !date?.to}>
      {isLoading ? (
        <>
          <span className="animate-spin">⏳</span>
          Mengunduh...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Unduh Laporan Penjualan
        </>
      )}
    </Button>
  );
}
