import OccurrencesService from '@/services/OccurrencesService';
import { OccurrencesRequestDTO, OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';
import { AxiosError } from 'axios';
import featureFlags from '@/config/FeatureFlag';
import { MOCK_OCCURRENCES_RESPONSE } from '@/mocks/occurrences';
import Logger from '@/utils/Logger';

class GetAllOccurrencesUseCase {
  constructor(private readonly occurrencesService: OccurrencesService) { }

  public async execute(payload: OccurrencesRequestDTO): Promise<OccurrencesResponseDTO> {
    try {
      return await this.occurrencesService.getAll(payload);
    } catch (err) {
      return this.handleError(err);
    }
  }

  private handleError(err: unknown): OccurrencesResponseDTO {
    const error = err as AxiosError;

    if (error.code === "ECONNABORTED") {
      Logger.warn('Timeout occurred. Checking feature flag for mock data...');
      if (featureFlags.isEnabled('enableReturnMockDataIfTimedOut')) {
        Logger.warn('Returning mock data for occurrences.');
        return MOCK_OCCURRENCES_RESPONSE;
      }
    }

    if (error.response) {
      Logger.error(
        `API Error: ${error.response.status} - ${error.response.data || 'No message provided'}`
      );
    } else if (error.request) {
      Logger.error('Request Error: No response received.');
    } else {
      Logger.error('Unexpected error occurred:', err);
    }

    throw new Error('Could not retrieve occurrences.');
  }
}

export default GetAllOccurrencesUseCase;
