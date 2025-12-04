import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../../sanity/lib/live'
import { Orbitron } from 'next/font/google'
import { EncryptedText } from '../ui/encrypted-text'
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
})

const ABOUT_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`)

export async function AboutSection() {
  const { data: profile } = await sanityFetch({ query: ABOUT_QUERY })

  if (!profile) {
    return null
  }

  return (
    <section id='about' className='py-20 px-6'>


      <div className='container mx-auto max-w-4xl'>
        <div className='text-center mb-12'>
          <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-4`}>
  <EncryptedText
    text="About Me"
    revealDelayMs={70}
    flipDelayMs={55}
    encryptedClassName="opacity-60"
    revealedClassName="text-foreground"
    splitAfter={8} // Splits after "Featured" so first part can have effect, adjust if needed
    />
</h2>

          <p className='text-xl text-muted-foreground'>Get to know me better</p>
        </div>

        <div className='prose prose-lg dark:prose-invert max-w-none'>
          {profile.fullBio && (
            <PortableText
            value={profile.fullBio}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className='text-muted-foreground leading-relaxed mb-4'>
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className='text-3xl font-bold mt-8 mb-4'>{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className='text-2xl font-semibold mt-6 mb-3'>
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className='border-l-4 border-primary pl-4 italic my-4'>
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className='font-semibold text-foreground'>
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className='italic'>{children}</em>,
                  link: ({ children, value }) => {
                    const href = value?.href || ''
                    const isExternal = href.startsWith('http')
                    return (
                      <Link
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className='text-primary hover:underline'
                      >
                        {children}
                      </Link>
                    )
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className='list-disc list-inside space-y-2 mb-4 text-muted-foreground'>
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className='list-decimal list-inside space-y-2 mb-4 text-muted-foreground'>
                      {children}
                    </ol>
                  ),
                },
              }}
              />
            )}
        </div>

        {/* Stats from CMS */}
        {profile.stats && profile.stats.length > 0 && (
          <div className='@container mt-12 pt-12 border-t'>
            <div className='grid grid-cols-2 @lg:grid-cols-4 gap-6'>
              {profile.stats.map((stat, idx) => (
                <div
                key={`${stat.label}-${idx}`}
                className='@container/stat text-center'
                >
                  <div className='text-3xl @md/stat:text-4xl font-bold text-primary mb-2'>
                    {stat.value}
                  </div>
                  <div className='text-xs @md/stat:text-sm text-muted-foreground'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </section>
  ) 
}
