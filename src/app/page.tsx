import OccurrencesService from "@/services/OccurrencesService";
import GetAllOccurrencesUseCase from "@/use-cases/occurrences/get-all";

const SANTA_BARBARA_LAT = '-22.7557' as const
const SANTA_BARBARA_LON = '-47.4145' as const
const SANTA_BARBARA_RAD = '15000' as const // (m)

export default async function Home() {

  const useCase = new GetAllOccurrencesUseCase(OccurrencesService.getInstance())

  const payload = {
    dataInicio: '2024-07-01',
    raio: SANTA_BARBARA_RAD,
    latitude: SANTA_BARBARA_LAT,
    longitude: SANTA_BARBARA_LON,
    tipoEventoEnum: 0,
    clima: [
      {
        tipoEventoClima: 0,
        intensidadeClima: 0,
      },
    ],

  }
    const res = await useCase.execute(payload)
    console.log(res)


  return (
    <>
      hello beo
    </>
  );
}
