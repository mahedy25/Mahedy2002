import { defineQuery } from "next-sanity";

import { SkillsChart } from "./SkillsChart";
import { sanityFetch } from "../../sanity/lib/live";
import { Orbitron } from 'next/font/google'
import { EncryptedText } from '../ui/encrypted-text'
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
})

const SKILLS_QUERY =
  defineQuery(`*[_type == "skill"] | order(category asc, order asc){
  name,
  category,
  proficiency,
  percentage,
  yearsOfExperience,
  color
}`);

export async function SkillsSection() {
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-4`}>
  <EncryptedText
    text="My Skills"
    revealDelayMs={70}
    flipDelayMs={55}
    encryptedClassName="opacity-60"
    revealedClassName="text-foreground"
    splitAfter={8} // Splits after "Featured" so first part can have effect, adjust if needed
  />
</h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical proficiencies and tools I
            work with daily
          </p>
        </div>

        <SkillsChart skills={skills} />
      </div>
    </section>
  );
}