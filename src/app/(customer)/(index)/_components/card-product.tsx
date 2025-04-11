import Image from "next/image";
import Link from "next/link";
import { rupiahFormat } from "@/lib/utils";
import { Tproduct } from "@/types";
import ButtonAddCart from "./button-add-cart";
interface CardProductProps {
  item: Tproduct;
}
export default function CardProduct({ item }: CardProductProps) {
  return (
    <div className="bg-white flex flex-col rounded-md ring-1 ring-[#E5E5E5]">
      <Link href={`/detail-product/${item.id}`}>
        <div className="w-full flex items-center justify-center overflow-hidden">
          <Image src={item.image_url} alt={item.name} loading="lazy" className="aspect-[1/1] h-fit w-fit object-cover rounded-t-md" width={400} height={400} />
        </div>
        <div className="p-2">
          <p className="font-medium text-sm truncate">{item.name}</p>
          <p className="font-bold text-base text-primary pb-1">{rupiahFormat(Number(item.price))}</p>
        </div>
      </Link>

      <div className="px-2 pb-2">
        <ButtonAddCart
          item={{
            id: item.id,
            name: item.name,
            price: item.price,
            image_url: item.image_url,
            category: item.category,
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
