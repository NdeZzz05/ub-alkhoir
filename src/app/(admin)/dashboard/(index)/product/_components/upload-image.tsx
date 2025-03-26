import { Label } from "@/components/ui/label";
import { getImageUrl } from "@/lib/supabase";
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState, useEffect } from "react";

interface UploadImageProps {
  data?: string;
}

export default function UploadImage({ data = "" }: UploadImageProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (data) {
      setImage(getImageUrl(data, "product"));
    }
  }, [data]);

  const openFolder = () => {
    ref.current?.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    if (["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="image">Gambar Produk</Label>
      <div className="grid gap-2 border rounded-md p-2">
        <Image alt="Gambar Produk" onClick={openFolder} className="aspect-square w-full rounded-md object-cover border" height={300} width={300} src={image || "/placeholder.svg"} />

        <button type="button" onClick={openFolder} className="flex gap-1 w-full p-4 items-center justify-center rounded-md border border-dashed">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs">Pilih Gambar</span>
        </button>

        <input ref={ref} onChange={onChange} type="file" name="image" className="hidden" accept="image/png, image/jpeg, image/jpg" />
      </div>
    </div>
  );
}
