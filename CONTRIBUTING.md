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

## Internal Code Review Guidelines

General Principles:
1.	Avoid terms that might be interpreted as personal attacks (e.g., "idiotic" or "useless"). Assume that everyone is making their best effort.
2.	Be moderate in your language. Avoid strong exaggerations like "always," "never," etc.
3.	We're all on the same team. The intention is not to criticize but to produce better code.
4.	Smaller, frequent pull requests are easier to manage than larger ones. Aim to limit the scope of code to approximately 200 lines for each review.

Guidelines for Reviewers:
1.	Focus on the Code, Not the Person: The goal is to elevate the quality of the code, not to showcase your expertise. Be constructive in your feedback.
2.	Adhere to Established Standards: Stick to coding conventions and practices that are accepted within the team. Deviations must be justified.
3.	Understand the Purpose: Make sure to understand the rationale behind the code you're reviewing. Go through any associated documentation or task definitions.
If something is unclear, ask the author to clarify and/or add comments to the code.
4.	Be direct and polite: Avoid wrapping your opinions in questions, like "Have you considered isolating this logic into a separate method?". Instead, be
direct and point out your difference in opinion: "I think this logic would be easier to follow if isolated into a separate method".
5.	Clarify Importance: Distinguish between critical issues and lesser suggestions. Make it clear what needs to change before the code can be merged, and
respect the author's right to make the final decision about the rest.

Guidelines for Authors:
1.	Self-Check: Review your own code to catch simple errors before requesting a review.
2.	Details in Pull Requests: Include an explanatory text that provides reviewers with necessary context.
3.	Respond to Reviews: Provide feedback on all comments. A simple "Done" or "Agreed" is often sufficient.
4.	Be Receptive: Be open to critique and suggestions. Argue your case if needed but be willing to consider alternatives.

Procedural Rules:
1.	Speed is a Virtue: The review should be quick to avoid potential conflicts during merging.
2.	More Eyes, Better Outcome: Aim to have at least two reviewers for substantial code changes.


## Links

 - [Markdown cheat-sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
 - [Hugo configuration](https://gohugo.io/overview/configuration/)
 - [Hugo front matter](https://gohugo.io/content/front-matter/)

