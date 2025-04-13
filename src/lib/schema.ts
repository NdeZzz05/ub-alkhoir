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

export const schemaPlot = z.object({
  name: z.string({ required_error: "Nama kavling beserta blok wajib diisi" }).min(4, { message: "Minimal 4 Karakter" }),
});

// export const schemaProduct = z.object({
//   name: z.string({ required_error: "Nama produk wajib diisi" }).min(4, { message: "Minimal 4 Karakter" }),
//   description: z.string({ required_error: "Deskripsi wajib diisi" }).min(4, { message: "Minimal 4 Karakter" }),
//   price: z.string({ required_error: "Harga wajib diisi" }),
//   stock: z.string({ required_error: "Stok wajib diisi" }),
//   category_id: z.string({ required_error: "Kategori wajib dipilih" }),
//   image: z
//     .any()
//     .refine((files) => Array.isArray(files) && files.length >= 3, {
//       message: "Minimal 3 gambar wajib diupload",
//     })
//     .refine(
//       (files) => {
//         if (!Array.isArray(files)) return false; // Cegah error jika undefined
//         return files.every((file) => ALLOW_MIME_TYPES.includes(file.type)); // Cek semua file valid
//       },
//       {
//         message: "File gambar harus berformat PNG, JPEG, atau JPG",
//       }
//     ),
// });

export const schemaProduct = z.object({
  name: z.string({ required_error: "Nama produk wajib diisi" }).min(4, { message: "Nama minimal 4 karakter" }),
  description: z.string({ required_error: "Deskripsi wajib diisi" }).min(4, { message: "Deskripsi minimal 4 karakter" }),
  price: z.string({ required_error: "Harga wajib diisi" }),
  stock: z.string({ required_error: "Stok wajib diisi" }),
  category_id: z.string({ required_error: "Kategori wajib dipilih" }),
  image: z
    .any()
    .refine((file: File) => file instanceof File, {
      message: "Gambar wajib diupload",
    })
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File gambar harus berformat PNG, JPEG, atau JPG",
    }),
});

export const schemaProductEdit = schemaProduct
  .extend({
    id: z.string({ required_error: "ID Produk wajib diperlukan" }),
  })
  .omit({ image: true });
