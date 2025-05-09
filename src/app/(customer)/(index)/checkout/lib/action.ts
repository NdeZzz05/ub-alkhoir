"use server";

import { ActionResult, TCart } from "@/types";
import prisma from "../../../../../../lib/prisma";
import { getUser } from "@/lib/auth";
import { schemaOrderProduct } from "@/lib/schema";
import { generateRandomString } from "@/lib/utils";
// import { PaymentRequestParameters, PaymentRequest } from "xendit-node/payment_request/models";
// import xenditClient from "@/lib/xendit";
import { Prisma } from "@prisma/client";
import { sendEmailNotification } from "./resend";
import snap from "./init-midtrans";

export async function storeOrder(_: unknown, formData: FormData, total: number, products: TCart[]): Promise<ActionResult> {
  const { session, user } = await getUser();
  if (!session) {
    return {
      error: "Harus login untuk memesan",
    };
  }

  const parse = schemaOrderProduct.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    plot_id: formData.get("plot_id"),
    address: formData.get("address") ?? "",
    notes: formData.get("notes"),
    order_type: formData.get("order_type"),
    payment_method: formData.get("payment_method"),
  });

  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  try {
    const order = await prisma.order.create({
      data: {
        total: total,
        status_order: "processed",
        status_payment: "pending",
        user_id: user.id,
        code: generateRandomString(10),
      },
    });

    const queryCreateProductOrder: Prisma.OrderProductCreateManyInput[] = products.map((product) => ({
      order_id: order.id,
      product_id: product.id,
      quantity: product.quantity,
      subtotal: product.price,
    }));

    await prisma.$transaction([
      prisma.orderProduct.createMany({ data: queryCreateProductOrder }),

      prisma.orderDetail.create({
        data: {
          name: parse.data.name,
          phone: parse.data.phone,
          plot_id: parse.data.plot_id,
          address: parse.data.address,
          notes: parse.data.notes,
          order_type: parse.data.order_type,
          payment_method: parse.data.payment_method,
          order_id: order.id,
        },
      }),

      ...products.map((product) =>
        prisma.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        })
      ),
    ]);

    sendEmailNotification({ name: parse.data.name, orderCode: order.code, orderType: parse.data.order_type, paymentMethod: parse.data.payment_method, phone: parse.data.phone, total: Number(order.total), orderDate: order.created_at });

    if (parse.data.payment_method === "cod") {
      return {
        success: "Terima kasih! Kami sudah menerima pesanan kamu. Mohon ditunggu, ya.",
        redirectURL: `/order`,
        error: "",
      };
    }

    const parameter = {
      transaction_details: {
        order_id: order.code,
        gross_amount: total,
      },
      customer_details: {
        first_name: parse.data.name,
        phone: parse.data.phone,
      },
      callbacks: {
        finish: process.env.NEXT_PUBLIC_REDIRECT_URL,
      },
    };

    const midtransResponse = await snap.createTransaction(parameter);

    await prisma.order.update({
      where: { id: order.id },
      data: {
        token_payment: midtransResponse.token,
      },
    });

    return {
      success: "Terima kasih! Kami sudah menerima pesanan kamu. Mohon lanjut ke pembayaran.",
      redirectURL: midtransResponse.redirect_url,
      error: "",
    };

    // const data: PaymentRequestParameters = {
    //   amount: total,
    //   paymentMethod: {
    //     ewallet: {
    //       channelProperties: {
    //         successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
    //       },
    //       channelCode: "SHOPEEPAY",
    //     },
    //     reusability: "ONE_TIME_USE",
    //     type: "EWALLET",
    //   },
    //   currency: "IDR",
    //   referenceId: order.code,
    // };

    // const response: PaymentRequest = await xenditClient.PaymentRequest.createPaymentRequest({ data });

    // const redirectPaymentURL = response.actions?.find((val) => val.urlType === "DEEPLINK")?.url ?? "/";
    // const token = new URL(redirectPaymentURL).searchParams.get("token");

    // await prisma.order.update({
    //   where: { id: order.id },
    //   data: {
    //     token_payment: token ?? null,
    //   },
    // });

    // return {
    //   success: "Terima kasih! Kami sudah menerima pesanan kamu. Mohon ditunggu, ya.",
    //   redirectURL: redirectPaymentURL,
    //   error: "",
    // };
  } catch (error) {
    console.error(error);
    return {
      error: "Gagal melakukan pemesanan.",
    };
  }
}
