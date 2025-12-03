"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Orbitron } from 'next/font/google'
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
})

// Fun rotating developer messages
const funTexts = [
  "Compiling Awesomeness...",
  "Polishing Pixels...",
  "Optimizing Your Experience...",
  "Aligning Divs (we hope)...",
  "Loading Creative Mode...",
  "Deploying Style & Vibes...",
]

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [funText, setFunText] = useState(funTexts[0])

  useEffect(() => {
    // Change text every 700ms for fun
    const interval = setInterval(() => {
      setFunText(funTexts[Math.floor(Math.random() * funTexts.length)])
    }, 700)

    const timer = setTimeout(onFinish, 2800)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onFinish])

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-black px-6"
      >
        {/* Glow Circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.6, opacity: 0.18 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-white/20 blur-[120px]"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className={`${orbitron.className} text-white text-4xl sm:text-5xl md:text-6xl tracking-[0.35em] drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]`}
        >
          WELCOME
        </motion.h1>

        {/* Fun sub text */}
        <motion.p
          key={funText}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.7, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.4 }}
          className="text-white/70 mt-4 text-xs sm:text-sm md:text-base tracking-[0.18em] text-center"
        >
          {funText}
        </motion.p>

        {/* Loader Line */}
        <div className="relative w-44 sm:w-56 md:w-64 h-[3px] bg-white/20 mt-10 overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "160%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="absolute inset-y-0 w-1/3 bg-white rounded-full shadow-[0_0_12px_white]"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
