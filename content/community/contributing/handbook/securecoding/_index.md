---
title: Secure DevOps
description: Security is an important concern in all phases of the DevOps cycle.
tags: [development]
toc: false
weight: 100
---

Having a Secure DevOps process requires that security is built into the applications, the process, the infrastructure,
and the configuration, and more.

<figure>
<object title="Secure DevOps phases" data="/security/whitepaper/development/devops.svg" type="image/svg+xml"></object>
<figcaption>Secure DevOps phases (clickable)</figcaption>
</figure>

Below you find information on what kind of tools, patterns, and processes we follow to make sure we think about
application and infrastructure security for all phases.

## Planning phase
During the planning phase, the requirements for features are gathered. Already in this phase, we identify changes that
need special security considerations. Typically this is done as part of grooming to reach [Definition
of Ready](/community/devops/definition-of-ready/).

We mark our security-related features and bugs with the label
[kind/security](https://github.com/search?q=org%3AAltinn+label%3Akind%2Fsecurity&type=issues).  
If [threat modeling](https://owasp.org/www-community/Threat_Modeling) is deemed necessary, the label
[tm/yes](https://github.com/search?q=org%3AAltinn+label%3Atm%2Fyes&type=issues) is used to indicate this.

Details of security-related issues and threat modeling are in many cases kept out of GitHub.


## Code phase
During the development of a feature, we have several processes and tools to help us creating secure code.

### Development checklists
We have a development checklists that ensures that developers and reviewers consider the different security aspects.

See [checklist](checklist).

### IDE and tools
We use both Visual Studio and Visual Studio Code. Those provide us with tools for static code analysis.

- StyleCop analyzes C# source code to enforce a set of style and consistency rules. [See
  project](https://github.com/DotNetAnalyzers/StyleCopAnalyzers)
- [Code Analysis](https://docs.microsoft.com/en-us/visualstudio/code-quality/roslyn-analyzers-overview?view=vs-2019)
  verifies the code after a [ruleset defined by
  Altinn](https://github.com/Altinn/altinn-studio/blob/master/Altinn3.ruleset)

### Unit and integration tests
As part of the coding process unit and integration-tests are created. Besides, to cover functionality, many of them
cover security aspects like authentication and authorization.


## Build phase
Once a developer has finished coding a feature he/she must create a
[pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

### Peer Reviews
All pull requests require peer review from at least one other team member.

See [active pull requests](https://github.com/search?q=org%3AAltinn++&type=pullrequests&state=open).

### Run Unit and integration tests
As part of the build pipelines, all unit and integration tests are run. This makes sure that security functionality has
not been broken.

### CodeQL
[CodeQL](https://codeql.github.com/) is a code analysis platform for identifying vulnerabilities and preventing
them from reaching production.

This is run for every pull request.

### Sonar Cloud
Every pull request is analyzed by [Sonar Cloud](https://www.sonarcloud.io/github).

Sonar Cloud analyzes the code by a [defined rule set](https://sonarcloud.io/organizations/altinn/rules) and checks the
code against OWASP Top 10 and SANS Top 25.

We have defined some [quality gates](https://sonarcloud.io/organizations/altinn/quality_gates/show/3829) that the code
need to adhere to to be able to merging pull request in to master. Our current active issues are available
[here](https://sonarcloud.io/organizations/altinn/issues?resolved=false).

### Secret scanning
[Secret scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning) in GitHub is used to
prevent secrets from being committed to the source code accidentally.


## Test phase
Each feature added to our platform is tested.

- Integration tested with positive and negative tests for access control where possible
- Manual functional tests
- Manual security testing for selected features

### Dynamic code analysis.
We use different tools to perform dynamic code analysis.

Some of the tools are:

- [HCL AppScan](https://www.hcltechsw.com/products/appscan)

We also regulary use third party security companies to go through our code and
perform [pen testing](https://en.wikipedia.org/wiki/Penetration_test).


## Release phase
Releases are created automatically using [Github Actions](https://github.com/features/actions), and the configuration
for this is part of each product repository.

Release notes should also be
[generated automatically](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes).


## Deploy phase
Deployment of the code to test and production environments are done automatically using [Github
Actions](https://github.com/features/actions), and the configuration for this is part of each product repository.

Applications and products are deployed as containers to either
[Azure Kubernetes Services](https://learn.microsoft.com/en-us/azure/aks/concepts-security) or
[Azure Container Apps](https://azure.microsoft.com/en-us/products/container-apps).


## Operate phase
When the different applications are in production the DevOps team make sure that everything works as expected.


## Monitor phase
During the monitor phase, the team follows up on how the different solutions are working and identifying improvements
and changes.

We use different tools to identify security threats for our running applications.

- [Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview) presents log
and traffic information making it possible to detect different types of attacks
- [Sentinel](https://azure.microsoft.com/nb-no/products/microsoft-sentinel) is used to monitor the infrastructure and
[anomaly detection](https://en.wikipedia.org/wiki/Anomaly_detection)
- ...

### Dependency updates

We use [Renovate](https://docs.renovatebot.com/) and
[Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates)
to monitor updates for dependencies.

These tools can automatically create pull requests with updates in each repository, and each team merges these.

{{<children />}}