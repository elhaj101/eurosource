"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const EU_COUNTRIES = [
  { name: "Germany", colors: "from-black via-red-600 to-yellow-400" },
  { name: "France", colors: "from-blue-600 via-white to-red-600" },
  { name: "Italy", colors: "from-green-600 via-white to-red-600" },
  { name: "Spain", colors: "from-red-600 via-yellow-400 to-red-600" },
  { name: "Poland", colors: "from-white to-red-600" },
  { name: "Netherlands", colors: "from-red-600 via-white to-blue-600" },
  { name: "Belgium", colors: "from-black via-yellow-400 to-red-600" },
  { name: "Greece", colors: "from-blue-600 via-white to-blue-600" },
  { name: "Portugal", colors: "from-green-700 via-yellow-400 to-red-600" },
  { name: "Austria", colors: "from-red-600 via-white to-red-600" },
  { name: "Sweden", colors: "from-blue-600 via-yellow-400 to-blue-600" },
  { name: "Denmark", colors: "from-red-600 via-white to-red-600" },
  { name: "Finland", colors: "from-blue-600 via-white to-blue-600" },
  { name: "Ireland", colors: "from-green-600 via-white to-orange-600" },
  { name: "Hungary", colors: "from-red-600 via-white to-green-600" },
  { name: "Romania", colors: "from-blue-600 via-yellow-400 to-red-600" },
  { name: "Bulgaria", colors: "from-white via-green-600 to-red-600" },
  { name: "Croatia", colors: "from-red-600 via-white to-blue-600" },
  { name: "Slovenia", colors: "from-white via-blue-600 to-red-600" },
  { name: "Slovakia", colors: "from-white via-blue-600 to-red-600" },
  { name: "Lithuania", colors: "from-yellow-400 via-red-600 to-red-600" },
  { name: "Latvia", colors: "from-red-600 via-white to-red-600" },
  { name: "Estonia", colors: "from-blue-600 via-black to-white" },
  { name: "Cyprus", colors: "from-orange-500 via-white to-orange-500" },
  { name: "Luxembourg", colors: "from-blue-600 via-white to-red-600" },
  { name: "Malta", colors: "from-white via-red-600 to-white" },
]

export function CyclingCountry() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EU_COUNTRIES.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const current = EU_COUNTRIES[currentIndex]

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={current.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`bg-gradient-to-r ${current.colors} bg-clip-text text-transparent font-bold`}
      >
        {current.name}
      </motion.span>
    </AnimatePresence>
  )
}


