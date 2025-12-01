'use client'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'

export const LayoutTextFlip = ({
  text = 'Build Amazing',
  words = ['Landing Pages', 'Component Blocks', 'Page Sections', '3D Shaders'],
  duration = 3000,
  className,
}: {
  text: string
  words: string[]
  duration?: number
  className?: string
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [duration, words.length])

  return (
    <span className={cn('inline-flex flex-wrap items-center gap-2', className)}>
      <motion.span className='text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl'>
        {text}
      </motion.span>

      <motion.span
        layout
        className='relative w-fit overflow-hidden rounded-md border border-transparent bg-white px-4 py-2 font-sans text-2xl font-bold tracking-tight text-black shadow-sm ring shadow-black/10 ring-black/10 drop-shadow-lg md:text-4xl dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10'
      >
        {/* ✅ No first-render animation */}
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.span
            key={currentIndex}
            initial={{ y: -40, opacity: 0, filter: 'blur(6px)' }}
            animate={{
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
            }}
            exit={{
              y: 50,
              opacity: 0,
              filter: 'blur(6px)',
            }}
            transition={{ duration: 0.45 }}
            className='inline-block whitespace-nowrap'
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  )
}
