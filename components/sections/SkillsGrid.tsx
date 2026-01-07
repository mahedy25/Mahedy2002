'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Skill {
  _id: string
  name: string
  category: string
  icon: string
}


export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
      }
    )
  }, [])

  return (
    <div
      ref={gridRef}
      className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'
    >
      {skills.map((skill) => {
        if (!skill.icon) return null

        return (
          <div
            key={skill._id}
            className='group flex flex-col items-center gap-3 rounded-xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg'
          >
            <div className='relative h-12 w-12 grayscale group-hover:grayscale-0 transition'>
              <Image
                src={skill.icon}
                alt={skill.name}
                fill
                className='object-contain'
              />
            </div>

            <span className='text-sm font-medium text-center'>
              {skill.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
