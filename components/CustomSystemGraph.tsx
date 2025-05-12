"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "./ui/button"

interface Node {
  id: number
  x: number
  y: number
  pi: number
  subsystem: number
}

interface Edge {
  source: number
  target: number
}

interface CustomSystemGraphProps {
  pi: number[]
  subsystems: Record<number, number[]>
}

export default function CustomSystemGraph({ pi, subsystems }: CustomSystemGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Define nodes positions
  const nodes: Node[] = [
    // First subsystem (0-5)
    { id: 0, x: 100, y: 100, pi: pi[0], subsystem: 1 },
    { id: 1, x: 250, y: 100, pi: pi[1], subsystem: 1 },
    { id: 2, x: 400, y: 50, pi: pi[2], subsystem: 1 },
    { id: 3, x: 400, y: 150, pi: pi[3], subsystem: 1 },
    { id: 4, x: 550, y: 100, pi: pi[4], subsystem: 1 },
    { id: 5, x: 700, y: 100, pi: pi[5], subsystem: 1 },

    // Second subsystem (6-10)
    { id: 6, x: 250, y: 300, pi: pi[6], subsystem: 2 },
    { id: 7, x: 400, y: 300, pi: pi[7], subsystem: 2 },
    { id: 8, x: 550, y: 300, pi: pi[8], subsystem: 2 },
    { id: 9, x: 100, y: 300, pi: pi[9], subsystem: 2 },
    { id: 10, x: 400, y: 400, pi: pi[10], subsystem: 2 },

    // Third subsystem (11-14)
    { id: 11, x: 250, y: 500, pi: pi[11], subsystem: 3 },
    { id: 12, x: 400, y: 500, pi: pi[12], subsystem: 3 },
    { id: 13, x: 100, y: 500, pi: pi[13], subsystem: 3 },
    { id: 14, x: 250, y: 600, pi: pi[14], subsystem: 3 },
  ]

  // Define edges based on the new graph structure
  const edges: Edge[] = [
    // First subsystem connections
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },

    // Second subsystem connections
    { source: 6, target: 7 },
    { source: 9, target: 6 },
    { source: 9, target: 7 },
    { source: 7, target: 8 },
    { source: 6, target: 8 },
    { source: 6, target: 10 },

    // Third subsystem connections
    { source: 13, target: 12 },
    { source: 13, target: 14 },
    { source: 13, target: 11 },
    { source: 14, target: 12 },
  ]

  // Handle zoom
  const handleZoom = (factor: number) => {
    setScale((prev) => {
      const newScale = prev * factor
      return Math.min(Math.max(newScale, 0.5), 2) // Limit scale between 0.5 and 2
    })
  }

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Reset view
  const resetView = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  // Get subsystem color
  const getSubsystemColor = (subsystem: number) => {
    switch (subsystem) {
      case 1:
        return { bg: "#FFF7ED", border: "#F97316" } // orange
      case 2:
        return { bg: "#ECFDF5", border: "#10B981" } // green
      case 3:
        return { bg: "#F5F3FF", border: "#8B5CF6" } // purple
      default:
        return { bg: "#F3F4F6", border: "#9CA3AF" } // gray
    }
  }

  // Calculate arrow points for directed edges
  const calculateArrowPoints = (source: Node, target: Node) => {
    const nodeSize = 40 // Size of the rhombus

    // Calculate direction vector
    const dx = target.x - source.x
    const dy = target.y - source.y
    const length = Math.sqrt(dx * dx + dy * dy)

    // Normalize direction vector
    const nx = dx / length
    const ny = dy / length

    // Calculate start and end points (adjusted for rhombus shape)
    // For a rhombus, we need to calculate the intersection point with the edge
    let startX, startY, endX, endY

    // Determine which edge of the rhombus to use based on direction
    if (Math.abs(nx) > Math.abs(ny)) {
      // Horizontal edge intersection
      const edgeOffset = (nodeSize / 2) * Math.sign(nx)
      startX = source.x + edgeOffset
      startY = source.y + (edgeOffset * ny) / nx

      endX = target.x - edgeOffset
      endY = target.y - (edgeOffset * ny) / nx
    } else {
      // Vertical edge intersection
      const edgeOffset = (nodeSize / 2) * Math.sign(ny)
      startY = source.y + edgeOffset
      startX = source.x + (edgeOffset * nx) / ny

      endY = target.y - edgeOffset
      endX = target.x - (edgeOffset * nx) / ny
    }

    // Calculate arrow head points
    const arrowLength = 10
    const arrowWidth = 6

    // Calculate perpendicular vector
    const px = -ny
    const py = nx

    // Calculate arrow head points
    const arrowPoint1X = endX - nx * arrowLength + px * arrowWidth
    const arrowPoint1Y = endY - ny * arrowLength + py * arrowWidth
    const arrowPoint2X = endX - nx * arrowLength - px * arrowWidth
    const arrowPoint2Y = endY - ny * arrowLength - py * arrowWidth

    return {
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
      arrow1: { x: arrowPoint1X, y: arrowPoint1Y },
      arrow2: { x: arrowPoint2X, y: arrowPoint2Y },
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleZoom(1.2)}>
            Zoom In
          </Button>
          <Button size="sm" onClick={() => handleZoom(0.8)}>
            Zoom Out
          </Button>
          <Button size="sm" onClick={resetView}>
            Reset View
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs">Subsystem 1 (0-5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs">Subsystem 2 (6-10)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs">Subsystem 3 (11-14)</span>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white" style={{ height: "500px" }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 800 700"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Graph elements with transform for pan and zoom */}
          <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
            {/* Draw edges */}
            {edges.map((edge, index) => {
              const source = nodes.find((n) => n.id === edge.source)!
              const target = nodes.find((n) => n.id === edge.target)!
              const points = calculateArrowPoints(source, target)

              return (
                <g key={`edge-${index}`}>
                  <line
                    x1={points.start.x}
                    y1={points.start.y}
                    x2={points.end.x}
                    y2={points.end.y}
                    stroke="#666"
                    strokeWidth="2"
                  />
                  <polygon
                    points={`${points.end.x},${points.end.y} ${points.arrow1.x},${points.arrow1.y} ${points.arrow2.x},${points.arrow2.y}`}
                    fill="#666"
                  />
                </g>
              )
            })}

            {/* Draw nodes */}
            {nodes.map((node) => {
              const colors = getSubsystemColor(node.subsystem)

              // Create rhombus (diamond) shape
              const size = 40 // Size of the rhombus
              const points = `${node.x},${node.y - size / 2} ${node.x + size / 2},${node.y} ${node.x},${node.y + size / 2} ${node.x - size / 2},${node.y}`

              return (
                <g key={`node-${node.id}`}>
                  <polygon points={points} fill={colors.bg} stroke={colors.border} strokeWidth="2" />
                  <text x={node.x} y={node.y - size / 2 - 5} textAnchor="middle" fontSize="12" fontWeight="bold">
                    {`Device ${node.id}`}
                  </text>
                  <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="12">
                    {`π = ${node.pi}`}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}
