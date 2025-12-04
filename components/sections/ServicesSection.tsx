import { PortableText } from "@portabletext/react";
import { IconCheck } from "@tabler/icons-react";
import { Star } from "lucide-react";
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
const SERVICES_QUERY =
  defineQuery(`*[_type == "service"] | order(order asc, _createdAt desc){
  title,
  slug,
  icon,
  shortDescription,
  fullDescription,
  features,
  technologies[]->{name, category},
  deliverables,
  pricing,
  timeline,
  featured,
  order
}`);

export async function ServicesSection() {
  const { data: services } = await sanityFetch({ query: SERVICES_QUERY });

  if (!services || services.length === 0) {
    return null;
  }

  const formatPrice = (pricing: {
    startingPrice?: number;
    priceType?: string;
    description?: string;
  }) => {
    if (!pricing) return null;

    const { startingPrice, priceType, description } = pricing;

    const priceTypeLabels: Record<string, string> = {
      hourly: "/hour",
      project: "/project",
      monthly: "/month",
      custom: "",
    };

    if (priceType === "custom") {
      return <span className="text-primary font-semibold">Custom Quote</span>;
    }

    return (
      <div>
        {startingPrice && (
          <span className="text-2xl font-bold text-primary">
            ${startingPrice.toLocaleString()}
            {priceType && priceTypeLabels[priceType]}
          </span>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    );
  };

  // Separate featured and regular services
  const featured = services.filter((s) => s.featured);
  const regular = services.filter((s) => !s.featured);

  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-4`}>
  <EncryptedText
    text="Services"
    revealDelayMs={70}
    flipDelayMs={55}
    encryptedClassName="opacity-60"
    revealedClassName="text-foreground"
    splitAfter={8} // Splits after "Featured" so first part can have effect, adjust if needed
  />
</h2>

          <p className="text-xl text-muted-foreground">What I can do for you</p>
        </div>

        {/* Featured Services */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              Featured Services
            </h3>
            <div className="@container">
              <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8">
                {featured.map((service) => (
                  <div
                    key={service.slug?.current || service.title}
                    className="@container/card bg-card border-2 border-primary/20 rounded-lg p-6 @lg/card:p-8 hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    {service.icon && (
                      <div className="relative w-12 h-12 @md/card:w-16 @md/card:h-16 mb-4 @md/card:mb-6">
                        <Image
                          src={urlFor(service.icon).width(64).height(64).url()}
                          alt={service.title || "Service"}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    <h3 className="text-xl @md/card:text-2xl font-bold mb-3">
                      {service.title}
                    </h3>

                    {service.shortDescription && (
                      <p className="text-muted-foreground mb-4 text-base @md/card:text-lg">
                        {service.shortDescription}
                      </p>
                    )}

                    {service.fullDescription && (
                      <div className="prose prose-sm dark:prose-invert mb-6">
                        <PortableText value={service.fullDescription} />
                      </div>
                    )}

                    {service.features && service.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-sm @md/card:text-base">
                          Key Features:
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li
                              key={`${service.title}-feature-${idx}`}
                              className="flex items-start gap-2"
                            >
                              <IconCheck className="w-4 h-4 @md/card:w-5 @md/card:h-5 text-primary mt-0.5 shrink-0" />
                              <span className="text-muted-foreground text-sm @md/card:text-base">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 @xs/card:grid-cols-2 gap-4 mb-6 pt-4 border-t">
                      {service.pricing && (
                        <div>
                          <p className="text-xs @md/card:text-sm text-muted-foreground mb-1">
                            Pricing
                          </p>
                          {formatPrice(service.pricing)}
                        </div>
                      )}
                      {service.timeline && (
                        <div>
                          <p className="text-xs @md/card:text-sm text-muted-foreground mb-1">
                            Timeline
                          </p>
                          <p className="font-semibold text-sm @md/card:text-base">
                            {service.timeline}
                          </p>
                        </div>
                      )}
                    </div>

                    {service.technologies &&
                      service.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, idx) => {
                            const techData =
                              tech && typeof tech === "object" && "name" in tech
                                ? tech
                                : null;
                            return techData?.name ? (
                              <span
                                key={`${service.title}-tech-${idx}`}
                                className="px-2 py-1 @md/card:px-3 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {techData.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Regular Services */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h3 className="text-2xl font-bold mb-6">All Services</h3>
            )}
            <div className="@container">
              <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
                {regular.map((service) => (
                  <div
                    key={service.slug?.current || service.title}
                    className="@container/card bg-card border rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105 flex flex-col"
                  >
                    {service.icon && (
                      <div className="relative w-10 h-10 @md/card:w-12 @md/card:h-12 mb-4">
                        <Image
                          src={urlFor(service.icon).width(48).height(48).url()}
                          alt={service.title || "Service"}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    <h3 className="text-lg @md/card:text-xl font-bold mb-2">
                      {service.title}
                    </h3>

                    {service.shortDescription && (
                      <p className="text-muted-foreground mb-4 text-sm @md/card:text-base flex-1 line-clamp-3">
                        {service.shortDescription}
                      </p>
                    )}

                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-1 mb-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li
                            key={`${service.title}-feature-${idx}`}
                            className="flex items-start gap-2 text-xs @md/card:text-sm"
                          >
                            <IconCheck className="w-3.5 h-3.5 @md/card:w-4 @md/card:h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground line-clamp-2">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="pt-4 border-t space-y-2">
                      {service.pricing && (
                        <div className="text-xs @md/card:text-sm">
                          {formatPrice(service.pricing)}
                        </div>
                      )}
                      {service.timeline && (
                        <p className="text-xs @md/card:text-sm text-muted-foreground truncate">
                          ⏱️ {service.timeline}
                        </p>
                      )}
                    </div>
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