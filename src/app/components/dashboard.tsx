"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapHome, TPoint } from "@/components/map"
import { mockPointsWithEvento } from "@/mocks/occurrences"
import { useState } from "react"
import CategoryIcon, { TCategory } from "./category-icon"


type TCardOutput = {
  category: TCategory | string,
  totalPastWeek: number,
  totalThisWeek: number,
  trend: number
  open: number
  closed: number
}

function transformPointsToGroupStats(points: TPoint[]): TCardOutput[] {
  const currentDate = new Date('2025-03-16T00:00:00Z'); // Current date (Sunday, March 16, 2025)

  // Initialize objects to store counts by category
  const groupCounts: { [key: string]: { pastWeek: number, thisWeek: number, open: number, closed: number } } = {};

  // First pass: collect all unique groups
  points.forEach(point => {
    if (!groupCounts[point.category]) {
      groupCounts[point.category] = { pastWeek: 0, thisWeek: 0, open: 0, closed: 0 };
    }
  });

  // Second pass: count occurrences by week
  points.forEach(point => {
    const pointDate = new Date(point.date);

    if (pointDate < currentDate) {
      groupCounts[point.category].pastWeek++;
    } else if (pointDate >= currentDate) {
      groupCounts[point.category].thisWeek++;
    }

    if (point.isOpen) {
      groupCounts[point.category].open++;
    } else {
      groupCounts[point.category].closed++;
    }
  });

  // Transform to the required output format
  const result = Object.entries(groupCounts).map(([category, counts]) => {
    const trend = counts.pastWeek > 0
      ? ((counts.thisWeek - counts.pastWeek) / counts.pastWeek) * 100
      : counts.thisWeek > 0 ? 100 : 0;

    return {
      category,
      totalPastWeek: counts.pastWeek,
      totalThisWeek: counts.thisWeek,
      trend: Number(trend.toFixed(1)),
      open: counts.open,
      closed: counts.closed,
    };
  });

  return result;
}

type GroupedPoint = {
  category: string;
  open: number;
  closed: number;
};

const groupByName = (points: TPoint[], category?: string): GroupedPoint[] => {
  const filteredPoints = category
    ? points.filter((point) => point.category === category)
    : points;

  return filteredPoints.reduce((acc, point) => {
    const existingGroup = acc.find((item) => item.category === point.event);

    if (existingGroup) {
      if (point.isOpen) {
        existingGroup.open += 1;
      } else {
        existingGroup.closed += 1;
      }
    } else {
      acc.push({
        category: point.event,
        open: point.isOpen ? 1 : 0,
        closed: point.isOpen ? 0 : 1,
      });
    }

    return acc;
  }, [] as GroupedPoint[]);
};


export default function Dashboard() {
  const cards = transformPointsToGroupStats(mockPointsWithEvento)

  const [cardInfoForChart, setCardInfoForChart] = useState<TCardOutput[] | GroupedPoint[]>(cards)
  const [cardInfoForMap, setCardInfoForMap] = useState<TPoint[]>(mockPointsWithEvento)

  const [whichCategory, setWhichCategory] = useState<TCategory | undefined>(undefined)

  const [cardPressed, setCardPressed] = useState<{ [key in TCategory]: boolean }>({
    'Defesa civil': false,
    'Saneamento básico': false,
    'Vias e áreas públicas': false,
    'Mobilidade urbana': false,
  })

  const clickFilterCard = (category: TCategory) => {
    let isAllInactive
    setCardPressed(prev => {
      const obj = {
        'Defesa civil': false,
        'Saneamento básico': false,
        'Vias e áreas públicas': false,
        'Mobilidade urbana': false,
        [category]: !prev[category]
      }
      isAllInactive = Object.values(obj).filter(v => v === false).length === Object.keys(obj).length
      return obj
    })
    setCardInfoForChart(isAllInactive ? cards : groupByName(mockPointsWithEvento, category))

    setWhichCategory(isAllInactive ? undefined : category)

    const filteredPins = isAllInactive ? mockPointsWithEvento : mockPointsWithEvento.filter(c => c.category === category)
    setCardInfoForMap(filteredPins)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {cards.map((item, i) => {
          return (
            <Card
              key={i}
              data-active={cardPressed[item.category as TCategory]}
              className="data-[active=true]:border-blue-primary category hover:border-blue-primary cursor-pointer flex flex-col justify-between flex-1 w-full py-3 px-3"
              onClick={() => clickFilterCard(item.category as TCategory)}
            >
              <CardHeader className="p-0">
                <CardTitle className="text-sm font-bold flex gap-2">
                  <span>
                    <CategoryIcon size={18} category={item.category as TCategory} />
                  </span>
                  <span>
                    {item.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 w-full flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold">
                      {item.totalThisWeek}
                    </span>
                    <span className="text-xs pb-1">
                      (últimos 7 dias)
                    </span>
                  </div>
                  <div className={`flex items-center ${item.trend <= 0 ? "text-green-500" : "text-red-500"}`}>
                    {item.trend >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-2" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-2" />
                    )}
                    <span className="font-medium">{Math.abs(item.trend)}%</span>
                  </div>
                </div>
                <div className="flex gap-1 text-xs mt-1">
                  <span>
                    {item.totalPastWeek}
                  </span>
                  <span>
                    (semana anterior)
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
        <Card className="category flex flex-col justify-between gap-2 flex-1 w-full py-3 px-3">
          <CardHeader className="p-0">
            <CardTitle className="text-sm font-bold">Média de tempo de atendimento:</CardTitle>
          </CardHeader>
          <CardContent className="p-0 w-full flex flex-col">
            <div className="items-center justify-between">
              <div className="text-blue-primary flex items-end gap-1">
                <span className="text-2xl font-bold">
                  6
                </span>
                <span>
                  dias (últimos 7 dias)
                </span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">
                  7
                </span>
                <span>
                  dias (semana anterior)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-2 min-w-[200px] min-h-[200px]">
          <MapHome data={cardInfoForMap.slice()} category={whichCategory} />
        </Card>
        <StackChart data={cardInfoForChart} />
      </div>
    </div>
  )
}

const chartConfig = {
  fechado: {
    label: "Fechado",
    color: "hsl(var(--chart-1))",
  },
  aberto: {
    label: "Em aberto",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function StackChart({ data }: { data: TCardOutput[] | GroupedPoint[] }) {

  const chartData = data.map(p => ({
    category: p.category,
    fechado: p.closed,
    aberto: p.open
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocorrências nos últimos 14 dias</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ChartContainer config={chartConfig}>
          <BarChart
            margin={{ left: 0, right: 0 }}
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="fechado"
              stackId="a"
              fill="#444e5a"
              radius={[0, 0, 4, 4]}
            >
              <LabelList
                dataKey="fechado"
                position="center"
                fill="#fff"
                offset={12}
                fontSize={12}
                formatter={(v: number) => v === 0 ? "" : v}
              />
            </Bar>
            <Bar
              dataKey="aberto"
              stackId="a"
              fill="#4292cf"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="aberto"
                position="center"
                fill="#fff"
                offset={12}
                fontSize={12}
                formatter={(v: number) => v === 0 ? "" : v}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

