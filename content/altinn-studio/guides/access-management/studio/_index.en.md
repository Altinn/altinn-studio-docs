---
title: Altinn Studio access
linktitle: Studio
description: How to configure access for teams in Altinn Studio.
toc: true
weight: 200
aliases: 
- /altinn-studio/guides/access-management/studio/
---

## Access Management for the Organization

As the owner of an organization in Altinn Studio, you have the ability to configure the access for other users
associated with the organization. This is done via Gitea at the following link:
https://altinn.studio/repos/org/{org}/teams/ Remember to replace `{org}`.

Four standard teams have been defined that set guidelines for what a user is allowed to do within an organization in
Altinn Studio. If necessary, as an owner, you can add/remove users in teams, create new teams, and change configurations
of existing teams.

[See an overview of the standard teams and the access they grant here](../../../reference/access-management/studio/).




## Edit Access Management for a single repository
Access can be granted to both teams and
individual users. To maintain an overview, we primarily recommend setting up teams for access control. 

1. Navigate to the repository: `https://altinn.studio/repos/{org}/{app}/` (replace `{org}` and `{app}` with your org code and app name.)
    - Alternatively, navigate to https://altinn.studio/repos/explore/repos and search for your app.
2. Click the `Settings` button on the right side of the top menu for the repository.
3. Select the `Collaborators` tab.
4. Grant access to a specific user in the "Collaborators" section by typing user name, and clicking "Add Collaborator". 
5. Grant access to a specific team in the "Teams" section by typing team name and clicking "Add Team". 


![Manage access on repository](access-management-repository.png "Managing access to an individual repository")
