import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  technologies[]->{name, category, color}
}`);

export async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>

        <div className="@container">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.slug?.current}
                className="@container/card group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image */}
                {project.coverImage && (
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={urlFor(project.coverImage)
                        .width(600)
                        .height(400)
                        .url()}
                      alt={project.title || "Project image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Glass overlay that fades on hover */}
                    <div className="hidden lg:block absolute inset-0 bg-background/40 backdrop-blur-[2px] group-hover:opacity-0 transition-opacity duration-300" />
                  </div>
                )}

                {/* Project Content */}
                <div className="p-4 @md/card:p-6 space-y-3 @md/card:space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {project.category && (
                        <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-full bg-primary/10 text-primary">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg @md/card:text-xl font-semibold mb-2 line-clamp-2">
                      {project.title || "Untitled Project"}
                    </h3>
                    <p className="text-muted-foreground text-xs @md/card:text-sm line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 @md/card:gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => {
                        const techData =
                          tech && typeof tech === "object" && "name" in tech
                            ? tech
                            : null;
                        return techData?.name ? (
                          <span
                            key={`${project.slug?.current}-tech-${idx}`}
                            className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted"
                          >
                            {techData.name}
                          </span>
                        ) : null;
                      })}
                      {project.technologies.length > 4 && (
                        <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col @xs/card:flex-row gap-2 @xs/card:gap-3 pt-2">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 @md/card:px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs @md/card:text-sm"
                      >
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 @md/card:px-4 rounded-lg border hover:bg-accent transition-colors text-xs @md/card:text-sm text-center"
                      >
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}