import Image from "next/image";
import Link from "next/link";
import { getCategories } from "../lib/data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
export default async function ListCategory() {
  const categories = await getCategories();
  return (
    <div id="categories" className="max-w-sm">
      <h2 className="font-bold text-base p-1">Kategori Produk</h2>
      <ScrollArea>
        <div className="flex gap-4 p-1">
          {categories.map((item) => (
            <Link key={`${item.name + item.id}`} href={`/catalog?category=${item.id}`} className="categories-card">
              <div className="bg-white flex flex-col items-center space-y-2 rounded-md ring-1 ring-[#E5E5E5] w-20">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image src={item.image_url} alt={`kategori + ${item.name}`} loading="lazy" className="aspect-[1/1] h-fit w-fit object-cover" width={300} height={400} />
                </div>
                <p className="font-medium text-xs">{truncateText(item.name, 8)}</p>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
