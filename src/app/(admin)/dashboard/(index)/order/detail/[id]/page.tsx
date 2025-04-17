import { Header } from "../../../_components/header";
import { TEdit } from "@/types";
// import { getOrderById } from "../../lib/data";

export default async function DetailPage({ params }: TEdit) {
  const { id } = await Promise.resolve(params);
  // const order = await getOrderById(id);

  return (
    <>
      <Header page={"Pesanan"} />
      <p>Detail Order {id}</p>
    </>
  );
}
