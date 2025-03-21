"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TPoint } from "@/components/map"

const processDataByNeighborhood = (data: TPoint[]) => {
  const neighborhoodGroups: Record<string, TPoint[]> = {}

  data.forEach((point) => {
    if (!neighborhoodGroups[point.neighborhood]) {
      neighborhoodGroups[point.neighborhood] = []
    }
    neighborhoodGroups[point.neighborhood].push(point)
  })

  return Object.entries(neighborhoodGroups)
    .map(([neighborhood, points]) => {
      const validRatings = points.filter((p) => p.rating !== null).map((p) => p.rating as number)
      const averageRating =
        validRatings.length > 0 ? validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length : 0

      return {
        neighborhood,
        averageRating: Number.parseFloat(averageRating.toFixed(1)),
      }
    })
    .sort((a, b) => a.averageRating - b.averageRating)
}

const chartConfig = {
  averageRating: {
    label: "Média de avaliação",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function NeighborhoodRatingsChart({ data }: { data: TPoint[] }) {
  const chartData = processDataByNeighborhood(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="text-center">
          Satisfação com atendimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
              right: 20,
              top: 10,
              bottom: 10,
            }}
          >
            <XAxis
              type="number"
              dataKey="averageRating"
              tickLine={false}
              axisLine={false}
              domain={[0, 5]}
              tickCount={6}
            />
            <YAxis
              dataKey="neighborhood"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={125}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="averageRating"
              name="Média de avaliação"
              fill="#444e5a"
              radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
