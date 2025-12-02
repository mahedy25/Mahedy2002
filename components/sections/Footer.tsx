import Link from "next/link"
import { defineQuery } from "next-sanity"

import { sanityFetch } from "../../sanity/lib/live"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-orbitron",
})

const FOOTER_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  email,
  socialLinks
}`)

export async function Footer() {
  const { data: profile } = await sanityFetch({ query: FOOTER_QUERY })

  if (!profile) return null

  const fullName = `${profile.firstName ?? ""} ${profile.lastName ?? ""}`

  return (
    <footer className="relative border-t bg-background/70 backdrop-blur">
      <div className="container mx-auto max-w-6xl px-6 py-10">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col text-center md:text-left gap-1">
            <h3
              className={`${orbitron.className} text-lg tracking-wide`}
            >
              {fullName}
            </h3>

            <p className="text-xs text-muted-foreground tracking-wider">
              Portfolio & Personal Website
            </p>
          </div>

          {/* Links */}
          {profile.socialLinks && (
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm">

              {Object.entries(profile.socialLinks).map(([key, value]) =>
                value ? (
                  <Link
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-muted-foreground transition-colors
                      hover:text-foreground
                      after:absolute after:left-0 after:-bottom-1 after:h-px
                      after:w-0 after:bg-current after:transition-all
                      hover:after:w-full"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-border" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">

          <span>
            © {new Date().getFullYear()} {fullName}. All rights reserved.
          </span>

          {profile.email && (
            <Link
              href={`mailto:${profile.email}`}
              className="hover:text-foreground transition-colors"
            >
              {profile.email}
            </Link>
          )}
        </div>

      </div>
    </footer>
  )
}
