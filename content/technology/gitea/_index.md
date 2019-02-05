---
title: Gitea
description: Gitea is a self-hosted Git service similar to GitHub. It is used as the repository solution in Altinn Studio Repos.
tags: [tech, gitea, git, repos]
---

![Gitea logo](gitea-logo.png?width=150)

[Gitea](https://gitea.io) is the product that is powering [Altinn Studio Repos](/altinn-studio-repos).

## Customize
The documentation on how to customize gitea can be found [here](https://docs.gitea.io/en-us/customizing-gitea/).

### Templates
The user interface of gitea can be customized to match your application needs. You can copy the templates from [gitea's github](https://github.com/go-gitea/gitea/tree/master/templates). 

For example the default login page looks like this

![Gitea default login](default-login.png)

It's customized to look like this

![Customized Gitea login](customized-login.png)

Follow these steps to change any user interface of gitea. Here example is given for login

1. Copy the login template from gitea's github
2. Paste it in your application in the same folder structure as gitea.
3. Edit the file. You can change the html tags and introduce new css or add new text or image without affecting the logic.
4. Update the docker image to use these templates.

Now, the new login template will be taken in use.

## Links

- https://gitea.io
- https://github.com/go-gitea/gitea