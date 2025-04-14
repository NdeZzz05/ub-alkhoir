import { Header } from "../../_components/header";
import FormPromo from "../_components/form-promo";
import { getProductPromo } from "../lib/data";

export default async function CreatePage() {
  const products = await getProductPromo();

  return (
    <>
      <Header page={"Promo"} />
      <FormPromo type="ADD" products={products} />
    </>
  );
}
