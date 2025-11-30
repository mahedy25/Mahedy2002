import { IconExternalLink, IconStar } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";


const ACHIEVEMENTS_QUERY =
  defineQuery(`*[_type == "achievement"] | order(date desc){
  title,
  type,
  issuer,
  date,
  description,
  image,
  url,
  featured,
  order
}`);

export async function AchievementsSection() {
  const { data: achievements } = await sanityFetch({
    query: ACHIEVEMENTS_QUERY,
  });

  if (!achievements || achievements.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getTypeColor = (type: string | null | undefined) => {
    if (!type) return "bg-gray-500/10 text-gray-500";
    const colors: Record<string, string> = {
      award: "bg-yellow-500/10 text-yellow-500",
      hackathon: "bg-purple-500/10 text-purple-500",
      publication: "bg-blue-500/10 text-blue-500",
      speaking: "bg-green-500/10 text-green-500",
      "open-source": "bg-orange-500/10 text-orange-500",
      milestone: "bg-pink-500/10 text-pink-500",
      recognition: "bg-cyan-500/10 text-cyan-500",
      other: "bg-gray-500/10 text-gray-500",
    };
    return colors[type] || colors.other;
  };

  const getTypeLabel = (type: string | null | undefined) => {
    if (!type) return "Achievement";
    const labels: Record<string, string> = {
      award: "Award",
      hackathon: "Hackathon Win",
      publication: "Publication",
      speaking: "Speaking",
      "open-source": "Open Source",
      milestone: "Milestone",
      recognition: "Recognition",
      other: "Other",
    };
    return labels[type] || "Achievement";
  };

  // Separate featured and regular achievements
  const featured = achievements.filter((a) => a.featured);
  const regular = achievements.filter((a) => !a.featured);

  return (
    <section id="achievements" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Achievements & Awards
          </h2>
          <p className="text-xl text-muted-foreground">
            Milestones and recognitions
          </p>
        </div>

        {/* Featured Achievements */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <IconStar className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              Featured Achievements
            </h3>
            <div className="@container">
              <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-6">
                {featured.map((achievement) => (
                  <div
                    key={`${achievement.title}-${achievement.date}`}
                    className="@container/card bg-card border-2 border-primary/20 rounded-lg p-6 hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    {achievement.image && (
                      <div className="relative w-full h-32 @md/card:h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(achievement.image)
                            .width(400)
                            .height(200)
                            .url()}
                          alt={achievement.title || "Achievement"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-col @xs/card:flex-row @xs/card:items-center gap-2 mb-3">
                      {achievement.type && (
                        <span
                          className={`px-2.5 py-1 text-xs rounded-full font-medium ${getTypeColor(
                            achievement.type,
                          )}`}
                        >
                          {getTypeLabel(achievement.type)}
                        </span>
                      )}
                      {achievement.date && (
                        <span className="text-xs @md/card:text-sm text-muted-foreground">
                          {formatDate(achievement.date)}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg @md/card:text-xl font-semibold mb-2">
                      {achievement.title}
                    </h4>
                    {achievement.issuer && (
                      <p className="text-primary font-medium mb-3 text-sm @md/card:text-base truncate">
                        {achievement.issuer}
                      </p>
                    )}
                    {achievement.description && (
                      <p className="text-muted-foreground mb-4 text-sm @md/card:text-base line-clamp-3">
                        {achievement.description}
                      </p>
                    )}

                    {achievement.url && (
                      <Link
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs @md/card:text-sm text-primary hover:underline"
                      >
                        Learn More
                        <IconExternalLink className="w-3.5 h-3.5 @md/card:w-4 @md/card:h-4" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Regular Achievements */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h3 className="text-2xl font-bold mb-6">All Achievements</h3>
            )}
            <div className="@container">
              <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
                {regular.map((achievement) => (
                  <div
                    key={`${achievement.title}-${achievement.date}`}
                    className="@container/card bg-card border rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105 flex flex-col"
                  >
                    {achievement.image && (
                      <div className="relative w-full h-24 @md/card:h-32 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(achievement.image)
                            .width(300)
                            .height(128)
                            .url()}
                          alt={achievement.title || "Achievement"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {achievement.type && (
                          <span
                            className={`px-2 py-0.5 @md/card:py-1 text-xs rounded-full font-medium ${getTypeColor(
                              achievement.type,
                            )}`}
                          >
                            {getTypeLabel(achievement.type)}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base @md/card:text-lg font-semibold mb-2 line-clamp-2">
                        {achievement.title}
                      </h4>
                      {achievement.issuer && (
                        <p className="text-primary font-medium mb-2 text-xs @md/card:text-sm truncate">
                          {achievement.issuer}
                        </p>
                      )}
                      {achievement.date && (
                        <p className="text-xs @md/card:text-sm text-muted-foreground mb-3">
                          {formatDate(achievement.date)}
                        </p>
                      )}
                      {achievement.description && (
                        <p className="text-xs @md/card:text-sm text-muted-foreground line-clamp-3">
                          {achievement.description}
                        </p>
                      )}
                    </div>

                    {achievement.url && (
                      <Link
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs @md/card:text-sm text-primary hover:underline mt-4 pt-4 border-t"
                      >
                        Learn More
                        <IconExternalLink className="w-3.5 h-3.5 @md/card:w-4 @md/card:h-4" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}