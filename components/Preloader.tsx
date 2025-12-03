"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel-std",
})

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2600) // slightly longer for smoothness
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-black"
      >
        {/* Glow Circle Behind Text */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 0.15 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute w-64 h-64 rounded-full bg-[#ffffff33] blur-3xl"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className={`${cinzel.className} text-white text-5xl tracking-[0.35em] drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]`}
        >
          WELCOME
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="text-white/60 mt-3 text-sm tracking-[0.25em]"
        >
          Initializing Experience...
        </motion.p>

        {/* Loader Line */}
        <div className="relative w-56 h-[3px] bg-white/20 mt-10 overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "150%" }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="absolute inset-y-0 w-1/3 bg-white rounded-full shadow-[0_0_15px_white]"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
