import Image from "next/image";
import Link from "next/link";
import { rupiahFormat } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { Tproduct } from "@/types";

interface CardProductProps {
  item: Tproduct;
}
export default function CardProduct({ item }: CardProductProps) {
  return (
    <Link key={`${item.name + item.id}`} href={`/detail-product/${item.id}`}>
      <div className="bg-white flex flex-col rounded-md ring-1 ring-[#E5E5E5]">
        <div className="w-full flex items-center justify-center overflow-hidden">
          <Image src={item.image_url} alt={item.name} loading="lazy" className="aspect-[1/1] h-fit w-fit object-cover rounded-t-md" width={300} height={400} />
        </div>
        <div className="p-2">
          <p className="font-medium text-sm truncate">{item.name}</p>
          <p className="font-bold text-base text-primary pb-1">{rupiahFormat(Number(item.price))}</p>
          <Button variant={"default"} className="w-full">
            <ShoppingBasket />
            Keranjang
          </Button>
        </div>
      </div>
    </Link>
  );
}
