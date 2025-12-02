"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cinzel } from "next/font/google"

const cinzel =  Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel-std",
})

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2200) // loader duration
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-black"
      >
        {/* Brand Text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className={` ${cinzel.className} text-white text-4xl tracking-[0.45em]`}
        >
          Welcome
        </motion.h1>

        {/* Minimal Loader Line */}
        <div className="relative w-40 h-0.5 bg-white/20 mt-8 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="absolute inset-y-0 w-1/3 bg-white"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
