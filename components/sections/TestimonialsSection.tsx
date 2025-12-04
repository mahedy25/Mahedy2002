import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { Orbitron } from 'next/font/google'
import { EncryptedText } from '../ui/encrypted-text'
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
})
const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && featured == true] | order(order asc){
  name,
  position,
  company,
  testimonial,
  rating,
  date,
  avatar,
  companyLogo,
  linkedinUrl
}`);

export async function TestimonialsSection() {
  const { data: testimonials } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
  });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Map Sanity testimonials to AnimatedTestimonials format
  const formattedTestimonials = testimonials.map((testimonial) => ({
    quote: testimonial.testimonial || "",
    name: testimonial.name || "Anonymous",
    designation: testimonial.company
      ? `${testimonial.position} at ${testimonial.company}`
      : testimonial.position || "",
    // Use avatar for the main image
    src: testimonial.avatar
      ? urlFor(testimonial.avatar).width(500).height(500).url()
      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
    // Pass company logo separately to show next to name
    companyLogo: testimonial.companyLogo
      ? urlFor(testimonial.companyLogo).width(32).height(32).url()
      : undefined,
  }));

  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-4`}>
  <EncryptedText
    text="Testimonials"
    revealDelayMs={70}
    flipDelayMs={55}
    encryptedClassName="opacity-60"
    revealedClassName="text-foreground"
    splitAfter={8} // Splits after "Featured" so first part can have effect, adjust if needed
  />
</h2>

          <p className="text-xl text-muted-foreground">
            What people say about working with me
          </p>
        </div>

        <AnimatedTestimonials
          testimonials={formattedTestimonials}
          autoplay={true}
        />
      </div>
    </section>
  );
}