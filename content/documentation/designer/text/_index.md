---
title: Text and translations
linktitle: Texts and translations
description: Solution for designing service UI, defining workflow, other settings, deploy ++
tags: ["tjenester 3.0"]
weight: 100
---

### Text editing and translations

Easy and efficient text processing and translation are important in a service development solution. The possibility to reuse texts across
multiple services are especially important.

Texts in the editor are written in a ini-file that is converted to a simple JSON-file and presented as an API. In that way
the user could work directly in the code editor or convert the text into other formats supported by external translation tools. 
Meaning that 3.0 supports any language that is added, not just languages supported by the Altinn portal.

- Definition of texts using hierarchical and readable keys
- Reusable texts, internal across different pages and on the levels above the solution
- Possibility to add other languages

**How to add a new language:**

- Make a new ini-file and place it in AltinnCore > Common > Languages > ini
- Change the parameter "languageCode" in the  API call to whatever name your ini file is called. <br/>
    Example for Norweigan bokmål (nb): <br/>
    http://altinn3.no/designer/y/types/Language/getLanguageAsJSON?languageCode=nb

**Guides for language files:**

- Keys are sorted by which app they belong to
- Universal keys ([general]) are placed at the top of the file
- Keys are sorted alphabetically
- Keys are written in lowercase with underscores (example_key)

{{<figure src="oversetting.png?width=1000" title="Editor for oversetting av tekster">}}
