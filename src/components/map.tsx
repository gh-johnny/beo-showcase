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

export type TPoint = {
  name: string
  lat: string | number
  lng: string | number
  key: string
  isOpen: boolean
  group: string
  date: string
}

export function MapHome({ initialPoints }: { initialPoints: TPoint[] }) {
  const [points] = useState<TPoint[] | undefined>([...initialPoints])

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
