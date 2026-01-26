# Claude Code Configuration

This is the configuration file for Claude Code in the Altinn Studio docs project.

## Project Overview
This is a Hugo-based documentation site for Altinn products like Altinn Studio, Altinn Authorization etc. The project uses Hugo with a custom theme to generate static documentation.

## Development Commands
- **Start development server**: `hugo server --navigateToChanged -D` (the `-D` flag shows draft content)
- **Build site**: `hugo --minify`
- **Clean build**: `rm -rf public && hugo --minify`

## Project Structure
- `content/` - Documentation content in Markdown
- `static/` - Static assets
- `layouts/` - Hugo templates
- `themes/` - Hugo theme
- `config.toml` - Hugo configuration
- `public/` - Generated site output

## Key Features
- Multi-language support (Norwegian Bokmål and English).
- Mermaid diagrams enabled
- GitHub integration for editing
- Auto-deployment via GitHub Actions

## Notes for Claude
- This is a documentation project, not an application
- Content changes should be made in the `content/` directory
- The site uses Hugo static site generator
- Always test changes with `hugo server -D` before committing

## Workflow
**IMPORTANT: Always follow this workflow when working on tasks:**

1. **Create a new branch** for each task/feature
   - Use descriptive branch names (e.g., `feature/add-authentication-docs`, `fix/broken-links`)
   - Branch from `master` unless otherwise specified

2. **Make changes** in the feature branch
   - Test changes locally with `hugo server -D` to view draft content
   - Ensure all changes are working as expected

3. **Commit changes** with clear, descriptive commit messages

4. **Merge back to master** when task is complete
   - Create a pull request if working in a team environment
   - Or merge directly if appropriate

## Draft Content
- Many articles in v10 are marked with `draft: true` in the frontmatter
- The `-D` flag in the development server command ensures draft content is visible during development
- Draft content will not be published in production builds

---

# Documentation Guidelines

