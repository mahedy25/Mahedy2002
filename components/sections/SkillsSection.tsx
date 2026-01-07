import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../../sanity/lib/live'
import { Orbitron } from 'next/font/google'
import { EncryptedText } from '../ui/encrypted-text'
import { SkillsGrid } from './SkillsGrid'


const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
})

const SKILLS_QUERY = defineQuery(`
  *[_type == "skill" && defined(icon)] | order(category asc, name asc){
    _id,
    name,
    category,
    "icon": icon.asset->url
  }
`)



export async function SkillsSection() {
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY })

  if (!skills?.length) return null

  return (
    <section id='skills' className='py-20 px-6'>
      <div className='container mx-auto max-w-7xl'>
        <div className='text-center mb-14'>
          <h2
            className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-4`}
          >
            <EncryptedText text='My Skills' />
          </h2>

          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Tools and technologies I use to build modern, high-quality web
            experiences.
          </p>
        </div>

        <SkillsGrid skills={skills} />
      </div>
    </section>
  )
}
