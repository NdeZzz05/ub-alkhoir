import { getProducts } from "../lib/data";
import CardProduct from "./card-product";

export default async function ListProduct() {
  const products = await getProducts();
  return (
    <div id="products" className="flex flex-col p-2">
      <h2 className="font-bold text-base p-1">Produk</h2>
      <div className="grid grid-cols-2 gap-2 p-1 pb-16">
        {products.map((item) => (
          <CardProduct item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
