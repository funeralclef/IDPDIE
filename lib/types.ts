export interface Subsystem {
  indices: number[]
  minProductivity: number
}

export interface SystemData {
  pi: number[]
  subsystems: Record<number, number[]>
  pi_min: Record<number, number>
  r: Record<number, number>
  totalProductivity: number
}
