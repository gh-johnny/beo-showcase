"use client"
import { OccurrencesResponseDTO } from "@/dto/OccurrencesDTO";
import OccurrencesStore, { OccurrencesStoreType } from "@/store/OccurrencesStore";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { StoreApi, useStore } from "zustand";

type OccurrencesProviderProps = PropsWithChildren & {
  initialOccurrences: OccurrencesResponseDTO | undefined,
}

const OccurrencesContext = createContext<StoreApi<OccurrencesStoreType> | undefined>(undefined);

function OccurrencesProvider({ initialOccurrences, children }: OccurrencesProviderProps) {
  const [store] = useState(() => new OccurrencesStore(initialOccurrences).getStore())

  return <OccurrencesContext.Provider value={store}>{children}</OccurrencesContext.Provider>;
}

function useOccurrencesStore(): OccurrencesStoreType; // Overload for full state
function useOccurrencesStore<T>(
  selector: (state: OccurrencesStoreType) => T
): T;
function useOccurrencesStore<T = OccurrencesStoreType>(
  selector?: (state: OccurrencesStoreType) => T
): T {
  const context = useContext(OccurrencesContext);

  if (!context) {
    throw new Error("OccurrencesContext.Provider is missing");
  }

  return useStore(context, selector || ((state) => state as T));
}

export { useOccurrencesStore }

export default OccurrencesProvider
