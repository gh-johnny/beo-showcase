"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import { TPoint } from "@/components/map"
import { Input } from "@/components/ui/input"

export default function PointsTable({ points }: { points: TPoint[] }) {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPoint, setCurrentPoint] = useState<TPoint | null>(null)

  // Toggle selection of a row
  const toggleRowSelection = (key: number) => {
    setSelectedRows((prev) => (prev.includes(key) ? prev.filter((rowKey) => rowKey !== key) : [...prev, key]))
  }

  // Toggle all rows selection
  const toggleAllRows = () => {
    if (selectedRows.length === points.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(points.map((point) => point.key))
    }
  }

  // Open modal with point details
  const openPointDetails = (point: TPoint) => {
    setCurrentPoint(point)
    setModalOpen(true)
  }

  // Format intensity for display
  const formatIntensity = (intensity: string | string[] | null) => {
    if (intensity === null) return "N/A"
    if (Array.isArray(intensity)) return intensity.join(", ")
    return intensity
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="top-0">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === points.length && points.length > 0}
                  onCheckedChange={toggleAllRows}
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Neighborhood</TableHead>
              <TableHead className="text-right">Comments</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="max-h-[290px] overflow-y-auto">
          <Table>
            <TableBody>
              {points.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                points.map((point) => (
                  <TableRow key={point.key} className="h-16">
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(point.key)}
                        onCheckedChange={() => toggleRowSelection(point.key)}
                        aria-label={`Select row ${point.key}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{point.event}</TableCell>
                    <TableCell>{point.neighborhood}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openPointDetails(point)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell className="w-full">
                <Input
                  placeholder="Notas para munícipe"
                  className="flex-1 w-full bg-white focus-visible:ring-gray-primary"
                />
              </TableCell>
              <TableCell>
                <Button
                className="bg-gray-primary hover:bg-blue-primary focus-visible:ring-gray-primary"
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
                {currentPoint.date} - {currentPoint.neighborhood}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Category:</div>
                <div>{currentPoint.category}</div>

                <div className="font-medium">Status:</div>
                <div>
                  <Badge variant={currentPoint.isOpen ? "default" : "secondary"}>
                    {currentPoint.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>

                <div className="font-medium">Location:</div>
                <div>
                  {currentPoint.lat}, {currentPoint.lng}
                </div>

                <div className="font-medium">Intensity:</div>
                <div>{formatIntensity(currentPoint.intensity)}</div>

                <div className="font-medium">Key:</div>
                <div>{currentPoint.key}</div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
