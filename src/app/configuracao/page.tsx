"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const data: { [key: string]: { [key: string]: string[] } } = {
  "Saneamento básico": {
    "Vazamento de água": ["Pequeno", "Médio", "Grande"],
    "Vazamento de esgoto": ["Pequeno", "Médio"],
    "Falta de água": ["Manhã", "Tarde", "Noite"],
    "Baixa pressão da água": ["Manhã", "Tarde", "Noite"],
    "Água suja": ["Mal cheiro", "Com gosto", "Barrenta ou escura"],
  },
  "Defesa civil": {
    "Chuva": ["Leve", "Forte", "Intenso"],
    "Alagamento": ["Leve", "Forte", "Intenso"],
    "Queda de árvore": ["Sem vítima", "Com vítima"],
    "Queda de poste/fios": ["Sem vítima", "Com vítima"],
    "Queda de muro": ["Com vítima"],
    "Deslizamento": ["Com vítima"],
    "Foco de incêndio": ["/"],
    "Foco de dengue": ["/"],
  },
  "Vias e áreas públicas": {
    "Buraco": ["Pequeno", "Médio", "Grande"],
    "Calçada": ["Estreita", "Sem acessibilidade"],
    "Rua ou avenida": ["Interditada", "Obstruída", "Sem iluminação"],
    "Ciclovias": ["Interditada", "Obstruída", "Sem iluminação"],
    "Parques e praças": ["Vandalismo", "Sem sinalização", "Falta de vigilância", "Comércio ilegal"],
  },
  "Mobilidade urbana": {
    "Ônibus": ["Quebrado", "Atrasado", "Lotado", "Comércio ilegal"],
    "Trêm": ["Quebrado", "Atrasado", "Lotado", "Comércio ilegal"],
    "Metrô": ["Quebrado", "Atrasado", "Lotado", "Comércio ilegal"],
  }
}

export default function Page() {
  const [category, setCategory] = useState<string>("")
  const [occurrence, setOccurrence] = useState<string>("")
  const [intensity, setIntensity] = useState<string>("")
  const [timeValue, setTimeValue] = useState<string>("")
  const [timeUnit, setTimeUnit] = useState<string>("")

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setOccurrence("")
    setIntensity("")
  }

  const handleOccurrenceChange = (value: string) => {
    setOccurrence(value)
    setIntensity("")
  }

  const handleSave = () => {
    setCategory("")
    setOccurrence("")
    setIntensity("")
    setTimeValue("")
    setTimeUnit("")
  }

  return (
    <section className="w-full h-[calc(100dvh-56px)] flex justify-center gap-12 items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">Configuração dos tempos de resposta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione uma Categoria" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(data).map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occurrence">Ocorrência</Label>
            <Select value={occurrence} onValueChange={handleOccurrenceChange} disabled={!category}>
              <SelectTrigger id="occurrence">
                <SelectValue placeholder="Selecione uma Ocorrência" />
              </SelectTrigger>
              <SelectContent>
                {category && Object.keys(data[category]).map((occ) => (
                  <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensidade</Label>
            <Select value={intensity} onValueChange={setIntensity} disabled={!occurrence}>
              <SelectTrigger id="intensity">
                <SelectValue placeholder="Selecione uma Intensidade" />
              </SelectTrigger>
              <SelectContent>
                {category && occurrence && data[category][occurrence].map((intens) => (
                  <SelectItem key={intens} value={intens}>{intens}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Tempo:</Label>
            <div className="flex gap-2">
              <Input
                id="timeValue"
                type="number"
                placeholder="Digite um número"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="flex-1 min-w-[50%]"
              />
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger id="timeUnit">
                  <SelectValue placeholder="Unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="segundos">Segundos</SelectItem>
                  <SelectItem value="minutos">Minutos</SelectItem>
                  <SelectItem value="horas">Horas</SelectItem>
                  <SelectItem value="dias">Dias</SelectItem>
                  <SelectItem value="semanas">Semanas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="transition-all w-full bg-blue-primary hover:bg-blue-primary hover:opacity-85"
          >
            Salvar
          </Button>
        </CardContent>
      </Card>
      <picture className="flex justify-center items-center w-96 h-96">
        <Image
          src={"/doglupa.png"}
          alt=""
          width={300}
          height={300}
        />
      </picture>
    </section>
  )
}
