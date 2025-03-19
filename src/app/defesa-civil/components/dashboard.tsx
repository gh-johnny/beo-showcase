"use client"
import { Card } from "@/components/ui/card"
import { MapHome, TPoint } from "@/components/map"
import PointsTable from "./table"
import { mockPointsWithEvento } from "@/mocks/occurrences"
import EventPieChart from "./pie-chart"
import NeighborhoodRatingsChart from "./bar-chart"
import { useState } from "react"

export default function Dashboard() {
  const [pointsForMap, setPointsForMap] = useState<TPoint[]>(mockPointsWithEvento)

  const updateFromTableToMap = (updatedPointsList: TPoint[]) => {
    setPointsForMap(updatedPointsList)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-2 h-full">
        <MapHome data={pointsForMap.filter(v => v.category === 'Defesa civil')} category={'Defesa civil'} />
      </Card>
      <Card className="p-2">
        <PointsTable
          points={mockPointsWithEvento}
          updateFromTableToMap={updateFromTableToMap}
        />
      </Card>
      <EventPieChart data={mockPointsWithEvento.filter(v => v.category === 'Defesa civil')} />
      <NeighborhoodRatingsChart data={mockPointsWithEvento} />
    </div>
  )
}
