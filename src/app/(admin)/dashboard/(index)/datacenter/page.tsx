import { Header } from "../_components/header";
import * as React from "react";
import FilterDate from "./_components/all-filter";

export default async function DataCenterPage() {
  return (
    <>
      <Header page={"Laporan Penjualan"} />
      <div className="flex flex-1 flex-col gap-4 pt-4 px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Laporan Penjualan</h1>
        </div>
      </div>
      <section className="flex flex-1 flex-col gap-4 pb-8 ">
        <FilterDate />
      </section>
    </>
  );
}
