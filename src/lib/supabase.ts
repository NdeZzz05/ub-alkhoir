import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (name: string, path: "category" | "product" = "category") => {
  const { data } = supabase.storage.from("ub-alkhoir").getPublicUrl(`public/${path}/${name}`);

  return data.publicUrl;
};

export const uploadFile = async (file: File, path: "category" | "product" = "category") => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;
  await supabase.storage.from("ub-alkhoir").upload(`public/${path}/${fileName}`, file, {
    cacheControl: "3600",
    upsert: false,
  });

  return fileName;
};

export const deleteFile = async (filename: string, path: "category" | "product" = "category") => {
  await supabase.storage.from("ub-alkhoir").remove([`public/${path}/${filename}`]);
};
