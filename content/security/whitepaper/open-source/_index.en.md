---
title: Open source
description: 
toc: false
weight: 4
---

The source code, user stories, backlogs, and build definitions are [openly available on GitHub](https://github.com/Altinn/).
Open source allows others to analyze the code for vulnerabilities and quality.
On the one hand, this is a great advantage (especially if vulnerabilities are reported back to Digdir),
on the other hand, it can lead to malicious exploitation.

The source code has been on GitHub for a long time (maturation), and security experts have analyzed and security-tested Altinn 3.
Digdir focuses on the openness and trust that open source provides
rather than the likelihood of malicious exploitation of a vulnerability found in the source code.

GitHub, along with other vendors, offers various security tools for free for open source projects.
The tools cover areas such as static code analysis (SonarQube, LGTM/CodeQL) and
handling of dependencies/third-party libraries (Dependabot, Snyk, Renovate, WhiteSource Bolt).
Altinn has adopted several of these.
