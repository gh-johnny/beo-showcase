"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/date-range-picker"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

// Dados simulados para as categorias
const categories = ["Categoria A", "Categoria B", "Categoria C", "Categoria D"]

// Dados simulados para os bairros
const generateData = (startDate: Date, endDate: Date) => {
  console.log(startDate, endDate)
  const bairros = [
    "Centro",
    "Copacabana",
    "Ipanema",
    "Leblon",
    "Botafogo",
    "Flamengo",
    "Tijuca",
    "Méier",
    "Madureira",
    "Barra da Tijuca",
  ]

  // Gera dados aleatórios para cada bairro
  return bairros
    .map((bairro) => {
      return {
        bairro,
        "Categoria A": Math.floor(Math.random() * 1000),
        "Categoria B": Math.floor(Math.random() * 800),
        "Categoria C": Math.floor(Math.random() * 600),
        "Categoria D": Math.floor(Math.random() * 400),
        // Calculamos o total diretamente
        get total() {
          return this["Categoria A"] + this["Categoria B"] + this["Categoria C"] + this["Categoria D"]
        },
      }
    })
    .sort((a, b) => b.total - a.total)
}

// Gera dados para comparação de semanas
const generateWeeklyComparison = () => {
  return categories.map((category) => {
    const currentWeek = Math.floor(Math.random() * 5000)
    const previousWeek = Math.floor(Math.random() * 5000)
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
  // Estado para o seletor de intervalo de datas
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  // Estado para a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0])

  // Gera dados com base no intervalo de datas
  const data = generateData(date?.from || subDays(new Date(), 7), date?.to || new Date())

  // Dados para os indicadores de crescimento/redução
  const weeklyComparison = generateWeeklyComparison()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DateRangePicker date={date} onDateChange={setDate} />
      </div>

      {/* Indicadores de crescimento/redução */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeklyComparison.map((item) => (
          <Card key={item.category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{item.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{item.currentWeek}</div>
                <div className={`flex items-center ${item.percentChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {item.percentChange >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(item.percentChange)}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Comparado à semana anterior: {item.previousWeek}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seção de gráficos em grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico por categoria selecionada */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <Tabs defaultValue={categories[0]} onValueChange={setSelectedCategory}>
                <TabsList className="mb-2">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <BarChart width={500} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bairro" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey={selectedCategory}
                  fill="hsl(var(--primary))"
                  name={selectedCategory}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico com todas as categorias */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Comparativo de todas as categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <BarChart width={500} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bairro" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Legend />
                {categories.map((category, index) => (
                  <Bar
                    key={category}
                    dataKey={category}
                    fill={`hsl(var(--primary-${index + 1 || ""}))`}
                    name={category}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
