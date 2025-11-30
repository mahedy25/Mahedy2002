# Sanity Portfolio Dummy Data

This folder contains comprehensive dummy data for your Sanity portfolio database. The data is structured in NDJSON (Newline Delimited JSON) format, which is the standard format for Sanity data imports.

## 📦 What's Included

The following data files are available for import:

| File | Description | Records |
|------|-------------|---------|
| `profile.ndjson` | Main profile information | 1 profile |
| `profile-with-animation.ndjson` | Profile with animated headline feature | 1 profile |
| `skills.ndjson` | Technical skills and proficiencies | 15 skills |
| `experience.ndjson` | Work experience history | 4 positions |
| `education.ndjson` | Educational background | 2 degrees |
| `projects.ndjson` | Portfolio projects | 6 projects |
| `blog.ndjson` | Blog posts | 6 articles |
| `services.ndjson` | Services offered | 5 services |
| `achievements.ndjson` | Awards and achievements | 7 achievements |
| `certifications.ndjson` | Professional certifications | 5 certifications |
| `testimonials.ndjson` | Client testimonials | 6 testimonials |
| `siteSettings.ndjson` | Site configuration | 1 settings document |
| `contact.ndjson` | Sample contact submissions | 3 contacts |

**Total: 61 sample documents** ready to populate your portfolio!

## ⚠️ Important: Singleton Documents

Two documents are configured as **singletons** (only one instance allowed):
- **Profile** - Uses ID: `singleton-profile`
- **Site Settings** - Uses ID: `singleton-siteSettings`

These IDs match your `structure.ts` configuration and allow proper singleton behavior in Sanity Studio.

## 🚀 Quick Start - Import All Data

### Prerequisites

Before importing, ensure you have:

1. ✅ Sanity CLI installed globally (if not, run: `npm install -g @sanity/cli`)
2. ✅ Your environment variables set up (`.env` or `.env.local` file)
3. ✅ Your Sanity project is initialized and accessible

### Environment Variables

Make sure these variables are set in your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Method 1: Import All Data at Once (Recommended)

Import all data files in the correct order to handle references properly:

```bash
# Navigate to the Data folder
cd Data

# Import in order (skills first, then items that reference them)
sanity dataset import skills.ndjson production --replace
sanity dataset import profile.ndjson production --replace
sanity dataset import education.ndjson production --replace
sanity dataset import experience.ndjson production --replace
sanity dataset import projects.ndjson production --replace
sanity dataset import blog.ndjson production --replace
sanity dataset import services.ndjson production --replace
sanity dataset import achievements.ndjson production --replace
sanity dataset import certifications.ndjson production --replace
sanity dataset import testimonials.ndjson production --replace
sanity dataset import siteSettings.ndjson production --replace
sanity dataset import contact.ndjson production --replace
```

**Note:** Replace `production` with your dataset name if different (e.g., `development`, `staging`).

### Method 2: Import Using One Command

You can also use this one-liner to import all files sequentially:

```bash
# From the project root
cd Data && for file in skills.ndjson profile.ndjson education.ndjson experience.ndjson projects.ndjson blog.ndjson services.ndjson achievements.ndjson certifications.ndjson testimonials.ndjson siteSettings.ndjson contact.ndjson; do sanity dataset import $file production --replace; done
```

### Method 3: Import Specific Files Only

If you only want to import specific content types:

```bash
# From the Data folder
cd Data

# Import only skills and projects
sanity dataset import skills.ndjson production --replace
sanity dataset import projects.ndjson production --replace

# Or import only blog posts
sanity dataset import blog.ndjson production --replace
```

## 📋 Import Command Options

### Basic Import (Replace Mode)
```bash
sanity dataset import <filename>.ndjson <dataset-name> --replace
```
The `--replace` flag will overwrite documents with matching `_id` values.

### Import Without Replacing
```bash
sanity dataset import <filename>.ndjson <dataset-name>
```
This will skip documents that already exist (based on `_id`).

### Import to Different Dataset
```bash
# Import to development dataset
sanity dataset import skills.ndjson development --replace

# Import to staging dataset
sanity dataset import profile.ndjson staging --replace
```

### Missing Documents Mode
```bash
sanity dataset import <filename>.ndjson <dataset-name> --missing
```
Only import documents that don't exist in the dataset.

## 🔄 Order of Import (Important!)

The import order matters because some documents reference others. Follow this order:

1. **Skills** - Must be imported first (referenced by projects, experience, etc.)
2. **Profile** - Main profile data
3. **Education** - Educational background
4. **Experience** - Work history (references skills)
5. **Projects** - Portfolio projects (references skills)
6. **Blog** - Blog posts (references profile as author)
7. **Services** - Service offerings (references skills)
8. **Achievements** - Awards and recognitions
9. **Certifications** - Professional certifications (references skills)
10. **Testimonials** - Client testimonials (references projects)
11. **Site Settings** - Site configuration
12. **Contact** - Contact form submissions

## 🎨 Customizing the Data

### Before Importing

You can customize the dummy data before importing:

