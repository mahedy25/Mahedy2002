'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

type EncryptedTextProps = {
  text: string
  className?: string
  revealDelayMs?: number
  charset?: string
  flipDelayMs?: number
  encryptedClassName?: string
  revealedClassName?: string
  splitAfter?: number
}

const DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?'

function generateRandomCharacter(charset: string) {
  return charset[Math.floor(Math.random() * charset.length)]
}

function generateGibberishPreservingSpaces(original: string, charset: string): string {
  if (!original) return ''
  return original
    .split('')
    .map((c) => (c === ' ' ? ' ' : generateRandomCharacter(charset)))
    .join('')
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
  splitAfter,
}) => {
  const ref = useRef<HTMLSpanElement>(null)

  const [revealCount, setRevealCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const scrambleCharsRef = useRef<string[]>([])
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef(0)
  const lastFlipTimeRef = useRef(0)

  const stopAnimation = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  // Generate random characters client-side
  useEffect(() => {
    scrambleCharsRef.current = generateGibberishPreservingSpaces(text, charset).split('')
  }, [text, charset])

  const startAnimation = useCallback(() => {
    stopAnimation()

    scrambleCharsRef.current = generateGibberishPreservingSpaces(text, charset).split('')

    startTimeRef.current = performance.now()
    lastFlipTimeRef.current = startTimeRef.current
    setRevealCount(0)

    const update = (now: number) => {
      const elapsed = now - startTimeRef.current
      const totalLength = text.length

      const currentReveal = Math.min(
        totalLength,
        Math.floor(elapsed / Math.max(1, revealDelayMs))
      )

      setRevealCount(currentReveal)

      if (currentReveal >= totalLength) return

      const sinceFlip = now - lastFlipTimeRef.current

      if (sinceFlip >= Math.max(0, flipDelayMs)) {
        for (let i = currentReveal; i < totalLength; i++) {
          scrambleCharsRef.current[i] =
            text[i] === ' ' ? ' ' : generateRandomCharacter(charset)
        }
        lastFlipTimeRef.current = now
      }

      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
  }, [text, charset, revealDelayMs, flipDelayMs])

  useEffect(() => stopAnimation, [])

  // ✅ Automatic animation when visible
  useEffect(() => {
    if (!ref.current || hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          startAnimation()
        }
      },
      { threshold: 0.5 } // 50% visibility
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [startAnimation, hasAnimated])

  if (!text) return null

  return (
    <motion.span
      ref={ref}
      className={cn(className, 'cursor-pointer')}
      onMouseEnter={startAnimation}
    >
      {text.split('').map((char, index) => {
        const isRevealed = index < revealCount

        const displayChar = isRevealed
          ? char
          : char === ' '
          ? ' '
          : scrambleCharsRef.current[index] ?? char

        const isSecondPart =
          typeof splitAfter === 'number' && index > splitAfter

        return (
          <span
            key={index}
            className={cn(
              isRevealed ? revealedClassName : encryptedClassName,
              isSecondPart && 'text-primary'
            )}
          >
            {displayChar}
          </span>
        )
      })}
    </motion.span>
  )
}
