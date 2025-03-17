import Dashboard from "./components/dashboard";
import { Header } from "@/components/header";

export default async function Home() {
  return (
    <main className="mx-auto w-full px-8 pb-10 pt-4">
      <Header />
      <Dashboard />
    </main>
  );
}
