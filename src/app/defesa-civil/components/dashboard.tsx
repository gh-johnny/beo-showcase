"use client"

import { Card } from "@/components/ui/card"
import { MapHome } from "@/components/map"
import PointsTable from "./table"
import { mockPointsWithEvento } from "@/mocks/occurrences"
import EventPieChart from "./pie-chart"
import NeighborhoodRatingsChart from "./bar-chart"

export default function Dashboard() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-2 h-full">
        <MapHome data={mockPointsWithEvento.filter(v => v.category === 'Defesa civil')} category={'Defesa civil'} />
      </Card>
      <Card className="p-2">
        <PointsTable points={mockPointsWithEvento} />
      </Card>
      <EventPieChart data={mockPointsWithEvento.filter(v => v.category === 'Defesa civil')} />
      <NeighborhoodRatingsChart data={mockPointsWithEvento} />
    </div>
  )
}