1. Open any `.ndjson` file in a text editor
2. Modify the values (name, email, descriptions, etc.)
3. Keep the structure intact (don't modify `_type`, `_id`, or reference structures)
4. Save and import

### Example: Updating Profile Data

Edit `profile.ndjson` and change:
```json
"firstName":"John" → "firstName":"YourName"
"email":"john.doe@example.com" → "email":"your.email@example.com"
```

### Animated Headline Feature

The `profile-with-animation.ndjson` file includes the new animated headline feature:
- **headlineStaticText**: "I build "
- **headlineAnimatedWords**: ["innovative web apps", "scalable solutions", "beautiful interfaces", "AI-powered tools"]
- **headlineAnimationDuration**: 3000ms

This creates a dynamic text-flipping animation in your hero section. See `ANIMATED-HEADLINE-GUIDE.md` for full documentation.

### Example: Updating Site Settings

Edit `siteSettings.ndjson` and change:
```json
"siteTitle":"John Doe - Developer" → "siteTitle":"Your Name - Developer"
"primaryColor":"#3B82F6" → "primaryColor":"#YourColor"
```

## 🖼️ Note About Images

The dummy data includes image fields but **no actual image files**. After importing, you'll need to:

1. Go to your Sanity Studio (usually at `http://localhost:3000/studio`)
2. Navigate to each document type
3. Upload images for:
   - Profile image
   - Project cover images
   - Blog featured images
   - Company logos
   - Skill icons
   - etc.

## 🧹 Cleaning Up / Starting Fresh

### Delete All Data from a Dataset
```bash
# ⚠️ WARNING: This deletes ALL documents in the dataset
sanity dataset delete production

# Create the dataset again
sanity dataset create production
```

### Delete Specific Document Types

Use the Sanity Studio Vision tool or API to delete specific types:

```groq
// In Vision tool, run this query to find documents
*[_type == "blog"]

// Then delete them manually or use the API
```

## 🔍 Verify Import Success

After importing, verify your data:

### Method 1: Using Sanity Studio
1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/studio`
3. Navigate through different document types to verify data

### Method 2: Using Vision (GROQ Playground)
1. Go to your Sanity Studio
2. Open the Vision tab
3. Run queries to verify:

```groq
// Count all documents
count(*[])

// Count specific type
count(*[_type == "project"])

// View all skills
*[_type == "skill"]{name, category, proficiency}

// View featured projects
*[_type == "project" && featured == true]{title, tagline}
```

## 📊 Data Statistics

After successful import, you should have:

- ✅ 1 complete profile with bio and contact info
- ✅ 15 diverse skills across multiple categories
- ✅ 4 work experiences with detailed descriptions
- ✅ 2 educational qualifications
- ✅ 6 portfolio projects with descriptions and tech stacks
- ✅ 6 blog posts across different categories
- ✅ 5 service offerings with pricing
- ✅ 7 achievements and awards
- ✅ 5 professional certifications
- ✅ 6 client testimonials
- ✅ 1 site settings configuration
- ✅ 3 sample contact submissions

## 🛠️ Troubleshooting

### Issue: "Command not found: sanity"

**Solution:** Install Sanity CLI globally
```bash
npm install -g @sanity/cli
```

### Issue: "Unable to find project"

**Solution:** Make sure your environment variables are set correctly
```bash
# Check your .env.local file has:
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Issue: "Authentication required"

**Solution:** Login to Sanity CLI
```bash
sanity login
```

### Issue: "Dataset not found"

**Solution:** Create the dataset first
```bash
sanity dataset create production
```

### Issue: References not working

**Solution:** Import files in the correct order (skills first, then documents that reference them)

### Issue: "Document validation failed"

**Solution:** Check your schema definitions match the data structure. Run:
```bash
npm run typegen
```

## 🎯 Next Steps After Import

1. **Upload Images**: Add real images to all documents with image fields
2. **Customize Content**: Update the dummy content with your actual information
3. **Test Your Frontend**: Verify that your Next.js app fetches and displays the data correctly
4. **Set References**: Check that all references (e.g., blog author, project technologies) are properly connected
5. **Publish Documents**: If using draft/publish workflow, publish the documents you want visible

## 📚 Additional Resources

- [Sanity CLI Documentation](https://www.sanity.io/docs/cli)
- [Sanity Import/Export Guide](https://www.sanity.io/docs/import-data)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)

## 💡 Tips

1. **Backup First**: Before importing to a production dataset, consider creating a backup
2. **Test in Development**: Import to a development dataset first to test
3. **Version Control**: Keep these data files in version control for team collaboration
4. **Customize Gradually**: Import base data, then customize piece by piece
5. **Use Vision**: The Vision tool is invaluable for testing queries and viewing data

## 🆘 Need Help?

If you encounter any issues:

1. Check the [Sanity Documentation](https://www.sanity.io/docs)
2. Visit [Sanity's Community Slack](https://slack.sanity.io/)
3. Review the error messages carefully - they usually indicate the exact problem
4. Ensure your schema definitions match the data structure

---

**Happy importing! 🚀**

Once imported, your Sanity Studio will be fully populated with professional-looking portfolio data that you can customize to match your actual experience and projects.

