import { Header } from "../../../_components/header";
import { redirect } from "next/navigation";
import { TEdit } from "@/types";
import { getPromoById } from "../../lib/data";
import FormPromo from "../../_components/form-promo";

export default async function EditPage({ params }: TEdit) {
  const { id } = await Promise.resolve(params);
  const promo = await getPromoById(id);

  if (!promo) {
    return redirect("/dashboard/promo");
  }
  return (
    <>
      <Header page={"Promo"} />
      <FormPromo type="EDIT" data={promo} />
    </>
  );
}
