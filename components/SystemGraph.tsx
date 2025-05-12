import Image from "next/image"

export default function SystemGraph() {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-2xl h-[300px] border-2 border-gray-200 rounded-lg overflow-hidden">
        <Image
          src="/images/graph_fp0.png"
          alt="Граф системи функціональних пристроїв"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
