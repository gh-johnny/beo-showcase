import OccurrencesService from '@/services/OccurrencesService';
import { OccurrencesRequestDTO, OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';
import { AxiosError } from 'axios';
import featureFlags from '@/config/FeatureFlag';
import { MOCK_OCCURRENCES_RESPONSE } from '@/mocks/occurrences';

class GetAllOccurrencesUseCase {
  private ocorrenciasService: OccurrencesService;

  constructor(ocorrenciasService: OccurrencesService) {
    this.ocorrenciasService = ocorrenciasService;
  }

  public async execute(payload: OccurrencesRequestDTO): Promise<OccurrencesResponseDTO | undefined> {
    try {
      return await this.ocorrenciasService.getAll(payload);
    }
    catch (err) {
      const error = err as AxiosError
      if (error.code !== "ECONNABORTED") {
        console.error('Error unknown: Could not execute occurrences use case: ', err)
        return undefined
      }
      if (featureFlags.isEnabled('enableReturnMockDataIfTimedOut')) {
        console.warn('Warning: occurrences use case errored...')
        console.warn('Warning: Mock data is being passed through instead')
        return MOCK_OCCURRENCES_RESPONSE
      }
    }
    console.error('Error: occurrences use case errored...')
    return undefined
  }
}


export default GetAllOccurrencesUseCase;
