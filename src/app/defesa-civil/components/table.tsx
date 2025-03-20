import { useLayoutEffect, useRef, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import { TPoint } from "@/components/map"
import { Input } from "@/components/ui/input"
import { formatDistance } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"

export default function PointsTable({ points, updateFromTableToMap }: { points: TPoint[], updateFromTableToMap: (updatedPointsList: TPoint[]) => void }) {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPoint, setCurrentPoint] = useState<TPoint | null>(null)

  const [tablePoints, setTablePoints] = useState<TPoint[]>(points)

  const noteInputRef = useRef<HTMLInputElement | null>(null)

  const toggleRowSelection = (key: number) => {
    setSelectedRows((prev) => (prev.includes(key) ? prev.filter((rowKey) => rowKey !== key) : [...prev, key]))
  }

  const toggleAllRows = () => {
    if (selectedRows.length === tablePoints.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(tablePoints.map((point) => point.key))
    }
  }

  const openPointDetails = (point: TPoint) => {
    setCurrentPoint(point)
    setModalOpen(true)
  }

  const formatIntensity = (intensity: string | string[] | null) => {
    if (intensity === null) return "N/A"
    if (Array.isArray(intensity)) return intensity.join(", ")
    return intensity
  }

  const closeOccurrence = () => {
    if (noteInputRef.current !== null) {
      noteInputRef.current!.value = ""
    }

    const selectedRowsValue = selectedRows

    setTablePoints(prev => prev.filter(item => !selectedRowsValue.includes(item.key)))
  }

  useLayoutEffect(() => {
    updateFromTableToMap(tablePoints)
  }, [tablePoints, updateFromTableToMap])

  return (
    <div className="w-full">
      <div className="border-b rounded-md overflow-hidden">
        <Table className="top-0 border-gray-primary bg-gray-primary h-14">
          <TableHeader>
            <TableRow className="hover:bg-gray-primary hover:opacity-100">
              <TableHead>
                <Checkbox
                  checked={selectedRows.length === tablePoints.length && tablePoints.length > 0}
                  onCheckedChange={toggleAllRows}
                  aria-label="Selecione todas as linhas"
                  className="min-w-[18px] w-[18px] min-h-[18px] h-[18px] border-white data-[state=checked]:bg-blue-primary data-[state=checked]:text-white data-[state=checked]:border-transparent"
                />
              </TableHead>
              <TableHead className="text-white">Ocorrência</TableHead>
              <TableHead className="text-white">Bairro</TableHead>
              <TableHead className="text-right text-white">Comentários</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div
          data-empty={tablePoints.length === 0}
          className="h-[290px] max-h-[290px] data-[empty=true]:border-x overflow-y-auto"
        >
          <Table
            data-empty={tablePoints.length === 0}
            className="data-[empty=false]:border-x data-[empty=true]:mt-20"
          >
            <TableBody>
              {tablePoints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Sem dados disponíveis
                  </TableCell>
                </TableRow>
              ) : (
                tablePoints.map((point) => (
                  <TableRow key={point.key} className="h-16 odd:bg-zinc-100">
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(point.key)}
                        onCheckedChange={() => toggleRowSelection(point.key)}
                        aria-label={`Select row ${point.key}`}
                        className="min-w-[18px] w-[18px] min-h-[18px] h-[18px] data-[state=checked]:bg-blue-primary data-[state=checked]:text-white data-[state=checked]:border-transparent"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{point.event}</TableCell>
                    <TableCell>{point.neighborhood}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openPointDetails(point)}
                        className="hover:bg-blue-primary hover:text-white text-md"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <Table className="border-x rounded-md rounded-b">
          <TableFooter>
            <TableRow>
              <TableCell className="w-full">
                <Input
                  ref={noteInputRef}
                  placeholder="Notas para munícipe"
                  className="flex-1 w-full bg-white focus-visible:ring-gray-primary"
                />
              </TableCell>
              <TableCell>
                <Button
                  className="bg-gray-primary hover:bg-blue-primary focus-visible:ring-gray-primary"
                  onClick={() => closeOccurrence()}
                >
                  Fechar ocorrência(s)
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Point Details Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        {currentPoint && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{currentPoint.event}</DialogTitle>
              <DialogDescription>
                <span className="capitalize">
                  {formatDistance(currentPoint.date, new Date(), { addSuffix: true, locale: ptBR }).toString().at(0)}
                </span>
                <span>
                  {formatDistance(currentPoint.date, new Date(), { addSuffix: true, locale: ptBR }).slice(1)} - {currentPoint.neighborhood}
                </span>
              </DialogDescription>
            </DialogHeader>
            <section className="mx-auto rounded-lg overflow-hidden">
              <Image
                src={"/vazamento-agua.jpg"}
                alt=""
                width={400}
                height={220}
              />
            </section>
            <blockquote className="flex flex-col gap-1 font-medium italic">
              <span>
                &quot;Tem água vazando aqui na rua da minha casa!! 😭&quot;
              </span>
              <span> - Amélia Duarte</span>
            </blockquote>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Status:</div>
                <div className="ml-auto">
                  <Badge
                    data-open={currentPoint.isOpen}
                    variant={currentPoint.isOpen ? "default" : "secondary"}
                    className="bg-gray-primary data-[open=true]:bg-blue-primary text-white data-[open=false]:hover:bg-gray-primary"
                  >
                    {currentPoint.isOpen ? "Aberto" : "Fechado"}
                  </Badge>
                </div>

                <div className="font-medium">Categoria:</div>
                <div className="text-right">{currentPoint.category}</div>

                <div className="font-medium">Detalhe:</div>
                <div className="text-right">{formatIntensity(currentPoint.intensity)}</div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
