import { getUser } from "@/lib/auth";
import { CardsInfo } from "./_components/cards-info";
import { ChartInfoInteractive } from "./_components/chart-info-interactive";
import { Header } from "./_components/header";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session, user } = await getUser();

  if (!session || user.role !== "admin") {
    return redirect("/login");
  }
  return (
    <>
      <Header page={null} />
      <section className="flex flex-1 flex-col gap-4 p-4">
        <CardsInfo />
        <div className="px-4 lg:px-6">
          <ChartInfoInteractive />
        </div>
      </section>
    </>
  );
}
