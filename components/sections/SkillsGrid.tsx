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
      { opacity: 0, y: 28, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
      }
    )
  }, [])

  return (
    <div
      ref={gridRef}
      className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7'
    >
      {skills.map((skill) => {
        if (!skill.icon) return null

        return (
          <div
            key={skill._id}
            className='
              group relative flex flex-col items-center gap-3 rounded-2xl p-6
              transition-all duration-300 ease-out
              hover:-translate-y-1 hover:scale-[1.02]

              /* LIGHT MODE */
              bg-[#f5f7fa] ring-1 ring-[#d0d5dd]
              hover:ring-[#2563eb]
              hover:shadow-[0_0_22px_-8px_rgba(37,99,235,0.35)]

              /* DARK MODE */
              dark:bg-[#0e1117] dark:ring-[#1f2430]
              dark:hover:ring-[#3dd5f3]
              dark:hover:shadow-[0_0_26px_-6px_rgba(61,213,243,0.35)]
            '
          >
            {/* ICON PLATE */}
            <div
              className='
                relative h-12 w-12 flex items-center justify-center rounded-xl
                transition-all duration-300 ease-out
                group-hover:scale-110

                /* LIGHT MODE */
                bg-[#eef1f6] ring-1 ring-[#d0d5dd]
                group-hover:ring-[#2563eb]
                group-hover:shadow-[0_0_12px_rgba(37,99,235,0.35)]

                /* DARK MODE */
                dark:bg-[#ffffff] dark:ring-[#2a2f38]
                dark:group-hover:ring-[#3dd5f3]
                dark:group-hover:shadow-[0_0_14px_rgba(61,213,243,0.45)]
              '
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                fill
                className='object-contain p-1'
              />
            </div>

            {/* SKILL NAME */}
            <span
              className='
                text-sm font-medium text-center transition-colors duration-300

                /* LIGHT MODE */
                text-[#1e293b]
                group-hover:text-[#2563eb]

                /* DARK MODE */
                dark:text-[#d6d9e0]
                dark:group-hover:text-[#3dd5f3]
              '
            >
              {skill.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
