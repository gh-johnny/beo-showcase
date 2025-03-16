"use client"

import { useState, useEffect } from "react"
import type { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/date-range-picker"

// Categorias
const categories = ["Saneamento Básico", "Transporte Público", "Clima", "Vias e Áreas Públicas"]

// Intensidades para cada categoria
const intensidades = ["Baixa", "Média", "Alta"]

// Gera dados simulados para os bairros com intensidades
const generateDataWithIntensities = (startDate: Date, endDate: Date) => {
  console.log(startDate, endDate)
  const bairros = [
    "Centro",
    "Jardim São Francisco",
    "Jardim Europa",
    "Jardim Cândido Bertini",
    "Vila Mollon IV",
    "Jardim Pérola",
    "Jardim Souza Queiroz",
    "Residencial Furlan",
    "Jardim Belo Horizonte",
    "Vila Grego",
    "Jardim São Fernando"
  ]

  // Gera dados aleatórios para cada bairro com intensidades
  return bairros
    .map((bairro) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: Record<string, any> = { bairro }

      categories.forEach((category) => {
        intensidades.forEach((intensidade) => {
          data[`${category} - ${intensidade}`] = 50
        })

        // Adiciona o total para cada categoria
        data[`${category} - Total`] =
          data[`${category} - Baixa`] + data[`${category} - Média`] + data[`${category} - Alta`]
      })

      return data
    })
    .sort((a, b) => {
      return b["Saneamento Básico - Total"] - a["Saneamento Básico - Total"]
    })
}

// Cores para as intensidades
const intensityColors = {
  Baixa: "hsl(var(--success))",
  Média: "hsl(var(--warning))",
  Alta: "hsl(var(--destructive))",
}

export default function CategoriasCharts() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (date) {
      setData(generateDataWithIntensities(date.from!, date.to!))
    }
  }, [date])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DateRangePicker date={date} onDateChange={setDate} />
      </div>

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
