# GROQ Query Examples

After importing your data, use these GROQ queries in Sanity Vision or your frontend code to fetch and work with the data.

## 🔍 Vision Tool

To test these queries:
1. Go to your Sanity Studio
2. Click on the "Vision" tab (eye icon)
3. Paste any query below and click "Run Query" (or Ctrl/Cmd + Enter)

---

## 📊 Count & Statistics Queries

### Count all documents
```groq
count(*)
```

### Count documents by type
```groq
{
  "profile": count(*[_type == "profile"]),
  "skills": count(*[_type == "skill"]),
  "projects": count(*[_type == "project"]),
  "blog": count(*[_type == "blog"]),
  "experience": count(*[_type == "experience"]),
  "education": count(*[_type == "education"]),
  "services": count(*[_type == "service"]),
  "achievements": count(*[_type == "achievement"]),
  "certifications": count(*[_type == "certification"]),
  "testimonials": count(*[_type == "testimonial"])
}
```

---

## 👤 Profile Queries

### Get main profile
```groq
*[_type == "profile"][0]{
  firstName,
  lastName,
  headline,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage{
    asset->{url}
  }
}
```

### Get profile with full bio
```groq
*[_type == "profile"][0]{
  ...,
  fullBio[]{
    ...,
    children[]{...}
  }
}
```

---

## 💼 Skills Queries

### Get all skills
```groq
*[_type == "skill"] | order(order asc){
  name,
  category,
  proficiency,
  percentage,
  yearsOfExperience,
  featured,
  icon{asset->{url}}
}
```

### Get featured skills only
```groq
*[_type == "skill" && featured == true] | order(order asc){
  name,
  category,
  proficiency,
  percentage,
  color
}
```

### Get skills by category
```groq
*[_type == "skill" && category == "frontend"] | order(name asc){
  name,
  proficiency,
  percentage,
  yearsOfExperience
}
```

### Group skills by category
```groq
{
  "frontend": *[_type == "skill" && category == "frontend"] | order(order asc),
  "backend": *[_type == "skill" && category == "backend"] | order(order asc),
  "ai-ml": *[_type == "skill" && category == "ai-ml"] | order(order asc),
  "devops": *[_type == "skill" && category == "devops"] | order(order asc),
  "database": *[_type == "skill" && category == "database"] | order(order asc)
}
```

---

## 🏢 Experience Queries

### Get all work experience (newest first)
```groq
*[_type == "experience"] | order(startDate desc){
  company,
  position,
  employmentType,
  location,
  startDate,
  endDate,
  current,
  responsibilities,
  achievements,
  technologies[]->{name, category},
  companyLogo{asset->{url}},
  companyWebsite
}
```

### Get current position
```groq
*[_type == "experience" && current == true][0]{
  company,
  position,
  startDate,
  description,
  responsibilities,
  achievements
}
```

---

## 🎓 Education Queries

### Get all education (newest first)
```groq
*[_type == "education"] | order(endDate desc){
  institution,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
  current,
  gpa,
  description,
  achievements,
  logo{asset->{url}},
  website
}
```

---

## 🚀 Projects Queries

### Get all projects
```groq
*[_type == "project"] | order(order asc){
  title,
  slug,
  tagline,
  category,
  techStack,
  liveUrl,
  githubUrl,
  featured,
  startDate,
  endDate,
  coverImage{asset->{url}},
  technologies[]->{name, category, color}
}
```

### Get featured projects only
```groq
*[_type == "project" && featured == true] | order(order asc){
  title,
  tagline,
  description,
  techStack,
  liveUrl,
  githubUrl,
  coverImage{asset->{url}},
  achievements,
  metrics
}
```

### Get project by slug
```groq
*[_type == "project" && slug.current == "ai-powered-content-generator"][0]{
  ...,
  technologies[]->{name, category, proficiency},
  description[]{
    ...,
    children[]{...}
  }
}
```

### Get projects by category
```groq
*[_type == "project" && category == "ai-ml"]{
  title,
  tagline,
  techStack,
  liveUrl,
  coverImage{asset->{url}}
}
```

---

## 📝 Blog Queries

