import { ToastProvider } from "@/components/common/Toast.Provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
