'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
})

// Fun rotating developer messages
const funTexts = [
  'Brewing fresh code…',
  'Finalizing the pixels…',
  'Fine-tuning interactions…',
  'Optimizing performance…',
  'Loading creativity…',
  'Assembling modern web magic…',
]

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [funText, setFunText] = useState(funTexts[0])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Faster text switching (feels more alive)
    const interval = setInterval(() => {
      setFunText(funTexts[Math.floor(Math.random() * funTexts.length)])
    }, 400)

    // Minimum display time (fast)
    const minTimer = setTimeout(() => {
      handleFinish()
    }, 1500)

    // Finish when page loads (no unnecessary delay)
    const handleLoad = () => {
      handleFinish()
    }

    const handleFinish = () => {
      setIsVisible(false)
      setTimeout(onFinish, 400) // allow exit animation
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearInterval(interval)
      clearTimeout(minTimer)
      window.removeEventListener('load', handleLoad)
    }
  }, [onFinish])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }} // faster exit
          className='fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black px-6'
        >
          {/* Glow Circle (faster + smoother) */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-white/20 blur-[100px]'
          />

          {/* Title (snappy animation) */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`${orbitron.className} text-white text-4xl sm:text-5xl md:text-6xl tracking-[0.35em] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
          >
            WELCOME
          </motion.h1>

          {/* Fun sub text */}
          <motion.p
            key={funText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className='text-white/70 mt-4 text-xs sm:text-sm md:text-base tracking-[0.18em] text-center'
          >
            {funText}
          </motion.p>

          {/* Loader Line (faster + smoother loop) */}
          <div className='relative w-44 sm:w-56 md:w-64 h-[3px] bg-white/20 mt-10 overflow-hidden rounded-full'>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '140%' }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              className='absolute inset-y-0 w-1/3 bg-white rounded-full shadow-[0_0_10px_white]'
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