### Get all blog posts (newest first)
```groq
*[_type == "blog"] | order(publishedAt desc){
  title,
  slug,
  excerpt,
  category,
  tags,
  publishedAt,
  featured,
  readTime,
  featuredImage{asset->{url}},
  author->{firstName, lastName}
}
```

### Get featured blog posts
```groq
*[_type == "blog" && featured == true] | order(publishedAt desc){
  title,
  excerpt,
  category,
  tags,
  publishedAt,
  readTime,
  featuredImage{asset->{url}}
}
```

### Get blog post by slug with full content
```groq
*[_type == "blog" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    children[]{...},
    markDefs[]{...}
  },
  author->{
    firstName,
    lastName,
    profileImage{asset->{url}}
  },
  relatedPosts[]->{
    title,
    slug,
    excerpt,
    featuredImage{asset->{url}}
  }
}
```

### Get posts by category
```groq
*[_type == "blog" && category == "tutorial"] | order(publishedAt desc)[0...6]{
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  featuredImage{asset->{url}}
}
```

### Search blog posts by tag
```groq
*[_type == "blog" && "React" in tags] | order(publishedAt desc){
  title,
  slug,
  excerpt,
  tags,
  publishedAt
}
```

---

## 🛠️ Services Queries

### Get all services
```groq
*[_type == "service"] | order(order asc){
  title,
  slug,
  shortDescription,
  features,
  pricing,
  timeline,
  featured,
  icon{asset->{url}},
  technologies[]->{name, category}
}
```

### Get featured services
```groq
*[_type == "service" && featured == true] | order(order asc){
  title,
  shortDescription,
  features,
  pricing,
  icon{asset->{url}}
}
```

### Get service by slug with full details
```groq
*[_type == "service" && slug.current == $slug][0]{
  ...,
  fullDescription[]{
    ...,
    children[]{...}
  },
  technologies[]->{name, category, icon}
}
```

---

## 🏆 Achievements Queries

### Get all achievements (newest first)
```groq
*[_type == "achievement"] | order(date desc){
  title,
  type,
  issuer,
  date,
  description,
  url,
  featured,
  image{asset->{url}}
}
```

### Get featured achievements
```groq
*[_type == "achievement" && featured == true] | order(date desc){
  title,
  type,
  issuer,
  date,
  image{asset->{url}}
}
```

---

## 📜 Certifications Queries

### Get all certifications (newest first)
```groq
*[_type == "certification"] | order(issueDate desc){
  name,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  description,
  logo{asset->{url}},
  skills[]->{name, category}
}
```

### Get active certifications (not expired)
```groq
*[_type == "certification" && (expiryDate == null || expiryDate > now())] | order(issueDate desc){
  name,
  issuer,
  issueDate,
  expiryDate,
  credentialUrl,
  logo{asset->{url}}
}
```

---

## 💬 Testimonials Queries

### Get all testimonials
```groq
*[_type == "testimonial"] | order(order asc){
  name,
  position,
  company,
  testimonial,
  rating,
  date,
  featured,
  avatar{asset->{url}},
  companyLogo{asset->{url}},
  linkedinUrl,
  project->{title, slug}
}
```

### Get featured testimonials
```groq
*[_type == "testimonial" && featured == true] | order(order asc){
  name,
  position,
  company,
  testimonial,
  rating,
  avatar{asset->{url}}
}
```

---

## ⚙️ Site Settings Query

### Get site settings
```groq
*[_type == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  siteKeywords,
  siteLogo{asset->{url}},
  favicon{asset->{url}},
  ogImage{asset->{url}},
  primaryColor,
  secondaryColor,
  accentColor,
  ctaText,
  ctaUrl,
  heroHeadline,
  heroSubheadline,
  heroBackground{asset->{url}},
  showBlog,
  showServices,
  showTestimonials,
  footer
}
```

---

## 📧 Contact Queries

### Get all contact submissions (newest first)
```groq
*[_type == "contact"] | order(submittedAt desc){
  name,
  email,
  subject,
  message,
  company,
  phone,
  budget,
  timeline,
  submittedAt,
  status,
  priority
}
```

### Get unread contacts
```groq
*[_type == "contact" && status == "new"] | order(submittedAt desc){
  name,
  email,
  subject,
  message,
  submittedAt
}
```

