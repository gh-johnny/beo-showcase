import { OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';
import { create } from 'zustand';

type OccurrencesStoreState = {
  occurrences: OccurrencesResponseDTO | undefined
}

type OccurrencesStoreActions = {
  setOccurrences: (payload: OccurrencesResponseDTO) => void
}

type OccurrencesStoreType = OccurrencesStoreState & OccurrencesStoreActions

class OccurrencesStore {
  private readonly store;

  constructor() {
    this.store = create<OccurrencesStoreType>()((set) => ({
      occurrences: undefined,
      setOccurrences: (value: OccurrencesResponseDTO) => this.setOccurrences(set, value),
    }));
  }

  public useStore() {
    return this.store((state) => state);
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
