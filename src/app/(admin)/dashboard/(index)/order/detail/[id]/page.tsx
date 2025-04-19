import { Header } from "../../../_components/header";
import { TEdit } from "@/types";
import { getOrderById } from "../../lib/data";
import OrderActionButton from "../../_components/order-action-button";
import { MdWhatsapp } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { rupiahFormat } from "@/lib/utils";

export default async function DetailPage({ params }: TEdit) {
  const { id } = await Promise.resolve(params);
  const order = await getOrderById(id);

  const phone = order?.user.phone_number.replace(/^0/, "62");

  return (
    <>
      <Header page={"Pesanan"} />
      <div className="w-full flex flex-col gap-2 justify-center items-center p-4">
        {/*  */}
        <div className="border w-full xl:w-1/2 p-4 rounded-md shadow-md">
          <div className="flex items-center gap-2 justify-between">
            <p className="text-sm font-thin text-gray-500">YANG DAPAT DILAKUKAN SELANJUTNYA</p>
            <OrderActionButton id={order?.id} page="detail" status_order={order?.status_order} status_payment={order?.status_payment} payment_method={order?.order_detail?.payment_method} type_order={order?.order_detail?.order_type} />
          </div>
        </div>
        {/*  */}
        <div className="border w-full xl:w-1/2 p-4 rounded-md shadow-md flex flex-col gap-1">
          <p className="font-semibold">Akun Pemesan</p>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                {order?.user.name}/{order?.order_detail?.name}
              </p>
              <p className="text-gray-500">{order?.user.email}</p>
            </div>
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:underline">
              <MdWhatsapp className="text-green-500 text-4xl" />
            </a>
          </div>
        </div>
        {/*  */}
        <div className="border w-full xl:w-1/2 p-4 rounded-md shadow-md flex flex-col gap-2">
          <div className="space-y-1">
            <p className="font-semibold">Tipe Orderan</p>
            <div className="text-sm text-gray-500 space-x-1">
              <Badge>{order?.order_detail?.order_type}</Badge>
              <Badge className="bg-orange-500">{order?.order_detail?.payment_method}</Badge>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Alamat Pengiriman</p>
            <div className="text-sm text-gray-500">
              <p>{order?.order_detail?.plot.name}</p>
              <p> {order?.order_detail?.address}</p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="border w-full xl:w-1/2 p-4 rounded-md shadow-md flex flex-col gap-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead className="text-right">Harga</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.order_product?.map((item) => {
                const { product, quantity, subtotal } = item;
                const TotalPrice = Number(subtotal) * quantity;

                return (
                  <TableRow key={item.id}>
                    <TableCell className="inline-flex items-center gap-3">
                      <Image src={getImageUrl(product.image, "product")} alt={product.name} width={50} height={50} />
                      <span>{product.name}</span>
                    </TableCell>
                    <TableCell className="text-right">{rupiahFormat(Number(subtotal))}</TableCell>
                    <TableCell className="text-right">{quantity}</TableCell>
                    <TableCell className="text-right">{rupiahFormat(Number(TotalPrice))}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{rupiahFormat(Number(order?.total || 0))}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          {order?.order_detail?.notes && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="font-semibold text-sm">Catatan:</p>
              <p className="text-sm text-gray-500">{order?.order_detail?.notes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
