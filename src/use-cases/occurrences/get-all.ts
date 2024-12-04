import OccurrencesService from '@/services/OccurrencesService';
import { OccurrencesRequestDTO, OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';

class GetAllOccurrencesUseCase {
  private ocorrenciasService: OccurrencesService;

  constructor(ocorrenciasService: OccurrencesService) {
    this.ocorrenciasService = ocorrenciasService;
  }

  public async execute(payload: OccurrencesRequestDTO): Promise<OccurrencesResponseDTO> {
    const response = await this.ocorrenciasService.getAll(payload);
    return response;
  }
}

export default GetAllOccurrencesUseCase;
