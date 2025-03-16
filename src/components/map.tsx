import { Marker, MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMap,
} from '@vis.gl/react-google-maps'
import Image from 'next/image'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

const SANTA_BARBARA_LAT = '-22.7557' as const
const SANTA_BARBARA_LON = '-47.4145' as const

import { Card } from './ui/card'
interface LatLngLiteral {
  lat: number
  lng: number
}

interface LatLng {
  lat: number
  lng: number
}

type TPoint = {
  name: string
  lat: string | number
  lng: string | number
  key: string
}

const mockPointsWithEvento: TPoint[] = [
  { name: 'Vazamento de Água', lat: -22.747147, lng: -47.409938, key: 'point-0' },
  { name: 'Buraco Rua', lat: -22.764438, lng: -47.407722, key: 'point-1' },
  { name: 'Falta de Água', lat: -22.750243, lng: -47.409831, key: 'point-2' },
  { name: 'Chuva', lat: -22.759999, lng: -47.422954, key: 'point-3' },
  { name: 'Inundação', lat: -22.748699, lng: -47.407124, key: 'point-4' },
  { name: 'Vazamento de Esgoto', lat: -22.761337, lng: -47.410455, key: 'point-5' },
  { name: 'Alagamento', lat: -22.749064, lng: -47.405751, key: 'point-6' },
  { name: 'Enxurrada', lat: -22.757339, lng: -47.411113, key: 'point-7' },
  { name: 'Buraco Calçada', lat: -22.75886, lng: -47.414976, key: 'point-8' },
  { name: 'Vazamento de Água', lat: -22.758093, lng: -47.419618, key: 'point-9' },
  { name: 'Visibilidade', lat: -22.754013, lng: -47.406169, key: 'point-10' },
  { name: 'Ônibus', lat: -22.754899, lng: -47.411322, key: 'point-11' },
  { name: 'Trêm', lat: -22.747935, lng: -47.414862, key: 'point-12' },
  { name: 'Ciclovias', lat: -22.74818, lng: -47.418231, key: 'point-13' },
  { name: 'Vazamento de Esgoto', lat: -22.753939, lng: -47.41376, key: 'point-14' },
  { name: 'Ruas e Avenidas', lat: -22.753136, lng: -47.417059, key: 'point-15' },
  { name: 'Queda', lat: -22.758471, lng: -47.422646, key: 'point-16' },
  { name: 'Chuva', lat: -22.765128, lng: -47.414867, key: 'point-17' },
  { name: 'Baixa Pressão', lat: -22.754445, lng: -47.416413, key: 'point-18' },
  { name: 'Falta de Água', lat: -22.757718, lng: -47.415421, key: 'point-19' },
  { name: 'Alagamento', lat: -22.758563, lng: -47.419715, key: 'point-20' },
  { name: 'Vazamento de Água', lat: -22.75423, lng: -47.418176, key: 'point-21' },
  { name: 'Vazamento de Esgoto', lat: -22.761172, lng: -47.412423, key: 'point-22' },
  { name: 'AguaSuja', lat: -22.753938, lng: -47.41948, key: 'point-23' },
  { name: 'Ruas e Avenidas', lat: -22.760087, lng: -47.405815, key: 'point-24' },
  { name: 'Visibilidade', lat: -22.755919, lng: -47.408311, key: 'point-25' },
  { name: 'Buraco Rua', lat: -22.765021, lng: -47.414608, key: 'point-26' },
  { name: 'Buraco Calçada', lat: -22.76181, lng: -47.410796, key: 'point-27' },
  { name: 'Inundação', lat: -22.761653, lng: -47.41298, key: 'point-28' },
  { name: 'Alagamento', lat: -22.759297, lng: -47.421761, key: 'point-29' },
  { name: 'Chuva', lat: -22.758639, lng: -47.422358, key: 'point-30' },
  { name: 'Trêm', lat: -22.760639, lng: -47.404756, key: 'point-31' },
  { name: 'Ônibus', lat: -22.762122, lng: -47.409189, key: 'point-32' },
  { name: 'Queda', lat: -22.747198, lng: -47.423372, key: 'point-33' },
  { name: 'Metrô', lat: -22.760981, lng: -47.410743, key: 'point-34' },
  { name: 'Visibilidade', lat: -22.755204, lng: -47.423575, key: 'point-35' },
  { name: 'Falta de Água', lat: -22.751998, lng: -47.411645, key: 'point-36' },
  { name: 'Vazamento de Água', lat: -22.753681, lng: -47.41385, key: 'point-37' },
  { name: 'Ruas e Avenidas', lat: -22.752291, lng: -47.42154, key: 'point-38' },
  { name: 'Ciclovias', lat: -22.763188, lng: -47.42285, key: 'point-39' },
  { name: 'Baixa Pressão', lat: -22.756718, lng: -47.4239, key: 'point-40' },
  { name: 'Buraco Rua', lat: -22.760383, lng: -47.412875, key: 'point-41' },
  { name: 'Trêm', lat: -22.746504, lng: -47.422215, key: 'point-42' },
  { name: 'Vazamento de Esgoto', lat: -22.749803, lng: -47.405331, key: 'point-43' },
  { name: 'Chuva', lat: -22.758225, lng: -47.409307, key: 'point-44' },
  { name: 'Enxurrada', lat: -22.76472, lng: -47.409718, key: 'point-45' },
  { name: 'Ruas e Avenidas', lat: -22.747347, lng: -47.423338, key: 'point-46' },
  { name: 'Ônibus', lat: -22.765601, lng: -47.414103, key: 'point-47' },
  { name: 'Vazamento de Água', lat: -22.764155, lng: -47.409823, key: 'point-48' },
  { name: 'Visibilidade', lat: -22.751165, lng: -47.411083, key: 'point-49' }
];

