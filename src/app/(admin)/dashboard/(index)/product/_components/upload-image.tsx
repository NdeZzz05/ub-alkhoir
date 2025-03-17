import { Label } from "@/components/ui/label";
import { getImageUrl } from "@/lib/supabase";
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState, useEffect } from "react";

interface UploadImageProps {
  data?: string[];
}

export default function UploadImage({ data = [] }: UploadImageProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setImages(data.slice(0, 3).map((img) => getImageUrl(img, "product")));
    }
  }, [data]);

  const openFolder = () => {
    ref.current?.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type));

    const limitedFiles = validFiles.slice(0, 3);

    const newImages = limitedFiles.map((file) => URL.createObjectURL(file));

    setImages(newImages);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="image">Gambar Produk</Label>
      <div className="grid gap-2 border rounded-md p-2">
        <Image alt="Gambar Produk" className="aspect-square w-full rounded-md object-cover border" height={300} width={300} src={images[0] || "/placeholder.svg"} />
        <div className="grid grid-cols-3 gap-2">
          {images.slice(1, 3).map((src, index) => (
            <Image key={index} alt={`Gambar Produk ${index + 1}`} className="aspect-square w-full rounded-md border object-cover" height={84} width={84} src={src || "/placeholder.svg"} />
          ))}
          <button type="button" onClick={openFolder} className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Upload</span>
          </button>
          <input ref={ref} onChange={onChange} type="file" name="image" className="hidden" accept="image/png, image/jpeg, image/jpg" multiple />
        </div>
      </div>
    </div>
  );
}
