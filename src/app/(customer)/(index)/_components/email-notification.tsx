import * as React from "react";

interface EmailNotificationProps {
  name: string;
  phone: string;
  orderCode: string;
  total: number;
  paymentMethod: string;
  orderType: string;
  orderDate: Date;
}

export const EmailNotification: React.FC<Readonly<EmailNotificationProps>> = ({ name, phone, orderCode, total, paymentMethod, orderType, orderDate }) => {
  const formattedDate = new Date(orderDate).toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>📦 Pesanan Baru Diterima!</h2>
      <p>Hai Admin,</p>
      <p>Berikut adalah detail pesanan yang baru saja dilakukan oleh pengguna:</p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold", padding: "8px" }}>Kode Pesanan</td>
            <td style={{ padding: "8px" }}>{orderCode}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "8px" }}>Tanggal Pemesanan</td>
            <td style={{ padding: "8px" }}>{formattedDate}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "8px" }}>Nama Pemesan</td>
            <td style={{ padding: "8px" }}>{name}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "8px" }}>No. Telepon</td>
            <td style={{ padding: "8px" }}>{phone}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "8px" }}>Tipe Pesanan</td>
            <td style={{ padding: "8px" }}>{orderType === "delivery" ? "Kirim Pesanan" : "Ambil Ditoko"}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "8px" }}>Metode Pembayaran</td>
            <td style={{ padding: "8px" }}>{paymentMethod.toUpperCase()}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", padding: "8px" }}>Total</td>
            <td style={{ padding: "8px" }}>Rp {total.toLocaleString("id-ID")}</td>
          </tr>
        </tbody>
      </table>

      <p>Segera proses pesanan ini melalui sistem admin panel.</p>
      <p>Terima kasih 🙏</p>
    </div>
  );
};

export default EmailNotification;
