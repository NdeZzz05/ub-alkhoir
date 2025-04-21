"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);
import { EmailNotification } from "../../_components/email-notification";

interface sendEmailNotificationProps {
  name: string;
  phone: string;
  orderCode: string;
  total: number;
  paymentMethod: string;
  orderType: string;
  orderDate: Date;
}

export const sendEmailNotification = async ({ name, phone, orderCode, total, paymentMethod, orderType, orderDate }: sendEmailNotificationProps) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: `${process.env.NEXT_PUBLIC_RESEND_EMAIL}`,
      subject: "Pesanan Baru Diterima!",
      react: EmailNotification({ name, phone, orderCode, total, paymentMethod, orderType, orderDate }) as React.ReactElement,
    });
  } catch (err) {
    console.error("Gagal kirim email notifikasi:", err);
  }
};
