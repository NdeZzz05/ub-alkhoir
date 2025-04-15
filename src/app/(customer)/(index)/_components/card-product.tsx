import Image from "next/image";
import Link from "next/link";
import { rupiahFormat } from "@/lib/utils";
import ButtonAddCart from "./button-add-cart";
import { TProduct } from "@/types";
interface CardProductProps {
  item: TProduct;
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
          <div className="pb-1">
            {item.discount_percentage && item.discount_percentage > 0 ? (
              <div className="flex items-center gap-2">
                <div className="text-red-600 font-bold text-base">{rupiahFormat(item.price)}</div>
                <div className="line-through text-xs text-muted-foreground">{rupiahFormat(item.original_price!)}</div>
              </div>
            ) : (
              <div className="font-bold text-base text-primary">{rupiahFormat(item.price)}</div>
            )}
          </div>
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
            discount_percentage: item.discount_percentage,
            original_price: item.original_price,
            stock: item.stock,
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
