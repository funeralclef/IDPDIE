"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface PiVectorTableProps {
  pi: number[]
  onPiChange: (index: number, value: number) => void
  onReset: () => void
}

export default function PiVectorTable({ pi, onPiChange, onReset }: PiVectorTableProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {pi.map((_, i) => (
                  <th key={i} className="border border-gray-200 bg-orange-50 p-2 text-center">
                    π<sub>{i}</sub>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {pi.map((value, i) => (
                  <td key={i} className="border border-gray-200 p-2 text-center">
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => onPiChange(i, Number(e.target.value))}
                      className="w-12 p-1 text-center border border-gray-300 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                      min="1"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={onReset} className="bg-orange-500 hover:bg-orange-600 text-white">
            Повернути значення за замовчуванням
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
