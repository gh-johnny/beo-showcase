import { House } from "lucide-react";
import Dashboard from "./components/dashboard";
import { Header } from "@/components/header";

export default async function Home() {
  return (
    <main className="mx-auto w-full px-8 pb-10 pt-4">
      <Header Icon={House} title={`Prefeitura de Santa Bárbara d'Oeste`} imgUrl="/brasao_sbo.png" />
      <Dashboard />
    </main>
  );
}
