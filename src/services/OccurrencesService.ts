import HttpClient from '@/utils/HttpClient';
import { OccurrencesRequestDTO, OccurrencesResponseDTO } from '@/dto/OccurrencesDTO';
import URLFormatter from '@/utils/URLFormatter';
import { envConfig } from '@/config/EnvConfig';
import { OccurrencesRoutes } from '@/constants/api/occurrences';

class OccurrencesService {
  private static instance: OccurrencesService;
  private httpClient: HttpClient;

  private constructor() {
    const baseURL = envConfig.get('BASE_URL')
    const port = envConfig.get('PORT')

    const url = new URLFormatter(baseURL, port)
    const formattedUrl = url.formatPath('')

    this.httpClient = new HttpClient(formattedUrl);
  }

  public static getInstance(): OccurrencesService {
    if (!OccurrencesService.instance) {
      OccurrencesService.instance = new OccurrencesService();
    }
    return OccurrencesService.instance;
  }

  public async getAll(payload: OccurrencesRequestDTO): Promise<OccurrencesResponseDTO> {
    return this.httpClient.post<OccurrencesResponseDTO>(OccurrencesRoutes.GET_ALL, payload);
  }
}

export default OccurrencesService;