### Get high priority contacts
```groq
*[_type == "contact" && priority == "high"] | order(submittedAt desc){
  name,
  email,
  subject,
  company,
  budget,
  status
}
```

---

## 🎯 Combined / Complex Queries

### Homepage data (everything you need for a homepage)
```groq
{
  "profile": *[_type == "profile"][0]{
    firstName,
    lastName,
    headline,
    shortBio,
    profileImage{asset->{url}},
    socialLinks
  },
  "featuredProjects": *[_type == "project" && featured == true] | order(order asc)[0...3]{
    title,
    tagline,
    techStack,
    liveUrl,
    githubUrl,
    coverImage{asset->{url}}
  },
  "featuredSkills": *[_type == "skill" && featured == true] | order(order asc){
    name,
    category,
    percentage,
    color
  },
  "recentBlogPosts": *[_type == "blog"] | order(publishedAt desc)[0...3]{
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    featuredImage{asset->{url}}
  },
  "testimonials": *[_type == "testimonial" && featured == true] | order(order asc){
    name,
    position,
    company,
    testimonial,
    rating,
    avatar{asset->{url}}
  },
  "siteSettings": *[_type == "siteSettings"][0]{
    heroHeadline,
    heroSubheadline,
    ctaText,
    ctaUrl
  }
}
```

### About page data
```groq
{
  "profile": *[_type == "profile"][0]{
    ...,
    fullBio[]{...},
    profileImage{asset->{url}}
  },
  "experience": *[_type == "experience"] | order(startDate desc){
    company,
    position,
    startDate,
    endDate,
    current,
    responsibilities,
    achievements,
    companyLogo{asset->{url}}
  },
  "education": *[_type == "education"] | order(endDate desc){
    institution,
    degree,
    fieldOfStudy,
    startDate,
    endDate,
    gpa,
    logo{asset->{url}}
  },
  "skills": *[_type == "skill"] | order(category asc, order asc){
    name,
    category,
    proficiency,
    percentage,
    icon{asset->{url}}
  },
  "certifications": *[_type == "certification"] | order(issueDate desc){
    name,
    issuer,
    issueDate,
    credentialUrl,
    logo{asset->{url}}
  }
}
```

### Portfolio page data
```groq
{
  "projects": *[_type == "project"] | order(order asc){
    title,
    slug,
    tagline,
    category,
    techStack,
    featured,
    liveUrl,
    githubUrl,
    coverImage{asset->{url}},
    startDate,
    endDate
  },
  "categories": array::unique(*[_type == "project"].category)
}
```

---

## 🔎 Search Query Example

### Search across multiple document types
```groq
*[
  _type in ["project", "blog", "service"] 
  && (
    title match "*AI*" 
    || tagline match "*AI*"
    || excerpt match "*AI*"
  )
]{
  _type,
  title,
  "slug": slug.current,
  "preview": select(
    _type == "project" => tagline,
    _type == "blog" => excerpt,
    _type == "service" => shortDescription
  )
}
```

---

## 💡 Pro Tips

1. **Use parameters** in your queries:
   ```groq
   *[_type == "blog" && slug.current == $slug][0]
   ```
   Then pass `{"slug": "your-slug"}` as params

2. **Optimize image queries** with image URL builder:
   ```groq
   image{
     asset->{
       _id,
       url,
       metadata{
         dimensions
       }
     }
   }
   ```

3. **Use projections** to get only what you need:
   ```groq
   *[_type == "project"]{
     title,
     slug,
     // only these fields
   }
   ```

4. **Count with filters**:
   ```groq
   count(*[_type == "blog" && featured == true])
   ```

5. **Use `coalesce()` for fallbacks**:
   ```groq
   {
     "image": coalesce(featuredImage.asset->url, "/default-image.jpg")
   }
   ```

---

## 📚 Resources

- [GROQ Documentation](https://www.sanity.io/docs/groq)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Vision Tool Guide](https://www.sanity.io/docs/the-vision-plugin)
- [GROQ Arcade (Practice)](https://www.sanity.io/docs/groq-arcade)

Happy querying! 🚀

