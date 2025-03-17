import { Tedit } from "@/types";
import { Header } from "../../../_components/header";
import { redirect } from "next/navigation";
import { getCategoryById } from "../../lib/data";
import FormCategory from "../../_components/form-category";

export default async function EditPage({ params }: Tedit) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    return redirect("/dashboard/category");
  }
  return (
    <>
      <Header page={"Kategori"} />
      <FormCategory type="EDIT" data={category} />
    </>
  );
}