export function MapHome() {
  const [points] = useState<TPoint[] | undefined>(mockPointsWithEvento)

  return (
    points && (
      <APIProvider
        libraries={['places', 'maps']}
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}
      >
        <Card className="overflow-hidden h-full w-full">
          <Map
            defaultZoom={15}
            disableDefaultUI={true}
            zoomControl={true}
            fullscreenControl={true}
            defaultCenter={{
              lat: Number(SANTA_BARBARA_LAT),
              lng: Number(SANTA_BARBARA_LON),
            }}
            mapId={process.env.NEXT_PUBLIC_MAPS_ID}
          >
            <Markers points={points!} />
          </Map>
          <Script
            id="googlemaps"
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY ?? ''}&libraries=places`}
          />
        </Card>
      </APIProvider>
    )
  )
}

type TPointProps = TPoint
type TMarkerProps = { points: TPointProps[] }

function Markers({ points }: TMarkerProps) {
  const map = useMap()
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({})

  const clusterer = useRef<MarkerClusterer | null>(null)

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return
    if (!marker && !markers[key]) return

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker }
      }
      delete prev[key]
      return prev
    })
  }

  useEffect(() => {
    if (!map) return
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map })
    }
  }, [map])

  useEffect(() => {
    clusterer.current?.clearMarkers()
    clusterer.current?.addMarkers(Object.values(markers))
  }, [markers])

  return (
    <>
      {points.map((point) => {
        return (
          <AdvancedMarker
            key={point.key}
            ref={(marker) => setMarkerRef(marker, point.key)}
            position={point as LatLngLiteral | LatLng | null | undefined}
          >
            <div className='relative group w-fit h-fit'>
              <Image
                className=""
                src={'/marcador_mapa.png'}
                alt=""
                width={25}
                height={25}
              />
              <div className='bg-white whitespace-nowrap p-2 rounded-lg border absolute -top-10 left-0 hidden group-hover:block'>
                {point.name}
              </div>
            </div>
          </AdvancedMarker>
        )
      })}
    </>
  )
}
