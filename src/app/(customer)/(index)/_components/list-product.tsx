import Image from "next/image";
import Link from "next/link";
import { getProducts } from "../lib/data";
import { rupiahFormat } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";

export default async function ListProduct() {
  const products = await getProducts();
  return (
    <div id="products" className="flex flex-col p-2">
      <h2 className="font-bold text-base p-1">Produk</h2>
      <div className="grid grid-cols-2 gap-2 p-1">
        {products.map((item) => (
          <Link key={`${item.name + item.id}`} href="#" className="categories-card">
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
        ))}
      </div>
    </div>
  );
}