## Documentation Framework
**When writing new articles or language-washing guides and explanations, check [Diátaxis](https://diataxis.fr/) for guidance on documentation structure and approach.**

Diátaxis helps distinguish between:
- **Tutorials** (learning-oriented)
- **How-to guides** (task-oriented)
- **Reference** (information-oriented)
- **Explanation** (understanding-oriented)

## Target Audience
**Non-technical service owners**: Write for service owners in public organizations who have or plan services in Altinn (e.g., processes like data, data→signing, data→signing→payment, or more complex flows).

**They have professional and business responsibility, not technical responsibility**. They:
- collaborate with developers/vendors and Digdir/Altinn
- need to understand consequences for users, responsibility, quality, risk, cost, and legal requirements (especially universal design/accessibility)

**Assume limited technical competence**:
- Avoid technical jargon
- When technical terms must be used (e.g., data→signing, Camunda, process.bpmn, custom frontend, eFormidling, Fiks arkiv), explain them briefly in everyday language and relate them to what it means for the service owner and users

**Focus on**:
- What the Altinn platform offers "out of the box"
- What the service owner is responsible for (content, process choices, attachments/PDF, testing, accessibility)
- Which choices are safe standard options and which require extra follow-up/testing (complex processes, Camunda, custom frontend)
- Rather provide examples of questions the service owner can ask developers than technical details

## Language and Style
- Use conservative Bokmål ("listen", "hentet" - not "lista", "henta")
- Main headings: Infinitive ("Opprette tjenesten")
- Step-by-step subheadings: Imperative ("Opprett ny tjeneste")
- Avoid passive constructions
- Avoid "av + -ing" constructions
- Links should preferably be complete sentences
- Numbers under 12: Write with letters in running text ("fire filer", "tre alternativer")
  - Exception: Statistics, tables, or when the number is particularly important ("maks 10 filer tillatt")

## Formatting
- GUI elements: Bold formatting ("Klikk på **Lagre**")
- Mouse actions: "klikk"
- Keyboard actions: "trykk"
- Choices from lists: "velg"
- URLs: Soft line break before URL

## Heading Rules

**Rule for imperative vs. infinitive headings:**

- **Imperative** (command form): Used when the heading comes **right before a procedure** (numbered list).
  - Example: "Lag en ny type" (followed directly by steps 1, 2, 3...)
  - Example: "Rediger en type" (followed directly by steps 1, 2, 3...)
  - Example: "Åpne datamodelleringsverktøyet" (followed directly by steps 1, 2, 3...)

- **Infinitive** (base form): Used when the heading is at a higher level, or when there is **introductory text/paragraph before the procedure**.
  - Example: "Laste opp en datamodell" (introductory text: "Hvis du allerede har en datamodell...")
  - Example: "Generere og laste ned modellfiler" (introductory text: "Når datamodellen er klar:")
  - Example: "Velge modell fra nedtrekkslisten" (explanatory text: "Nedtrekkslisten viser...")

**Article headings** always use infinitive (e.g., "Lage en datamodell").

**Descriptive headings** use "Slik..." (e.g., "Slik lager og redigerer du datamodeller").

## List Rules (Bullet Points)

**⚠️ ALWAYS CHECK LISTS WHEN LANGUAGE-WASHING - This is a common source of errors!**

**HOW TO DETERMINE TYPE 1 vs TYPE 2:**
- Read the introduction + first bullet point aloud
- If it makes sense as one continuous sentence → **Type 1**
- If the point stands alone as its own sentence → **Type 2**

---

**Type 1: Bullets grammatically continue the introduction**

**Characteristics:**
- The bullets complete the sentence that the introduction starts
- You can read introduction + bullet as one continuous sentence
- **NO colon** after the introduction
- **Lowercase initial letter** in each bullet
- **NO period** at the end of bullets

**Test:** Read "introduction + bullet" aloud - does it make sense as one sentence?

Examples:
```
✓ CORRECT:
Du trenger en datamodell til å

- samle inn data fra brukere
- lagre data fra tjenesten
- validere informasjon

✓ CORRECT:
Bruk minimum lagringstid når

- du må behandle eller kontrollere innsendte data
- du har juridiske krav om oppbevaring
- du trenger tid til å arkivere data

✗ WRONG (has colon and capital letters):
Du trenger en datamodell til å:

- Samle inn data fra brukere.
- Lagre data fra tjenesten.
```

---

**Type 2: Bullets are independent sentences**

**Characteristics:**
- Each bullet is a complete, independent sentence
- Bullets cannot be read as continuation of the introduction
- **Colon** (or period) after the introduction
- **Capital initial letter** in each bullet
- **Period** at the end of each bullet

**Test:** Can the bullet stand alone as its own sentence?

Examples:
```
✓ CORRECT:
Slik gjør du det:

- Gi brukeren en tydelig inngang til tjenesten.
- Unngå mellomliggende sider.
- Gjør det klart at brukeren kommer inn i Altinn-tjenesten.

✓ CORRECT:
**I lagringsperioden:**

- Brukere kan **ikke** slette sine egne innsendte data.
- Tjenesteeier kan **ikke** slette data.
- Data er beskyttet mot utilsiktet sletting.

✗ WRONG (missing colon, capital letters, and periods):
Slik gjør du det

- gi brukeren en tydelig inngang til tjenesten
- unngå mellomliggende sider
```

---

**Numbered lists vs. bullet points:**
- **Numbered lists**: Only for procedures/steps that must be followed in order
- **Bullet points**: For alternatives, choices, or points without a specific order

Example numbered list (procedure):
```
Slik logger du inn:

1. Åpne Altinn Studio.
2. Klikk på **Logg inn**.
3. Skriv inn brukernavn og passord.
```

Example bullet point list (alternatives):
```
Du kan lage datamodeller på to måter:

- I Altinn Studio
- Last opp en XSD-fil
```

## Hugo Page Bundles - CRITICAL UNDERSTANDING

**When migrating an article from v8 to v10 that contains images:**

Hugo has two types of content organization:
- **Branch bundle**: A folder with `_index.md` (can have subpages)
- **Leaf bundle**: A folder with `index.md` (no subpages, but can have resources like images)

**If the file is named something other than `_index.md`, it MUST be in its own folder as `index.md` for images to work!**

1. **Check the filename:**
   - If the file is named `_index.nb.md` → images can be in the same folder
   - If the file is named something else (e.g., `vedlegg.nb.md`) → SEE STEP 2

2. **Create page bundle structure for non-_index files:**
   ```bash
   # Instead of:
   datamodell/
     vedlegg.nb.md
     bilde1.png
     bilde2.png

   # You must have:
   datamodell/
     vedlegg/
       index.nb.md    # (content from vedlegg.nb.md)
       bilde1.png
       bilde2.png
   ```

3. **Move files:**
   ```bash
   mkdir vedlegg
   mv vedlegg.nb.md vedlegg/index.nb.md
   mv bilde1.png bilde2.png vedlegg/
   ```

4. **Update image references:**
   - Use `./` before the image filename
   - Format: `![Alt text](./filename.png "Title")`
   - Not `../` or just `filename.png`

5. **Example of correct reference:**
   ```markdown
   ![Oversikt over datamodell-repo](./datamodels-dashboard.png "Oversikt over datamodell-repo")
   ```

6. **Test that images display:**
   - Hugo rebuilds automatically when files are moved
   - Check in browser (or hard refresh with Cmd+Shift+R)
   - Check browser console (F12) for any 404 errors

**WHY this is important:**
- Hugo can only find resources (images) that are part of a "page bundle"
- `_index.md` files automatically form a branch bundle with their folder
- Regular markdown files MUST be `index.md` in their own folder to form a leaf bundle
- Without correct bundle structure, Hugo won't find images, even with correct `./` reference

## Quality Checklist

**IMPORTANT: Always add needsReview tag**

When washing/migrating files from v8 to v10:
- ALWAYS add `tags: [needsReview]` in frontmatter
- This is critical for keeping track of what's ready for review
- Applies to all new or language-washed files

**IMPORTANT: Always check links and images**

When washing/migrating/editing files:
- **Check all links**: Verify that links work and point to the right place
  - Internal links should use relref shortcode: `{{< relref "path/to/file" >}}`
  - External links should be complete and working
  - Verify that link text is meaningful and descriptive
- **Check all images**: Verify that images exist and display correctly
  - Image paths should use `./` for images in the same page bundle
  - Verify that page bundle structure is correct (see PROCEDURE above)
  - Test that images actually display in the browser
  - Check that alt text is descriptive
- **Test locally**: Use Hugo Server to verify before committing

## Structure
- Alphabetize topics in each folder

## Metadata
- Always add `tags: [needsReview]` in frontmatter

## Sources
- Klarspråk: https://språkrådet.no/
- Tegnsetting og språkbruk: https://korrekturavdelingen.no/
- Documentation framework: https://diataxis.fr/
