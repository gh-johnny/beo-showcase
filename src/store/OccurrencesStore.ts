import { OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';
import { createStore, StoreApi } from 'zustand';

type OccurrencesStoreState = {
  occurrences: OccurrencesResponseDTO | undefined
}

type OccurrencesStoreActions = {
  setOccurrences: (payload: OccurrencesResponseDTO) => void
}

type OccurrencesStoreType = OccurrencesStoreState & OccurrencesStoreActions

class OccurrencesStore {
  private readonly store: StoreApi<OccurrencesStoreType>;

  constructor(initialOccurrences: OccurrencesResponseDTO | undefined = undefined) {
    this.store = createStore<OccurrencesStoreType>()((set) => ({
      occurrences: initialOccurrences,
      setOccurrences: (payload: OccurrencesResponseDTO) => this.setOccurrences(set, payload),
    }));
  }

  public getStore() {
    return this.store;
  }

  private setOccurrences(
    set: (fn: (state: OccurrencesStoreState) => Partial<OccurrencesStoreState>) => void,
    payload: OccurrencesResponseDTO
  ): void {
    set(() => ({ occurrences: payload }));
  }
}

export { type OccurrencesStoreType }

export default OccurrencesStore
