import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import { Orbitron } from "next/font/google";
import { EncryptedText } from "../ui/encrypted-text";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-orbitron",
});

interface Technology {
  name: string | null;
  color?: string | null;
}

interface Project {
  title: string | null;
  slug?: { current: string } | null;
  tagline?: string | null;
  category?: string | null;
  coverImage?: any | null;
  demoVideo?: { asset?: { url?: string } } | null;
  technologies?: Technology[] | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured?: boolean;
  order?: number;
}

const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && featured == true] | order(order asc)[0...6]{
    title,
    slug,
    tagline,
    category,
    liveUrl,
    githubUrl,
    coverImage,
    demoVideo{asset->{url}},
    technologies[]->{name, color}
  }
`);

export async function ProjectsSection() {
  const result = await sanityFetch({ query: PROJECTS_QUERY }) as { data: Project[] };
  const projects = result.data;

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="cursor-pointer py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-4`}>
            <EncryptedText
              text="Featured Projects"
              revealDelayMs={70}
              flipDelayMs={55}
              encryptedClassName="opacity-60"
              revealedClassName="text-[#C41E3A]"
              splitAfter={8}
            />
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>

        {/* PROJECT GRID */}
        <div className="@container">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">

            {projects.map((project) => {
              if (!project.slug?.current) return null;

              return (
                <div
                  key={project.slug.current}
                  className="@container/card group relative bg-card border rounded-lg overflow-hidden
                             transition-all duration-300
                             hover:shadow-[0_0_30px_rgba(196,30,58,0.6)]
                             hover:border-[#C41E3A]"
                >

                  {/* CARD LINK OVERLAY (case study navigation) */}
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="absolute inset-0 z-1"
                    aria-label={`Open case study for ${project.title}`}
                  />

                  {/* MEDIA */}
                  <div className="relative z-2 aspect-video overflow-hidden bg-muted rounded-t-lg">
                    {project.demoVideo?.asset?.url ? (
                      <video
                        src={project.demoVideo.asset.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    ) : (
                      project.coverImage && (
                        <Image
                          src={urlFor(project.coverImage).width(600).height(400).url()}
                          alt={project.title ?? "Project image"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
                        />
                      )
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-2 p-4 @md/card:p-6 space-y-3 @md/card:space-y-4">

                    <div>
                      {project.category && (
                        <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-full bg-primary/10 text-primary">
                          {project.category}
                        </span>
                      )}

                      <h3 className="text-lg @md/card:text-xl font-semibold mb-2 line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-xs @md/card:text-sm line-clamp-2">
                        {project.tagline ?? ""}
                      </p>
                    </div>

                    {/* TECH STACK */}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1.5 @md/card:gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span
                            key={`${project.slug!.current}-tech-${i}`}
                            className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted"
                          >
                            {tech.name}
                          </span>
                        ))}

                        {project.technologies.length > 4 && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-muted">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* CTA BUTTONS */}
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="flex gap-3 pt-3">

                        {project.liveUrl && (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            className={`${orbitron.className}
                              z-3 text-xs px-3 py-1.5 rounded-md border bg-card
                              transition-all
                              hover:border-[#C41E3A]
                              hover:text-[#C41E3A]
                              hover:shadow-[0_0_18px_rgba(196,30,58,0.6)]
                            `}
                          >
                            Live ↗
                          </Link>
                        )}

                        {project.githubUrl && (
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            className={`${orbitron.className}
                              z-3 text-xs px-3 py-1.5 rounded-md border bg-card
                              transition-all
                              hover:border-[#C41E3A]
                              hover:text-[#C41E3A]
                              hover:shadow-[0_0_18px_rgba(196,30,58,0.6)]
                            `}
                          >
                            GitHub ↗
                          </Link>
                        )}

                      </div>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
