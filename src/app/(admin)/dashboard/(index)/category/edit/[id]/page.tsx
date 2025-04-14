import { Header } from "../../../_components/header";
import { redirect } from "next/navigation";
import { getCategoryById } from "../../lib/data";
import FormCategory from "../../_components/form-category";
import { TEdit } from "@/types";

export default async function EditPage({ params }: TEdit) {
  const { id } = await Promise.resolve(params);
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
