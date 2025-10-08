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

## Standard Documentation Procedures

### Always Remember
- **Add review tag**: Always add `tags: [needsReview]` to frontmatter when creating or translating files

### Norwegian Plain Language (Klarspråk)
- Follow guidelines from https://sprakradet.no/klarsprak/
- Use conservative bokmål (e.g., "listen" and "hentet", not "lista" and "henta")
- Check punctuation and spelling using Korrekturavdelingen (https://www.korrekturavdelingen.no/)

### Writing Style and Terminology
- **GUI references**: Use bold formatting for GUI elements. Example: "Klikk på **Lagre og lukk**"
- **Mouse actions**: Use "klikk" for mouse clicks
- **Keyboard actions**: Use "trykk" for keyboard actions
- **Selections**: Use "velg" when choosing from lists or multiple options

### Headings in Norwegian
- **Main headings**: Use infinitive form of verb. Example: "Opprette tjenesten"
- **Step-by-step subheadings**: Use imperative form of verb. Example: "Opprett ny tjeneste"

### URLs in Documentation
- Add a soft line break before URLs so they start on a new line

### Content Structure
- Follow Diátaxis framework (https://diataxis.fr/) for overall content principles
- Especially important for:
  - Reference documentation (term explanations)
  - Tutorials and guides

### English Translation
- Translate to British English
- Follow Oxford Style Guide for capitalization in headings
- **Important**: Since the product (Altinn Studio) is not available in English, keep all GUI element references in Norwegian when translating
- Use translation tool or follow British English conventions