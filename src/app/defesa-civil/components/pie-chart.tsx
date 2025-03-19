"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TPoint } from "@/components/map"
import { List } from "@/components/utils/list"

interface EventPieChartProps {
  data: TPoint[]
}

const chartConfig: { [key: string]: { label: string, color: string } } = {
  "Alagamento": {
    label: "Alagamento",
    color: "#577590",
  },
  "Foco de dengue": {
    label: "Foco de dengue",
    color: "#f3722c",
  },
  "Foco de incêndio": {
    label: "Foco de incêndio",
    color: "#f94144",
  },
  "Queda de árvore": {
    label: "Queda de árvore",
    color: "#90be6d",
  },
  "Queda de post/fios": {
    label: "Queda de post/fios",
    color: "#f9c74f",
  },
  "Queda de muro": {
    label: "Queda de muro",
    color: "#43aa8b",
  },
  'Deslizamento': {
    label: "Deslizamento",
    color: "#f8961e",
  },
} satisfies ChartConfig


export default function EventPieChart({ data }: EventPieChartProps) {
  const [chartData, setChartData] = useState<{ name: string; value: number; percentage: number }[]>([])

  useEffect(() => {
    const eventCounts: Record<string, number> = {}
    data.forEach((point) => {
      if (eventCounts[point.event]) {
        eventCounts[point.event]++
      } else {
        eventCounts[point.event] = 1
      }
    })

    const totalEvents = data.length
    const processedData = Object.entries(eventCounts).map(([event, count]) => ({
      name: event,
      value: count,
      percentage: (count / totalEvents) * 100,
    }))

    const colors = [
      "#f94144",
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
      <CardContent className="flex justify-center gap-16 flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mt-2 aspect-square max-w-[300px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              color="color"
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
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartConfig[entry.name]?.color || "#ccc"} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <ul className="flex flex-col justify-center gap-2">
          <List items={Object.values(chartConfig)} render={(item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm"
            >
              <div
                className={`min-w-3 w-3 min-h-3 h-3 rounded-[3px]`}
                style={{ backgroundColor: item.color }}
              />
              <span className="text-nowrap">{item.label}</span>
            </li>
          )} />
        </ul>
      </CardContent>
    </Card>
  )
}
