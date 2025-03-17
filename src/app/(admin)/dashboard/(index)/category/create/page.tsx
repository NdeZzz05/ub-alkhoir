import { Header } from "../../_components/header";
import FormCategory from "../_components/form-category";

export default function CreatePage() {
  return (
    <>
      <Header page={"Kategori"} />
      <FormCategory type="ADD" />
    </>
  );
}
