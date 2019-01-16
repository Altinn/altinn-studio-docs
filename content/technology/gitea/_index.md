---
title: Gitea
description: Material UI is one of the popular react UI library used in Altinn Studio/ Altinn Studio Apps
weight: 100
tags: ["tjenester 3.0", "Gitea", "customize", "gitea"]
---

## Customize Gitea
The documentation on how to customize gitea can be found [here](https://docs.gitea.io/en-us/customizing-gitea/).

#### Customize Templates
The user interface of gitea can be customized to match your application needs. You can copy the templates from [gitea's github](https://github.com/go-gitea/gitea/tree/master/templates). 

For example the default login page looks like this

{{<figure src="defaultlogin.png?width=1000" title="Gitea default login">}}

It's customized to look like this

{{<figure src="customized-login.png?width=1000" title="Customized gitea login for altinn studio">}}

Follow these steps to change any user interface of gitea. Here example is given for login

1. Copy the login template from gitea's github
2. Paste it in your application in the same folder structure as gitea.
3. Edit the file. You can change the html tags and introduce new css or add new text or image without affecting the logic.
4. Update the docker image to use these templates.

Now,the new login template will be taken in use.
