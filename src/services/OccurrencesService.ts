import HttpClient from '@/utils/HttpClient';
import { OccurrencesRequestDTO, OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';
import URLFormatter from '@/utils/URLFormatter';
import { envConfig } from '@/config/env';

class OccurrencesService {
  private static instance: OccurrencesService;
  private httpClient: HttpClient;

  private constructor() {
    const baseURL = envConfig.get('BASE_URL')
    const port = envConfig.get('PORT')

    const urlFormatter = new URLFormatter(baseURL, port)
    const formattedUrl = urlFormatter.formatPath('/api/eventoexterno')

    this.httpClient = new HttpClient(formattedUrl);
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
