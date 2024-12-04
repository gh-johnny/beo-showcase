import HttpClient from '@/utils/HttpClient';
import { OccurrencesRequestDTO, OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';

class OcurrencesService {
  private static instance: OcurrencesService;
  private httpClient: HttpClient;

  private constructor() {
    this.httpClient = new HttpClient('/api/eventoexterno');
  }

  public static getInstance(): OcurrencesService {
    if (!OcurrencesService.instance) {
      OcurrencesService.instance = new OcurrencesService();
    }
    return OcurrencesService.instance;
  }

  public async getAll(payload: OccurrencesRequestDTO): Promise<OccurrencesResponseDTO> {
    return this.httpClient.post<OccurrencesResponseDTO>('/obterporfiltro', payload);
  }
}

export default OcurrencesService;
