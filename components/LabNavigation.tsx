"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

export default function LabNavigation() {
  const pathname = usePathname()

  return (
    <div className="flex justify-center gap-4 mb-6">
      <Button asChild variant={pathname === "/" ? "default" : "outline"}>
        <Link href="/">Лабораторна 5</Link>
      </Button>
      <Button asChild variant={pathname === "/lab6" ? "default" : "outline"}>
        <Link href="/lab6">Лабораторна 6</Link>
      </Button>
    </div>
  )
}
