import { Label } from "@/components/ui/label";
import { Header } from "../../_components/header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategory } from "../../category/lib/data";
import FormProduct from "../_components/form-product";
export default async function CreatePage() {
  const category = await getCategory();

  return (
    <>
      <Header page={"Produk"} />
      <FormProduct type="ADD">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="category">Kategori</Label>
          <Select name="category_id">
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
