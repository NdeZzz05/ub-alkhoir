import { Tedit } from "@/types";
import { Header } from "../../../_components/header";
import { redirect } from "next/navigation";
import FormProduct from "../../_components/form-product";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategory } from "../../../category/lib/data";
import { getProductById } from "../../lib/data";

export default async function EditPage({ params }: Tedit) {
  const { id } = await Promise.resolve(params);
  const productById = await getProductById(id);
  const category = await getCategory();

  if (!productById) {
    return redirect("/dashboard/category");
  }
  return (
    <>
      <Header page={"Produk"} />
      <FormProduct type="EDIT" data={productById}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="category">Kategori</Label>
          <Select name="category_id" defaultValue={productById.category_id}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {category?.map((item) => (
                <SelectItem key={item.id} value={`${item.id}`}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FormProduct>
    </>
  );
}
