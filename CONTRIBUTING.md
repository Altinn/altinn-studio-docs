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
4. [Download the latest Hugo](https://github.com/gohugoio/hugo/releases) (extended) for your platform, and place the executable in the altinn-studio-docs folder.

## Build / Edit / Test locally

1. Open the altinn-studio-docs repo-folder in visual studio code
2. Run `hugo server --navigateToChanged`. Now baksia is running locally at http://loalhost:1313/
3. Edit and save files in the `content`-folder to automatically get a new local build of the site refreshed in your browser, so you can test your changes locally.

## Push your changes to GitHub
We recommend that you create a pull request when you want to share your changes with the rest of the world.

1. [Create a branch](https://code.visualstudio.com/docs/sourcecontrol/overview#_branches-and-tags) for your changes
2. [Create a pull request](https://youtu.be/LdSwWxVzUpo)

## Deploy
Whenever changes from your pull request are merged into the main-branch, an automatic deploy is updating https://docs.altinn.studio/

PS: If you don't have direct write access to the repo, you need to [create a fork](https://help.github.com/articles/fork-a-repo/)
and submit a [pull request](https://help.github.com/articles/about-pull-requests/) from your fork.

## Links

 - [Markdown cheat-sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
 - [Hugo configuration](https://gohugo.io/overview/configuration/)
 - [Hugo front matter](https://gohugo.io/content/front-matter/)
