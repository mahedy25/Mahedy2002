// app/(portfolio)/projects/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { Orbitron } from "next/font/google";
import { sanityFetch } from "../../../../sanity/lib/live";
import { urlFor } from "../../../../sanity/lib/image";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

interface Technology {
  name: string | null;
  color?: string | null;
}

interface Project {
  title: string | null;
  tagline?: string | null;
  category?: "frontend" | "backend" | "full-stack" | "animations" | "other" | null;
  coverImage?: any | null;
  technologies?: Technology[] | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

const PROJECT_QUERY = defineQuery(`
  *[_type=="project" && slug.current==$slug][0]{
    title,
    tagline,
    category,
    liveUrl,
    githubUrl,
    coverImage,
    technologies[]->{name, color}
  }
`);

type PageProps = {
  params: Promise<{ slug: string }>; // Must await because of group routes
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) return <div>Project not found</div>;

  // Fetch project from Sanity
  const result = (await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  })) as { data: Project | null };

  const project = result.data;

  if (!project) return <div>Project not found</div>;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HERO SECTION */}
        <div className="space-y-4 text-center">
          {project.category && (
            <span className="text-primary text-sm uppercase tracking-[0.3em]">
              {project.category}
            </span>
          )}
          <h1 className={`${orbitron.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black`}>
            {project.title ?? "Untitled Project"}
          </h1>
          {project.tagline && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{project.tagline}</p>
          )}
        </div>

        {/* COVER IMAGE */}
        {project.coverImage && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={urlFor(project.coverImage).width(1200).url()}
              alt={project.title ?? "Project image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* TECH STACK */}
        {project.technologies?.length ? (
          <div>
            <h3 className={`${orbitron.className} text-xl mb-3`}>Built With</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md text-xs border bg-muted"
                >
                  {tech.name ?? "Unknown"}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${orbitron.className} px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition`}
            >
              Visit Website
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border hover:bg-accent transition"
            >
              GitHub Repo
            </Link>
          )}
        </div>

        {/* BACK NAV */}
        <div className="pt-20 text-center">
          <Link
            href="/#projects"
            className="text-sm text-muted-foreground hover:text-primary transition"
          >
            ← Back to Projects
          </Link>
        </div>

      </div>
    </section>
  );
}
