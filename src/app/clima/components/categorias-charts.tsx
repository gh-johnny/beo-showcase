"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/date-range-picker"

// Categorias
const categories = ["Categoria A", "Categoria B", "Categoria C", "Categoria D"]

// Intensidades para cada categoria
const intensidades = ["Baixa", "Média", "Alta"]

// Gera dados simulados para os bairros com intensidades
const generateDataWithIntensities = (startDate: Date, endDate: Date) => {
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

  // Gera dados aleatórios para cada bairro com intensidades
  return bairros
    .map((bairro) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: Record<string, any> = { bairro }

      // Para cada categoria, gerar valores para cada intensidade
      categories.forEach((category) => {
        intensidades.forEach((intensidade) => {
          // Gera valores diferentes baseados na categoria e intensidade
          let multiplier = 1
          if (intensidade === "Média") multiplier = 0.7
          if (intensidade === "Alta") multiplier = 0.4

          // Valor base depende da categoria
          let baseValue = 0
          if (category === "Categoria A") baseValue = 1000
          if (category === "Categoria B") baseValue = 800
          if (category === "Categoria C") baseValue = 600
          if (category === "Categoria D") baseValue = 400

          data[`${category} - ${intensidade}`] = Math.floor(Math.random() * baseValue * multiplier)
        })

        // Adiciona o total para cada categoria
        data[`${category} - Total`] =
          data[`${category} - Baixa`] + data[`${category} - Média`] + data[`${category} - Alta`]
      })

      return data
    })
    .sort((a, b) => {
      // Ordena por total da Categoria A (poderia ser qualquer outra)
      return b["Categoria A - Total"] - a["Categoria A - Total"]
    })
}

// Cores para as intensidades
const intensityColors = {
  Baixa: "hsl(var(--success))",
  Média: "hsl(var(--warning))",
  Alta: "hsl(var(--destructive))",
}

export default function CategoriasCharts() {
  // Estado para o seletor de intervalo de datas
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  // Gera dados com base no intervalo de datas
  const data = generateDataWithIntensities(date?.from || subDays(new Date(), 7), date?.to || new Date())

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DateRangePicker date={date} onDateChange={setDate} />
      </div>

      {/* Grid de gráficos - 2x2 em telas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card key={category} className="h-full">
            <CardHeader>
              <CardTitle>{category} por Bairro e Intensidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <BarChart width={500} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bairro" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {intensidades.map((intensidade) => (
                    <Bar
                      key={`${category}-${intensidade}`}
                      dataKey={`${category} - ${intensidade}`}
                      name={intensidade}
                      stackId="a"
                      fill={intensityColors[intensidade as keyof typeof intensityColors]}
                      radius={[0, 0, 0, 0]}
                    />
                  ))}
                </BarChart>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
