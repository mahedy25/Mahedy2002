import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { Orbitron } from "next/font/google";
import { sanityFetch } from "../../../../sanity/lib/live";
import { urlFor } from "../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import VideoPlayer from "../../../../components/VideoPlayer";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

interface Technology {
  name: string | null;
}

interface Project {
  title: string | null;
  tagline?: string | null;
  category?: string | null;
  coverImage?: any | null;
  demoVideo?: { asset?: { url?: string } } | null;
  technologies?: Technology[] | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
slug?: { current: string } | null;
  overview?: any[];
  problem?: string | null;
  solution?: string | null;
  features?: string[] | null;
  results?: string | null;
  gallery?: any[] | null;
}

const PROJECT_QUERY = defineQuery(`
  *[_type=="project" && slug.current==$slug][0]{
    title,
    tagline,
    category,
    liveUrl,
    githubUrl,
    coverImage,
    demoVideo{asset->{url}},
    technologies[]->{name},

    overview,
    problem,
    solution,
    features,
    results,
    gallery
  }
`);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const result = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  }) as { data: Project | null };

  const project = result.data;

  if (!project) return <div>Project not found</div>;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HERO */}
        <div className="space-y-4 text-center">
          {project.category && (
            <span className="text-primary uppercase tracking-[0.3em] text-sm">
              {project.category}
            </span>
          )}

          <h1 className={`${orbitron.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black`}>
            {project.title}
          </h1>

          {project.tagline && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {project.tagline}
            </p>
          )}
        </div>

        {/* COVER OR VIDEO */}
<div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
  {project.demoVideo?.asset?.url ? (
    <VideoPlayer
      videoUrl={project.demoVideo.asset.url}
      id={`video-${project.slug?.current}`}
    />
  ) : (
    project.coverImage && (
      <Image
        src={urlFor(project.coverImage).width(1200).url()}
        alt={project.title ?? "Project screenshot"}
        fill
        className="object-cover"
        priority
      />
    )
  )}
</div>


        {/* TECH STACK */}
        {project.technologies?.length && (
          <div>
            <h3 className={`${orbitron.className} text-xl mb-3`}>Built With</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 border rounded-md text-xs bg-muted">
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* OVERVIEW */}
        {project.overview && (
          <div>
            <h3 className={`${orbitron.className} text-xl mb-3`}>Project Overview</h3>
            <div className="prose dark:prose-invert max-w-none">
              <PortableText value={project.overview} />
            </div>
          </div>
        )}

        {/* PROBLEM + SOLUTION */}
        <div className="grid gap-8 md:grid-cols-2">
          {project.problem && (
            <div>
              <h3 className={`${orbitron.className} text-xl mb-2`}>The Challenge</h3>
              <p className="text-muted-foreground">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <h3 className={`${orbitron.className} text-xl mb-2`}>The Solution</h3>
              <p className="text-muted-foreground">{project.solution}</p>
            </div>
          )}
        </div>

        {/* FEATURES */}
        {project.features?.length && (
          <div>
            <h3 className={`${orbitron.className} text-xl mb-3`}>Key Features</h3>
            <ul className="grid gap-3 md:grid-cols-2">
              {project.features.map((item, i) => (
                <li key={i} className="p-3 border rounded-lg bg-muted">
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* RESULTS */}
        {project.results && (
          <div>
            <h3 className={`${orbitron.className} text-xl mb-3`}>Results</h3>
            <p className="text-muted-foreground">{project.results}</p>
          </div>
        )}

        {/* GALLERY */}
        {project.gallery?.length && (
          <div>
            <h3 className={`${orbitron.className} text-xl mb-4`}>Project Gallery</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={urlFor(img).width(800).url()}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className={`${orbitron.className} px-6 py-3 rounded-lg border transition hover:bg-[#C41E3A]`}
            >
              Visit Website
            </Link>
          )}

          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="px-6 py-3 rounded-lg border hover:bg-accent transition"
            >
              GitHub Repo
            </Link>
          )}
        </div>

        {/* BACK */}
        <div className="pt-20 text-center">
          <Link
            href="/#projects"
            className={`${orbitron.className} px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:text-white hover:bg-[#C41E3A] transition font-bold `}
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
