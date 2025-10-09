# Altinn Studio docs

![Build and Deploy](https://github.com/Altinn/altinn-studio-docs/actions/workflows/hugo.yml/badge.svg)

This repo contains the source for the [Altinn 3 documentation](https://docs.altinn.studio/).

There are two ways to edit and test your changes to the docs:

## Running Hugo locally

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
4. The documentation can now be opened in browser at http://localhost:1313/
5. Edit and save files to get the site refreshed in your browser, so you can test your changes
6. When happy, [push your changes](https://github.com/Altinn/altinn-studio-docs/blob/master/CONTRIBUTING.md#push-your-changes-to-github)
