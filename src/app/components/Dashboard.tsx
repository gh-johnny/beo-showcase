"use client"

import { TrendingUp } from "lucide-react"
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
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { MapHome } from "@/components/map"

// Dados simulados para as categorias
const categories = ["Saneamento Básico", "Transporte Público", "Clima", "Vias e Áreas Públicas"]

const generateWeeklyComparison = () => {
  return categories.map((category) => {
    const currentWeek = 50;
    const previousWeek = 50;
    const percentChange = previousWeek > 0 ? ((currentWeek - previousWeek) / previousWeek) * 100 : 0

    return {
      category,
      currentWeek,
      previousWeek,
      percentChange: Number.parseFloat(percentChange.toFixed(2)),
    }
  })
}

export default function Dashboard() {
  const weeklyComparison = generateWeeklyComparison()

  return (
    <div className="space-y-4">
      {/* Indicadores de crescimento/redução */}
      <div className="flex gap-4">
        {weeklyComparison.map((item) => (
          <Card key={item.category} className="group hover:bg-blue-primary hover:text-white cursor-pointer flex flex-col justify-between flex-1 w-full py-3 px-3">
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-bold">{item.category}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 w-full flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold">
                    {item.currentWeek}
                  </span>
                  <span className="text-xs">
                    (últimos 7 dias)
                  </span>
                </div>
                <div className={`flex items-center ${item.percentChange >= 0 ? "text-green-500" : "text-red-500"} group-hover:text-white`}>
                  {item.percentChange >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(item.percentChange)}%</span>
                </div>
              </div>
              <div className="flex gap-1 text-xs mt-1">
                <span>
                  {item.previousWeek}
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
              <div className="flex items-end gap-1">
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

      {/* Seção de gráficos em grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-2">
          <MapHome />
        </Card>
        {/* Gráfico por categoria selecionada */}
        <StackChart />
      </div>
    </div>
  )
}

const chartData = [
  { month: "Saneamento Básico", fechado: 186, aberto: 80 },
  { month: "Transporte Público", fechado: 305, aberto: 200 },
  { month: "Clima", fechado: 237, aberto: 120 },
  { month: "Vias e Áreas Públicas", fechado: 73, aberto: 190 },

  // { month: "Água suja", fechado: 73, aberto: 190 },
  // { month: "Baixa Pressão", fechado: 237, aberto: 120 },
  // { month: "Falta de Água", fechado: 73, aberto: 190 },
  // { month: "Vazamento de Água", fechado: 186, aberto: 80 },
  // { month: "Vazamento Esgoto", fechado: 305, aberto: 200 },
]

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

export function StackChart() {
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
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            // tickFormatter={(value) => value.slice(0, 3)}
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
