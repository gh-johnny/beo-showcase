import { Header } from "@/components/header";
import Dashboard from "./components/dashboard";
import { TriangleAlert } from "lucide-react";

export default function CategoriasPage() {
  return (
    <main className="mx-auto w-full px-8 pb-10 pt-4">
      <Header title="Defesa civil" Icon={TriangleAlert} imgUrl={undefined} />
      <Dashboard />
    </main>
  )
}
