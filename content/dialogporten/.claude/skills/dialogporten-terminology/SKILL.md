---
name: dialogporten-terminology
description: Enforced English-to-Norwegian term translations and do-not-translate terms for content/dialogporten. Use when writing or reviewing a Dialogporten .nb.md page, or translating Dialogporten English prose to Norwegian by hand.
---

# Dialogporten Norwegian terminology

Fixed vocabulary for English to Norwegian (bokmål) Dialogporten documentation under `content/dialogporten/`. Apply them whenever writing or reviewing Dialogporten Norwegian content.

## Specific translations

Always translate these English terms to the given Norwegian form — do not use an alternative
rendering, even a reasonable-looking one:

| English | Norwegian |
|---|---|
| service owner | tjenesteeier |
| end user | sluttbruker |
| API gateway | API-gateway |
| transmission | forsendelse |
| EUS | SBS |
| CPS | ILS |
| CCR | ER |
| end user system | sluttbrukersystem |
| content provider system | innholdsleverandørs system |
| service resource | tjenesteressurs |
| write action | skrivehandling |
| API client | API-klient |
| Altinn Correspondence | Altinn Melding |
| dialog token | dialogtoken |
| authorization context | autorisasjonskontekst |
| context token | konteksttoken |

## Do not translate

Keep these terms in English in Norwegian text, unchanged:

- Dialogporten
- Altinn
- Maskinporten
- front channel embed

## Terms not yet in this list

If a Dialogporten page introduces a new cross-cutting English term with no entry above and no
established Norwegian rendering elsewhere in this repo, that's a real gap, not something to
improvise past. Pick a candidate term, but flag it to the user for sign-off before treating it as
settled — and consider running the repo-wide `altinn-terminologisjekker` skill first if the term
might already exist under a different name in another Altinn product's docs. Add the agreed term
to this table once decided, so it doesn't need re-deciding on the next page.
