import Link from 'next/link'
import { defineQuery } from 'next-sanity'

import { ContactForm } from './ContactForm'
import { sanityFetch } from '../../sanity/lib/live'
import WorldMapClient from '../ui/WorldMapClient'
const CHATTROGRAM = { lat: 22.3475, lng: 91.8123 }

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`)

export async function ContactSection() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY })

  if (!profile) {
    return null
  }

  return (
    <section id='contact' className='py-20 px-6 pb-40 bg-muted/30'>
      <WorldMapClient
        dots={[
          // --- Asia ---
          { start: { lat: 28.6139, lng: 77.209 }, end: CHATTROGRAM }, // New Delhi → Chattogram
          { start: { lat: 25.2769, lng: 55.2962 }, end: CHATTROGRAM }, // Dubai → Chattogram
          { start: { lat: 35.6895, lng: 139.6917 }, end: CHATTROGRAM }, // Tokyo → Chattogram
          { start: { lat: 1.3521, lng: 103.8198 }, end: CHATTROGRAM }, // Singapore → Chattogram
          { start: { lat: 39.9042, lng: 116.4074 }, end: CHATTROGRAM }, // Beijing → Chattogram

          // --- Europe ---
          { start: { lat: 51.5074, lng: -0.1278 }, end: CHATTROGRAM }, // London → Chattogram
          { start: { lat: 48.8566, lng: 2.3522 }, end: CHATTROGRAM }, // Paris → Chattogram
          { start: { lat: 41.9028, lng: 12.4964 }, end: CHATTROGRAM }, // Rome → Chattogram

          // --- Africa ---
          { start: { lat: -1.2921, lng: 36.8219 }, end: CHATTROGRAM }, // Nairobi → Chattogram
          { start: { lat: 30.0444, lng: 31.2357 }, end: CHATTROGRAM }, // Cairo → Chattogram

          // --- North America ---
          { start: { lat: 40.7128, lng: -74.006 }, end: CHATTROGRAM }, // New York → Chattogram
          { start: { lat: 34.0522, lng: -118.2437 }, end: CHATTROGRAM }, // Los Angeles → Chattogram
          { start: { lat: 49.2827, lng: -123.1207 }, end: CHATTROGRAM }, // Vancouver → Chattogram

          // --- South America ---
          { start: { lat: -23.5505, lng: -46.6333 }, end: CHATTROGRAM }, // São Paulo → Chattogram
          { start: { lat: -34.6037, lng: -58.3816 }, end: CHATTROGRAM }, // Buenos Aires → Chattogram

          // --- Oceania ---
          { start: { lat: -33.8688, lng: 151.2093 }, end: CHATTROGRAM }, // Sydney → Chattogram
        ]}
      />

      <div className='container mx-auto max-w-4xl'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl mt-4 md:text-5xl font-bold mb-4'>
            Get In Touch
          </h2>
          <p className='text-xl text-muted-foreground'>
            Wherever you are in the world, let&apos;s work together on your next
            project.
          </p>
        </div>

        <div className='@container'>
          <div className='grid grid-cols-1 @3xl:grid-cols-2 gap-8'>
            {/* Contact Info */}
            <div className='@container/info space-y-6'>
              <h3 className='text-xl @md/info:text-2xl font-semibold mb-6'>
                Contact Information
              </h3>

              {profile.email && (
                <div className='flex items-start gap-3 @md/info:gap-4'>
                  <div className='w-10 h-10 @md/info:w-12 @md/info:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                    <span className='text-xl @md/info:text-2xl'>📧</span>
                  </div>
                  <div className='min-w-0'>
                    <h4 className='font-semibold mb-1 text-sm @md/info:text-base'>
                      Email
                    </h4>
                    <Link
                      href={`mailto:${profile.email}`}
                      className='text-muted-foreground hover:text-primary transition-colors text-xs @md/info:text-sm truncate block'
                    >
                      {profile.email}
                    </Link>
                  </div>
                </div>
              )}

              {profile.phone && (
                <div className='flex items-start gap-3 @md/info:gap-4'>
                  <div className='w-10 h-10 @md/info:w-12 @md/info:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                    <span className='text-xl @md/info:text-2xl'>📱</span>
                  </div>
                  <div className='min-w-0'>
                    <h4 className='font-semibold mb-1 text-sm @md/info:text-base'>
                      Phone
                    </h4>
                    <Link
                      href={`tel:${profile.phone}`}
                      className='text-muted-foreground hover:text-primary transition-colors text-xs @md/info:text-sm'
                    >
                      {profile.phone}
                    </Link>
                  </div>
                </div>
              )}

              {profile.location && (
                <div className='flex items-start gap-3 @md/info:gap-4'>
                  <div className='w-10 h-10 @md/info:w-12 @md/info:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                    <span className='text-xl @md/info:text-2xl'>📍</span>
                  </div>
                  <div className='min-w-0'>
                    <h4 className='font-semibold mb-1 text-sm @md/info:text-base'>
                      Location
                    </h4>
                    <p className='text-muted-foreground text-xs @md/info:text-sm'>
                      {profile.location}
                    </p>
                  </div>
                </div>
              )}

              {profile.socialLinks && (
                <div className='pt-6'>
                  <h4 className='font-semibold mb-4 text-sm @md/info:text-base'>
                    Follow Me
                  </h4>
                  <div className='flex flex-wrap gap-2 @md/info:gap-3'>
                    {profile.socialLinks.github && (
                      <Link
                        href={profile.socialLinks.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm'
                      >
                        GitHub
                      </Link>
                    )}
                    {profile.socialLinks.linkedin && (
                      <Link
                        href={profile.socialLinks.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm'
                      >
                        LinkedIn
                      </Link>
                    )}
                    {profile.socialLinks.twitter && (
                      <Link
                        href={profile.socialLinks.twitter}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm'
                      >
                        Twitter
                      </Link>
                    )}
                    {profile.socialLinks.website && (
                      <Link
                        href={profile.socialLinks.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm'
                      >
                        Website
                      </Link>
                    )}
                    {profile.socialLinks.medium && (
                      <Link
                        href={profile.socialLinks.medium}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm'
                      >
                        Medium
                      </Link>
                    )}
                    {profile.socialLinks.devto && (
                      <Link
                        href={profile.socialLinks.devto}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm'
                      >
                        Dev.to
                      </Link>
                    )}
                    {profile.socialLinks.youtube && (
                      <Link
                        href={profile.socialLinks.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-lg border hover:bg-accent transition-colors text-xs @md/info:text-sm'
                      >
                        YouTube
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
