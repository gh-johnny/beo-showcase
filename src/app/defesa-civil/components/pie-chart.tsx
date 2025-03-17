"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TPoint } from "@/components/map"
import { List } from "@/components/utils/list"

interface EventPieChartProps {
  data: TPoint[]
}

const legend = [
  {
    label: "Alagamento",
    color: "#000",
  },
  {
    label: "Foco de dengue",
    color: "#000",
  },
  {
    label: "Foco de incêndio",
    color: "#000",
  },
  {
    label: "Queda de árvore",
    color: "#000",
  },
  {
    label: "Queda de post/fios",
    color: "#000",
  },
  {
    label: "Queda de muro",
    color: "#000",
  },
  {
    label: "Deslizamento",
    color: "#000",
  },
]

const chartConfig = {
  "Alagamento": {
    label: "Alagamento",
    color: "#000",
  },
  "Foco de dengue": {
    label: "Foco de dengue",
    color: "#000",
  },
  "Foco de incêndio": {
    label: "Foco de incêndio",
    color: "#000",
  },
  "Queda de árvore": {
    label: "Queda de árvore",
    color: "#000",
  },
  "Queda de post/fios": {
    label: "Queda de post/fios",
    color: "#000",
  },
  "Queda de muro": {
    label: "Queda de muro",
    color: "#000",
  },
  'Deslizamento': {
    label: "Deslizamento",
    color: "#000",
  },
} satisfies ChartConfig


export default function EventPieChart({ data }: EventPieChartProps) {
  const [chartData, setChartData] = useState<{ name: string; value: number; percentage: number }[]>([])

  useEffect(() => {
    // Process data to count events by type
    const eventCounts: Record<string, number> = {}
    data.forEach((point) => {
      if (eventCounts[point.event]) {
        eventCounts[point.event]++
      } else {
        eventCounts[point.event] = 1
      }
    })

    // Convert to chart data format
    const totalEvents = data.length
    const processedData = Object.entries(eventCounts).map(([event, count]) => ({
      name: event,
      value: count,
      percentage: (count / totalEvents) * 100,
    }))

    // Generate color config for the chart
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "hsl(var(--chart-6))",
      "hsl(var(--chart-7))",
      "hsl(var(--chart-8))",
    ]

    const newColorConfig: Record<string, { label: string; color: string }> = {}
    Object.keys(eventCounts).forEach((event, index) => {
      newColorConfig[event] = {
        label: event,
        color: colors[index % colors.length],
      }
    })

    setChartData(processedData)
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ocorrências nos últimos 30 dias</CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mt-2 mx-auto aspect-square max-h-[350px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {payload.value}
                  </text>
                )
              }}
            />
          </PieChart>
        </ChartContainer>
        <ul className="absolute top-24 right-8 flex flex-col gap-2">
          <List items={legend} render={(item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm"
            >
              <div
                className={`min-w-3 w-3 min-h-3 h-3 rounded-[3px]`}
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </li>
          )} />
        </ul>
      </CardContent>
    </Card>
  )
}
