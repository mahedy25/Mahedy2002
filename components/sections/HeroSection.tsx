import Link from 'next/link'
import { defineQuery } from 'next-sanity'

import { ProfileImage } from '../ProfileImage'
import { sanityFetch } from '../../sanity/lib/live'
import { BackgroundRippleEffect } from '../ui/background-ripple-effect'
import { LayoutTextFlip } from '../ui/layout-text-flip'
import { urlFor } from '../../sanity/lib/image'
import { EncryptedText } from '../ui/encrypted-text'
import { Orbitron } from 'next/font/google'
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
})
const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  headline,
  headlineStaticText,
  headlineAnimatedWords,
  headlineAnimationDuration,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage
}`)

export async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY })

  if (!profile) {
    return null
  }

  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden'
    >
      {/* Background Ripple Effect */}
      <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />

      <div className='relative z-10 container mx-auto max-w-6xl'>
        <div className='@container'>
          <div className='grid grid-cols-1 @3xl:grid-cols-2 gap-8 @lg:gap-12 items-center'>
            {/* Text Content */}
            <div className='  @container/hero space-y-4 @md/hero:space-y-6'>
              <h1
  className={`${orbitron.className}
    relative text-[#C41E3A]
    flex flex-wrap items-center sm:items-start justify-center sm:justify-start gap-x-2
    font-bold tracking-tight leading-[1.05]
    text-center sm:text-start
    text-[clamp(1.6rem,6vw,2.4rem)]
    @md/hero:text-[clamp(2.3rem,6vw,3rem)]
  `}
>
  {`${profile.firstName ?? ''} ${profile.lastName ?? ''}`}
</h1>

              {profile.headlineStaticText &&
              profile.headlineAnimatedWords &&
              profile.headlineAnimatedWords.length > 0 ? (
                <LayoutTextFlip
                  text={profile.headlineStaticText}
                  words={profile.headlineAnimatedWords}
                  duration={profile.headlineAnimationDuration || 3000}
                  className='
      text-xl
      @md/hero:text-2xl
      @lg/hero:text-3xl
      text-muted-foreground
      font-medium

      flex flex-col
      sm:flex-row
      sm:flex-wrap
      sm:gap-2

      leading-tight
      min-h-14 sm:min-h-0
    '
                />
              ) : (
                <p className='text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground font-medium'>
                  {profile.headline}
                </p>
              )}

              <p className='text-base @md/hero:text-lg text-muted-foreground leading-relaxed'>
                {profile.shortBio}
              </p>

              {profile.socialLinks && (
  <div className="flex flex-wrap gap-3 @md/hero:gap-4 pt-4">
    
    {profile.socialLinks.github && (
      <Link
        href={profile.socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 @md/hero:w-12 @md/hero:h-12 rounded-lg border hover:bg-accent transition-colors"
      >
        <Github className="w-5 h-5 @md/hero:w-6 @md/hero:h-6" />

        <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition text-xs bg-muted px-2 py-1 rounded-md whitespace-nowrap">
          GitHub
        </span>
      </Link>
    )}

    {profile.socialLinks.linkedin && (
      <Link
        href={profile.socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 @md/hero:w-12 @md/hero:h-12 rounded-lg border hover:bg-accent transition-colors"
      >
        <Linkedin className="w-5 h-5 @md/hero:w-6 @md/hero:h-6" />

        <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition text-xs bg-muted px-2 py-1 rounded-md whitespace-nowrap">
          LinkedIn
        </span>
      </Link>
    )}

    {profile.socialLinks.twitter && (
      <Link
        href={profile.socialLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 @md/hero:w-12 @md/hero:h-12 rounded-lg border hover:bg-accent transition-colors"
      >
        <Twitter className="w-5 h-5 @md/hero:w-6 @md/hero:h-6" />

        <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition text-xs bg-muted px-2 py-1 rounded-md whitespace-nowrap">
          Twitter
        </span>
      </Link>
    )}

    {profile.socialLinks.instagram && (
      <Link
        href={profile.socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 @md/hero:w-12 @md/hero:h-12 rounded-lg border hover:bg-accent transition-colors"
      >
        <Instagram className="w-5 h-5 @md/hero:w-6 @md/hero:h-6" />

        <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition text-xs bg-muted px-2 py-1 rounded-md whitespace-nowrap">
          Instagram
        </span>
      </Link>
    )}

  </div>
)}

              <div className='flex flex-wrap gap-4 @md/hero:gap-6 pt-4 text-xs @md/hero:text-sm text-muted-foreground'>
                {profile.email && (
                  <div className='flex items-center gap-2'>
                    <span>📧</span>
                    <span className='truncate'>{profile.email}</span>
                  </div>
                )}
                {profile.location && (
                  <div className='flex items-center gap-2'>
                    <span>📍</span>
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.availability && (
                  <div className='flex items-center gap-2'>
                    <span>✅</span>
                    <span>{profile.availability}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image */}
            {profile.profileImage && (
              <ProfileImage
                imageUrl={urlFor(profile.profileImage)
                  .width(600)
                  .height(600)
                  .url()}
                firstName={profile.firstName || ''}
                lastName={profile.lastName || ''}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
