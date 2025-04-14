import { TEdit } from "@/types";
import { Header } from "../../../_components/header";
import { redirect } from "next/navigation";
import { getPlotById } from "../../lib/data";
import FormPlot from "../../_components/form-plot";

export default async function EditPage({ params }: TEdit) {
  const { id } = await Promise.resolve(params);
  const plot = await getPlotById(id);

  if (!plot) {
    return redirect("/dashboard/plot");
  }
  return (
    <>
      <Header page={"Kategori"} />
      <FormPlot type="EDIT" data={plot} />
    </>
  );
}
