import HttpClient from '@/utils/HttpClient';
import { OccurrencesRequestDTO, OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';

class OccurrencesService {
  private static instance: OccurrencesService;
  private httpClient: HttpClient;

  private constructor() {
    this.httpClient = new HttpClient('/api/eventoexterno');
  }

  public static getInstance(): OccurrencesService {
    if (!OccurrencesService.instance) {
      OccurrencesService.instance = new OccurrencesService();
    }
    return OccurrencesService.instance;
  }

  public async getAll(payload: OccurrencesRequestDTO): Promise<OccurrencesResponseDTO> {
    const res = this.httpClient.post<OccurrencesResponseDTO>('/obterporfiltro', payload);
    return res
  }
}

export default OccurrencesService;
