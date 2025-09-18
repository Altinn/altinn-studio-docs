# Claude Code Configuration

This is the configuration file for Claude Code in the Altinn Studio docs project.

## Project Overview
This is a Hugo-based documentation site for Altinn products like Altinn Studio, Altinn Autorization etc. The project uses Hugo with a custom theme to generate static documentation.

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