import { getCategory } from "@/app/(admin)/dashboard/(index)/category/lib/data";
import { DialogTitle } from "@/components/ui/dialog";
import FilterCheckboxItem from "./filter-checkbox-item";

export default async function FilterCategory() {
  const categories = await getCategory();
  return (
    <>
      <DialogTitle className="text-sm">Kategori</DialogTitle>

      {categories.map((item) => (
        <FilterCheckboxItem id={item.id} value={item.name} key={item.id} />
      ))}
    </>
  );
}
