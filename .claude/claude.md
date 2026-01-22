# Claude Code Configuration

This is the configuration file for Claude Code in the Altinn Studio docs project.

## Project Overview
This is a Hugo-based documentation site for Altinn products like Altinn Studio, Altinn Authorization etc. The project uses Hugo with a custom theme to generate static documentation.

## Development Commands
- **Start development server**: `hugo server --navigateToChanged`
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
- Always test changes with `hugo server` before committing
- **v8 to v10 Migration**: See `V8_TO_V10_MIGRATION_TODO.md` in this directory for tracking which v8 content needs to be migrated to v10. Update this file when you find v8 links that need migration.

## Work in Progress
Track ongoing work and files being edited here. Update this section as work progresses.

### Current files
- `content/altinn-studio/v10/plan-a-service/design/` - Reorganized design section (2025-01-18)
  - Renamed from `retningslinjer` to `design`
  - Removed duplicate `design/guidelines/` folder
  - Moved `insight/`, `prototype/`, `usertest/` into `design/`
  - Updated `design/tone-of-voice/_index.nb.md` with new text length recommendations
  - Alphabetized all design section items (weight: 1-10)
- Note: Design team will review all content in this section to evaluate structure, add new content, and remove outdated material

### Next session work area
- **START HERE**: `content/altinn-studio/v10/manage-a-service/` - Administration/forvaltning section (2025-01-18)
  - Copied three topics from v8/guides/administration/:
    - `access-management/` (Tilgangsstyring)
    - `maintainance/` (Vedlikehold)
    - `monitor-and-instrument/` (Overvåking og instrumentering)
  - TODO: Review and update content for v10
  - TODO: Add Norwegian plain language review
  - TODO: Add tags [needsReview, translate-to-english]

### Component documentation
- **Updated (2025-01-18)**: Created new component structure based on Altinn Studio GUI
  - Location: `plan-a-service/design/components/`
  - **42 components** organized in 8 categories (matching GUI exactly)
  - Old outdated list: `plan-a-service/design/components-old/` (hidden from navigation)
  - Component categories: Skjema, Tekst, Flervalg, Informasjon, Knapper, Vedlegg, Gruppering, Avansert
  - Created placeholder files for 3 components as examples (input, panel, checkboxes)
  - Created `_template.md` for consistent placeholder structure
  - All components tagged: [needsReview, translate-to-english, add-content]
- Key corrections from GUI:
  - "Informativ melding" = `Panel` (not Alert)
  - "Avmerkingsbokser" (not "Avkrysningsbokser")
  - No Audio component (removed from GUI)
- TODO: Design team to create content for remaining 39 component pages
- TODO: Copy relevant content from v8 documentation where applicable
- TODO: Verify technical details with current Altinn Studio version

## Standard Documentation Procedures

### Always Remember
- **Add review tag**: Always add `tags: [needsReview]` to frontmatter when creating or translating files

### Norwegian Plain Language (Klarspråk)
- Follow guidelines from https://sprakradet.no/klarsprak/
- Use conservative bokmål (e.g., "listen" and "hentet", not "lista" and "henta")
- Check punctuation and spelling using Korrekturavdelingen (https://www.korrekturavdelingen.no/)
- **Sentence length**: Aim for under 25 words per sentence to make the text easier to digest and understand
- **Paragraph length**: Use 2–4 sentences per paragraph

### Writing Style and Terminology
- **GUI references**: Use bold formatting for GUI elements. Example: "Klikk på **Lagre og lukk**"
- **Mouse actions**: Use "klikk" for mouse clicks
- **Keyboard actions**: Use "trykk" for keyboard actions
- **Selections**: Use "velg" when choosing from lists or multiple options
- **Navigation**: Use "gå til" (not "naviger til") for instructions about navigating to different parts of the UI
- **Lists**: Use numbered lists ONLY when users must perform tasks in a specific order. If order doesn't matter (requirements, features, options, considerations), use bullet points
- **Konsekvent vs konsistent**: Use "konsekvent" (not "konsistent") in everyday contexts when describing consistent behavior, design, or language. "Konsistent" is only appropriate in technical/academic contexts about logical coherence. See: https://sprakradet.no/spraksporsmal-og-svar/konsekvent-og-konsistent/
- **Bullet point formatting** (from https://sprakradet.no/klarsprak/sprak-i-lover-og-forskrifter/skriverad/struktur-i-lover-og-forskrifter/punktlister/):
  - **If bullet points continue the introductory sentence**: No colon after introduction, lowercase first letter, no period at end
    - Example: "Innganger til skjema bør derfor" followed by "gjøre det tydelig..." and "la brukeren slippe..."
  - **If bullet points are complete independent sentences**: Colon after introduction is OK, capitalize first letter, period at end of each point
    - Example: "Følg disse stegene:" followed by "Last ned filen." and "Installer programmet."

### Headings in Norwegian
- **Main headings**: Use infinitive form of verb. Example: "Opprette tjenesten"
- **Step-by-step subheadings**: Use imperative form of verb. Example: "Opprett ny tjeneste"
- **"How to" style headings**: Use "Slik" + present tense verb. Examples: "Slik viser du betalingsinformasjon", "Slik setter du opp kvittering"

### URLs in Documentation
- Add a soft line break before URLs so they start on a new line

### Content Structure
- Follow Diátaxis framework (https://diataxis.fr/) for overall content principles
- Especially important for:
  - Reference documentation (term explanations)
  - Tutorials and guides

### English Translation
- Translate to British English (organisation, authorise, whilst, etc.)
- **Style guides**: Follow Oxford Style Guide and Guardian Style Guide for British English conventions
- **Headings in English**: Use sentence case - only capitalise the first word and proper nouns. Examples:
  - ✅ Correct: "Understand what a multi-app solution is"
  - ❌ Wrong: "Understand What a Multi-App Solution Is"
  - ✅ Correct: "Integrate the app with Maskinporten"
  - ❌ Wrong: "Integrate the App with Maskinporten"
- **Important**: Since the product (Altinn Studio) is not available in English, keep all GUI element references in Norwegian when translating
- Use "end user" (not "end-user") throughout
- **Bullet points in English** (Oxford/Guardian style):
  - Use lowercase after bullet point unless starting with proper noun or complete sentence
  - No full stop at end of bullet points unless they are complete sentences
  - Be consistent within each list