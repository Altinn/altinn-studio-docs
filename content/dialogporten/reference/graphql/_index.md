---
title: 'GraphQL'
description: 'GraphQL queries Dialogporten supports'
weight: 11
---

Dialogporten supports a read-only GraphQL API for end-users. The endpoints are:

| Environment | URL                                                                                |
| ----------- | ---------------------------------------------------------------------------------- |
| Test        | `https://altinn-dev-api.azure-api.net/dialogporten/graphql`                        |
| Staging     | `https://platform.tt02.altinn.no/dialogporten/graphql`                             |
| Production  | `https://platform.altinn.no/dialogporten/graphql`                                  |

{{<displayFootnotes>}}

## Local development
When running locally, a GraphQL frontend ([Banana Cake Pop](https://chillicream.com/products/bananacakepop)) is available at http://localhost:5181/graphql/. See [README.md](https://github.com/digdir/dialogporten/blob/main/README.md) for more information about running Dialogporten locally.

**Read more**
* [Technical information about Dialporten V1 schemas](https://github.com/digdir/dialogporten/tree/main/docs/schema/V1)
* {{<link "../../user-guides/authenticating">}}

{{<children />}}
