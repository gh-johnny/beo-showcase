import OcorrenciasService from '@/services/OccurrencesService';
import { OccurrencesRequestDTO, OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';

class ObterPorFiltroUseCase {
  private ocorrenciasService: OcorrenciasService;

  constructor(ocorrenciasService: OcorrenciasService) {
    this.ocorrenciasService = ocorrenciasService;
  }

  public async execute(payload: OccurrencesRequestDTO): Promise<OccurrencesResponseDTO> {
    const response = await this.ocorrenciasService.getAll(payload);
    return response;
  }
}

export default ObterPorFiltroUseCase;
