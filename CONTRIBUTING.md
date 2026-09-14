# Contributing to docs.altinn.studio

The site is generated from [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) 
using the [Hugo](https://gohugo.io/overview/introduction/) static site generator.
We use YAML as front matter.

## Initial setup

1. Download and install [Git](https://git-scm.com/downloads) and clone the [altinn-studio-docs repository](https://github.com/Altinn/altinn-studio-docs) to a local folder:
```bash
git clone https://github.com/Altinn/altinn-studio-docs
```
2. We recommend downloading and using [visual studio code](https://code.visualstudio.com) with
   - [this markdown extension](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) for editing markdown and
   - [the github extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) for helping with pull requests
4. [Install Hugo](https://gohugo.io/installation/) (extended) for your platform

## Build / Edit / Test locally

1. Open the altinn-studio-docs repo-folder in visual studio code
2. Run `hugo server --navigateToChanged` from command line. Now the docs is running locally at http://localhost:1313/
3. Edit and save files in the `content`-folder to automatically get a new local build of the site refreshed in your browser, so you can test your changes locally.

## Multi-page guides

A guide that spans several pages gets navigation between the pages automatically.

1. Add `guide: true` to the front matter of the root page of the guide (the `_index.md` at the top of the guide).
   This page gets a "Get started" link to the first page of the guide.
2. Every page below the root page becomes a step in the guide, and gets links to the previous and next
   page with the link title of those pages. The order is the same as in the menu (depth first, sorted by `weight`).
3. To keep a page and its subpages out of the guide, add `guideExclude: true` to its front matter.
   Pages with `hidden: true` are left out as well.

The navigation is language specific: add `guide: true` to the root page in each language where the guide exists.

## Push your changes to GitHub
We recommend that you create a pull request when you want to share your changes with the rest of the world.

1. [Create a branch](https://code.visualstudio.com/docs/sourcecontrol/overview#_branches-and-tags) for your changes
2. [Create a pull request](https://youtu.be/LdSwWxVzUpo)

## Deploy
Whenever changes from your pull request are merged into the main-branch, an automatic deploy is updating https://docs.altinn.studio/

PS: If you don't have direct write access to the repo, you need to [create a fork](https://help.github.com/articles/fork-a-repo/)
and submit a [pull request](https://help.github.com/articles/about-pull-requests/) from your fork.

## Review
Remember to follow our [code of conduct](https://github.com/Altinn/altinn-studio-docs?tab=coc-ov-file).

## Links

- [Markdown cheat-sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [Hugo configuration](https://gohugo.io/overview/configuration/)
- [Hugo front matter](https://gohugo.io/content/front-matter/)
