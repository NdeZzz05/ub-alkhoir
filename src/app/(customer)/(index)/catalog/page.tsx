import { SearchForm } from "../_components/search-form";
import { ListFilter } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FilterSort from "./_components/filter-sort";
import FilterCategory from "./_components/filter-category";
import ListProduct from "./_components/list-product";
import ResetFilter from "./_components/reset-filter";
import { ApplyFilterButton } from "./_components/apply-filter-button";

export default function CatalogPage() {
  return (
    <>
      <SearchForm />
      <section id="content">
        <div className="fixed bottom-20 z-20 left-1/2 -translate-x-1/2">
          <Dialog>
            <DialogTrigger className="flex justify-center items-center gap-2 border border-gray-500 p-2 bg-white rounded-full">
              <ListFilter className="size-4" />
              Filter
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
                <DialogDescription>Pilih filter sesuai keinginan mu.</DialogDescription>
                <hr className="border-gray-200" />
                <FilterSort />
                <hr className="border-gray-200" />
                <FilterCategory />
                <div className="flex justify-center items-center pt-2 gap-4">
                  <ResetFilter />
                  <ApplyFilterButton />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <ListProduct />
      </section>
    </>
  );
}
