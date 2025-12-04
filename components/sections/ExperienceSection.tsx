import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import { Orbitron } from 'next/font/google'
import { EncryptedText } from '../ui/encrypted-text'
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
})
const EXPERIENCE_QUERY =
  defineQuery(`*[_type == "experience"] | order(startDate desc){
  company,
  position,
  employmentType,
  location,
  startDate,
  endDate,
  current,
  description,
  responsibilities,
  achievements,
  technologies[]->{name, category},
  companyLogo,
  companyWebsite
}`);

export async function ExperienceSection() {
  const { data: experiences } = await sanityFetch({ query: EXPERIENCE_QUERY });

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-4`}>
  <EncryptedText
    text="Work Experience"
    revealDelayMs={70}
    flipDelayMs={55}
    encryptedClassName="opacity-60"
    revealedClassName="text-foreground"
    splitAfter={8} // Splits after "Featured" so first part can have effect, adjust if needed
  />
</h2>

          <p className="text-xl text-muted-foreground">
            My professional journey
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.position}-${exp.startDate}`}
              className="relative pl-8 pb-8 border-l-2 border-muted last:border-l-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />

              <div className="@container/card bg-card border rounded-lg p-4 @md/card:p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col @md/card:flex-row @md/card:items-start gap-4 mb-4">
                  {exp.companyLogo && (
                    <div className="relative w-12 h-12 @md/card:w-16 @md/card:h-16 rounded-lg overflow-hidden border shrink-0">
                      <Image
                        src={urlFor(exp.companyLogo).width(64).height(64).url()}
                        alt={`${exp.company} company logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl @md/card:text-2xl font-semibold line-clamp-2">
                      {exp.position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <p className="text-base @md/card:text-lg text-primary font-medium truncate">
                        {exp.company}
                      </p>
                      {exp.employmentType && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-xs @md/card:text-sm text-muted-foreground">
                            {exp.employmentType}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs @md/card:text-sm text-muted-foreground">
                      <span>
                        {exp.startDate && formatDate(exp.startDate)} -{" "}
                        {exp.current
                          ? "Present"
                          : exp.endDate
                            ? formatDate(exp.endDate)
                            : "N/A"}
                      </span>
                      {exp.location && (
                        <>
                          <span>•</span>
                          <span className="truncate">{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <div className="text-muted-foreground mb-4 text-sm @md/card:text-base">
                    <PortableText value={exp.description} />
                  </div>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm @md/card:text-base">
                      Key Responsibilities:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs @md/card:text-sm">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={`${exp.company}-resp-${idx}`}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm @md/card:text-base">
                      Achievements:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs @md/card:text-sm">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={`${exp.company}-achievement-${idx}`}>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 @md/card:gap-2 mt-4">
                    {exp.technologies.map((tech, techIdx) => {
                      const techData =
                        tech && typeof tech === "object" && "name" in tech
                          ? tech
                          : null;
                      return techData?.name ? (
                        <span
                          key={`${exp.company}-tech-${techIdx}`}
                          className="px-2 py-0.5 @md/card:px-3 @md/card:py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {techData.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}