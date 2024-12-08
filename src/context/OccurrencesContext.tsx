"use client"
import { OccurrencesResponseDTO } from "@/dto/OccurrencesDTO";
import { OccurrencesStoreType } from "@/store/OccurrencesStore";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

type OccurrencesProviderProps = PropsWithChildren & {
  initialOccurrences: OccurrencesResponseDTO | undefined,
}

const OccurrencesContext = createContext<StoreApi<OccurrencesStoreType> | undefined>(undefined);

function OccurrencesProvider({ initialOccurrences, children }: OccurrencesProviderProps) {
  const [store] = useState(() => createStore<OccurrencesStoreType>((set) => ({
    occurrences: initialOccurrences,
    setOccurrences: (payload: OccurrencesResponseDTO) => set(() => ({ occurrences: payload }))
  })))

  return <OccurrencesContext.Provider value={store}>{children}</OccurrencesContext.Provider>;
}

function useOccurrencesStore<T>(selector: (state: OccurrencesStoreType) => T) {
  const context = useContext(OccurrencesContext);

  if (!context) {
    throw new Error("OccurrencesContext.Provider is missing")
  }

  return useStore(context, selector)
}

export { useOccurrencesStore }

export default OccurrencesProvider
