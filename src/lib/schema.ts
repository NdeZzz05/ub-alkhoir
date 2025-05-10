import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const schemaLogIn = z.object({
  email: z.string({ required_error: "Email wajib diisi" }).email({ message: "Email wajib diisi" }),
  password: z.string({ required_error: "Kata Sandi wajib diisi" }).min(6, { message: "Kata sandi minimal 6 karakter" }),
});

export const schemaRegister = schemaLogIn.extend({
  name: z.string({ required_error: "Nama produk wajib diisi" }).min(4, { message: "Nama minimal 4 karakter" }),
  phone_number: z.string({ required_error: "Nomor whatsapp wajib diisi" }).min(10, { message: "Nomor tidak valid" }),
});

export const schemaCategory = z.object({
  name: z.string({ required_error: "Nama kategori wajib diisi" }).min(4, { message: "Minimal 4 Karakter" }),
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), { message: "File tidak valid" })
    .refine((file: File) => file?.name, { message: "Gambar wajib diisi" }),
});

export const schemaPromo = z.object({
  discount_percentage: z.number({ required_error: "Persentase diskon wajib diisi" }).min(1, { message: "Minimal diskon 1%" }).max(100, { message: "Maksimal diskon 100%" }),
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), { message: "File tidak valid" })
    .refine((file: File) => file?.name, { message: "Gambar wajib diisi" }),
  products: z.array(z.string(), { required_error: "Minimal pilih 1 produk untuk promo ini" }).min(1, { message: "Pilih minimal 1 produk" }),
});

export const schemaProduct = z.object({
  name: z.string({ required_error: "Nama produk wajib diisi" }).min(4, { message: "Nama minimal 4 karakter" }),
  description: z.string({ required_error: "Deskripsi wajib diisi" }).min(4, { message: "Deskripsi minimal 4 karakter" }),
  price: z.string({ required_error: "Harga wajib diisi" }),
  stock: z.string({ required_error: "Stok wajib diisi" }),
  category_id: z.string({ required_error: "Kategori wajib dipilih" }),
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), { message: "File tidak valid" })
    .refine((file: File) => file?.name, { message: "Gambar wajib diisi" }),
});

export const schemaProductEdit = z.object({
  name: z.string({ required_error: "Nama produk wajib diisi" }).min(4, { message: "Nama minimal 4 karakter" }),
  description: z.string({ required_error: "Deskripsi wajib diisi" }).min(4, { message: "Deskripsi minimal 4 karakter" }),
  price: z.string({ required_error: "Harga wajib diisi" }),
  stock: z.string({ required_error: "Stok wajib diisi" }),
  category_id: z.string({ required_error: "Kategori wajib dipilih" }),
});

export const OrderTypeEnum = z.enum(["pick_up", "delivery"]);
export const PaymentMethodEnum = z.enum(["cod", "transfer"]);

export const schemaOrderProduct = z.object({
  name: z.string({ required_error: "Nama pembeli wajib diisi" }).min(2, { message: "Nama minimal 2 karakter" }),
  phone: z.string({ required_error: "Nomor whatsapp wajib diisi" }).min(10, { message: "Nomor whatsapp tidak valid" }),
  address: z.string().optional(),
  notes: z.string().optional(),
  order_type: OrderTypeEnum,
  payment_method: PaymentMethodEnum,
});
