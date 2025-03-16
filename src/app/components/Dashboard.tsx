"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { Card, CardContent, CardHeader, CardTitle, CardFooter, } from "@/components/ui/card"
import { MapHome, TPoint } from "@/components/map"
import { mockPointsWithEvento } from "@/mocks/occurrences"
import { useState } from "react"


type TCardOutput = {
  groupName: string,
  totalPastWeek: number,
  totalThisWeek: number,
  trend: number
  open: number
  closed: number
}

function transformPointsToGroupStats(points: TPoint[]): TCardOutput[] {
  const currentDate = new Date('2025-03-16T00:00:00Z'); // Current date (Sunday, March 16, 2025)
  const oneWeekAgo = new Date('2025-03-09T00:00:00Z');  // One week ago (Sunday, March 9, 2025)

  // Initialize objects to store counts by group
  const groupCounts: { [key: string]: { pastWeek: number, thisWeek: number, open: number, closed: number } } = {};

  // First pass: collect all unique groups
  points.forEach(point => {
    if (!groupCounts[point.group]) {
      groupCounts[point.group] = { pastWeek: 0, thisWeek: 0, open: 0, closed: 0 };
    }
  });

  // Second pass: count occurrences by week
  points.forEach(point => {
    const pointDate = new Date(point.date);

    if (pointDate >= oneWeekAgo && pointDate < currentDate) {
      groupCounts[point.group].pastWeek++;
    } else if (pointDate >= currentDate) {
      groupCounts[point.group].thisWeek++;
    }

    if (point.isOpen) {
      groupCounts[point.group].open++;
    } else {
      groupCounts[point.group].closed++;
    }
  });

  // Transform to the required output format
  const result = Object.entries(groupCounts).map(([groupName, counts]) => {
    const trend = counts.pastWeek > 0
      ? ((counts.thisWeek - counts.pastWeek) / counts.pastWeek) * 100
      : counts.thisWeek > 0 ? 100 : 0;

    return {
      groupName,
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
  groupName: string;
  open: number;
  closed: number;
};

const groupByName = (points: TPoint[], groupName?: string): GroupedPoint[] => {
  const filteredPoints = groupName
    ? points.filter((point) => point.group === groupName)
    : points;

  return filteredPoints.reduce((acc, point) => {
    const existingGroup = acc.find((item) => item.groupName === point.name);

    if (existingGroup) {
      if (point.isOpen) {
        existingGroup.open += 1;
      } else {
        existingGroup.closed += 1;
      }
    } else {
      acc.push({
        groupName: point.name,
        open: point.isOpen ? 1 : 0,
        closed: point.isOpen ? 0 : 1,
      });
    }

    return acc;
  }, [] as GroupedPoint[]);
};

type TGroups = 'Transporte Público' | 'Vias e Áreas Públicas' | 'Saneamento Básico' | 'Clima'

export default function Dashboard() {
  const cards = transformPointsToGroupStats(mockPointsWithEvento)

  const [cardInfoForChart, setCardInfoForChart] = useState<TCardOutput[] | GroupedPoint[]>(cards)

  const [cardPressed, setCardPressed] = useState<{ [key in TGroups]: boolean }>({
    'Clima': false,
    'Saneamento Básico': false,
    'Vias e Áreas Públicas': false,
    'Transporte Público': false,
  })

  const clickFilterCard = (groupName: TGroups) => {
    let isAllInactive
    setCardPressed(prev => {
      const obj = {
        'Clima': false,
        'Saneamento Básico': false,
        'Vias e Áreas Públicas': false,
        'Transporte Público': false,
        [groupName]: !prev[groupName]
      }
      isAllInactive = Object.values(obj).filter(v => v === false).length === Object.keys(obj).length
      return obj
    })
    setCardInfoForChart(isAllInactive ? cards : groupByName(mockPointsWithEvento, groupName))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {cards.map((item, i) => (
          <Card
            key={i}
            data-active={cardPressed[item.groupName as TGroups]}
            className="data-[active=true]:bg-blue-primary data-[active=true]:text-white group hover:bg-blue-primary hover:text-white cursor-pointer flex flex-col justify-between flex-1 w-full py-3 px-3"
            onClick={() => clickFilterCard(item.groupName as TGroups)}
          >
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-bold">{item.groupName}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 w-full flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold">
                    {item.totalThisWeek}
                  </span>
                  <span className="text-xs">
                    (últimos 7 dias)
                  </span>
                </div>
                <div className={`flex items-center ${item.trend <= 0 ? "text-green-500" : "text-red-500"} group-data-[active=true]:text-white group-hover:text-white`}>
                  {item.trend >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-2" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(item.trend)}%</span>
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
        ))}
        <Card className="group flex flex-col justify-between gap-2 flex-1 w-full py-3 px-3">
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
                <span className="text-xl font-bold">
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
        <Card className="p-2">
          <MapHome initialPoints={[]} />
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
    group: p.groupName,
    fechado: p.closed,
    aberto: p.open
  }))

    // { month: "Água suja", fechado: 73, aberto: 190 },
  // { month: "Baixa Pressão", fechado: 237, aberto: 120 },
  // { month: "Falta de Água", fechado: 73, aberto: 190 },
  // { month: "Vazamento de Água", fechado: 186, aberto: 80 },
  // { month: "Vazamento Esgoto", fechado: 305, aberto: 200 },


  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocorrências nos últimos 7 dias</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ChartContainer config={chartConfig}>
          <BarChart
            margin={{ left: 0, right: 0 }}
            accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="group"
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
            />
            <Bar
              dataKey="aberto"
              stackId="a"
              fill="#4292cf"
              radius={[4, 4, 0, 0]}

            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Aumento de ocorrências em
          <span className="text-rose-500">
            5.2%
          </span>
          <TrendingUp className="text-rose-500 h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
