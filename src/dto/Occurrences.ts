interface ClimateDTO {
  tipoEventoClima: number
  intensidadeClima: number
}

export interface OccurrencesRequestDTO {
  dataInicio: string
  raio: string
  latitude: string
  longitude: string
  tipoEventoEnum: number
  clima: Array<ClimateDTO>
}

export type TypeOccurrence =
  // | 'VazamentoAgua'
  // | 'BuracoRua'
  // | 'BuracoCalcada'
  // | 'BaixaPressao'
  // | 'AguaSuja'
  // | 'Inundacao'
  // | 'FaltaAgua'
  // | 'Visibilidade'
  // | 'Enxurrada'
  // | 'VazamentoEsgoto'
  // | 'Chuva'
  // | 'Alagamento'
  // | 'Visibilidade'
  // | 'Queda'
  // | 'Ônibus'
  // | 'Trem'
  // | 'Metrô'
  // | 'Calçadas'
  // | 'Ciclovias'
  // | 'Ruas e Avenidas'
  string

interface OccurrencesResponseBase {
  id: string
  latitude: string
  longitude: string
  tipoEvento: TypeOccurrence
  intensidade:
  // | 'PEQUENO'
  // | 'MEDIO'
  // | 'GRANDE'
  // | 'DIATODO'
  // | 'COMGOSTO'
  // | 'FRACA'
  // | 'MODERADA'
  // | 'FORTE'
  // | 'INTENSA'
  // | 'MANHA'
  // | 'NOITE'
  // | 'MUITOGRANDE'
  string
  data: string
  endereco: {
    logradouro: string | null
    numero: string | null
    bairro: string | null
    cidade: string | null
    estado: string | null
    pais: string | null
  }
}

interface OccurrencesResponseOkDTO {
  status: number
  data: {
    id: string
    clima: Array<OccurrencesResponseBase>
    queda: never[]
    utilidadePublica: never[]
  }
  messages: never[]
  exception: null
}

interface OccurrencesResponseErrorDTO {
  status: number
  data: null
  messages: [
    {
      text: string
    },
  ]
  exception: null
}

export type OccurrencesResponseDTO = OccurrencesResponseOkDTO | OccurrencesResponseErrorDTO;
