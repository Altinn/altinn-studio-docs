---
title: 'GraphQL'
description: 'GraphQL-spørringer Dialogporten støtter'
weight: 11
---

Dialogporten støtter et skrivebeskyttet GraphQL API for sluttbrukere. Endepunktene er:

| Environment | URL                                                                                |
| ----------- | ---------------------------------------------------------------------------------- |
| Test        | `https://altinn-dev-api.azure-api.net/dialogporten/graphql`                        |
| Staging     | `https://platform.tt02.altinn.no/dialogporten/graphql`                             |
| Production  | `https://platform.altinn.no/dialogporten/graphql`                                  |

## Lokal utvikling
Når du kjører lokalt, er et GraphQL-frontend ([Banana Cake Pop](https://chillicream.com/products/bananacakepop)) tilgjengelig på http://localhost:5181/graphql/. Se [README.md](https://github.com/digdir/dialogporten/blob/main/README.md) for mer informasjon om å kjøre Dialogporten lokalt.

**Les mer**
* [Teknisk informasjon om Dialogporten V1 skjemaer](https://github.com/digdir/dialogporten/tree/main/docs/schema/V1)
* {{<link "../../user-guides/authenticating">}}

{{<children />}}