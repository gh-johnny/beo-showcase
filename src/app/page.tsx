import OccurrencesProvider from "@/context/OccurrencesContext";
import { MOCK_OCCURRENCES_RESPONSE } from "@/mocks/occurrences";

export default async function Home() {
  return (
    <OccurrencesProvider initialOccurrences={MOCK_OCCURRENCES_RESPONSE}>
      <div className="w-full h-dvh">
      </div>
    </OccurrencesProvider>
  );
}
