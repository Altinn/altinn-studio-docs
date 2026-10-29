---
draft: true
title: "ALTINNAPP0801: service owner authorisation could not be verified"
description: "The analysis could not determine statically whether the app owner has the required rights"
weight: 81
---

This diagnostic is reported when the analysis cannot determine whether the app owner
organisation has the actions it needs. It does not say that the rights are missing — only that
the question could not be settled at build time. The message gives the reason:

- `policy.xml` could not be read as an XACML policy document
- `policy.xml` contains `Deny` rules, whose effect on the app owner organisation the analysis
  cannot evaluate
- `process.bpmn` could not be parsed, so the actions the process needs could not be determined
- the right is granted only through a rule the analysis cannot settle statically: a condition,
  a grant limited to a single task, or an attribute or match function it does not model

Category `Authorization`, severity **warning**.

Check manually that the app owner organisation has the actions listed. See ALTINNAPP0800 for
the actions the app performs as the service owner.
