import Link from "next/link";
import { defineQuery } from "next-sanity";


import { ProfileImage } from "../ProfileImage";
import { sanityFetch } from "../../sanity/lib/live";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import { LayoutTextFlip } from "../ui/layout-text-flip";
import { urlFor } from "../../sanity/lib/image";


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
}`);

export async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Background Ripple Effect */}
      <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="@container">
          <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 @lg:gap-12 items-center">
            {/* Text Content */}
            <div className="@container/hero space-y-4 @md/hero:space-y-6">
              <h1 className="text-4xl @md/hero:text-5xl @lg/hero:text-7xl font-bold tracking-tight">
                {profile.firstName}{" "}
                <span className="text-primary">{profile.lastName}</span>
              </h1>
              {profile.headlineStaticText &&
              profile.headlineAnimatedWords &&
              profile.headlineAnimatedWords.length > 0 ? (
                <LayoutTextFlip
                  text={profile.headlineStaticText}
                  words={profile.headlineAnimatedWords}
                  duration={profile.headlineAnimationDuration || 3000}
                  className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground font-medium"
                />
              ) : (
                <p className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground font-medium">
                  {profile.headline}
                </p>
              )}
              <p className="text-base @md/hero:text-lg text-muted-foreground leading-relaxed">
                {profile.shortBio}
              </p>

              {profile.socialLinks && (
                <div className="flex flex-wrap gap-3 @md/hero:gap-4 pt-4">
                  {profile.socialLinks.github && (
                    <Link
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base"
                    >
                      GitHub
                    </Link>
                  )}
                  {profile.socialLinks.linkedin && (
                    <Link
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base"
                    >
                      LinkedIn
                    </Link>
                  )}
                  {profile.socialLinks.twitter && (
                    <Link
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base"
                    >
                      Twitter
                    </Link>
                  )}
                  {profile.socialLinks.website && (
                    <Link
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base"
                    >
                      Website
                    </Link>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-4 @md/hero:gap-6 pt-4 text-xs @md/hero:text-sm text-muted-foreground">
                {profile.email && (
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span className="truncate">{profile.email}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.availability && (
                  <div className="flex items-center gap-2">
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
                firstName={profile.firstName || ""}
                lastName={profile.lastName || ""}
              />
            )} 
          </div>
        </div>
      </div>
    </section>
  );
}
