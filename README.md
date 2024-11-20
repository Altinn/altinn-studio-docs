# Altinn Studio docs

![Build and Deploy](https://github.com/Altinn/altinn-studio-docs/actions/workflows/hugo.yml/badge.svg)

This repo contains the source for the [Altinn 3 documentation](https://docs.altinn.studio/).

There are two ways to edit and test your changes to the docs:

## Github.dev in your browser
> For minor changes to content in a few files, text and typos, translations, cleanups, etc.

1. Open the page you want to change at https://docs.altinn.studio and click the *"Edit page on GitHub"*-link at the
   bottom to open [github.dev](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor) (Visual Studio
   Code) in your browser
2. Open preview and do your changes  
   ![](https://code.visualstudio.com/assets/docs/languages/Markdown/md-dynamic-preview.gif)
3. When happy with your changes, add a message (1), Commit & Push (2) and create a Pull Request (3).  
   ![image](https://github.com/Altinn/altinn-studio-docs/assets/6088624/c1b90855-c570-4cfe-af79-729d1d30c3a9)  
   (if you're on the master branch, you'll first be asked to name a new branch)


## Running Hugo locally
> When doing larger changes, restructuring and refactoring, changes in layouts, code, etc.
> See [CONTRIBUTING](./CONTRIBUTING.md) for even more details.

1. Install the required software ([Git](https://git-scm.com/downloads), [Hugo](https://gohugo.io/installation/) and [Visual Studio Code](https://code.visualstudio.com/))
2. Clone the repo
   ```shell
   cd C:/repos
   git clone https://github.com/altinn/altinn-studio-docs
   ```
3. Navigate to folder and run Hugo
   ```shell
   cd altinn-studio-docs
   hugo server --navigateToChanged
   ```
4. The documentation can now be opened in browser at http://docs.altinn.studio
5. Edit and save files to get the site refreshed in your browser, so you can test your changes
6. When happy, [push your changes](https://github.com/Altinn/altinn-studio-docs/blob/master/CONTRIBUTING.md#push-your-changes-to-github)
