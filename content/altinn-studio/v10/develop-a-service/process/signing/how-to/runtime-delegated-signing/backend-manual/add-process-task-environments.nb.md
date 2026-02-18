---
draft: true
headless: true
hidden: true
tags: [needsReview, translate]
---

Hvis du ønsker å bruke miljøspesifikke correspondence-ressurser kan du konfigurere dem ved å bruke følgende syntaks:

```xml
<altinn:signatureConfig>
    ...
  <altinn:correspondenceResource env="Development">app-correspondence-resource-1</altinn:correspondenceResource>
  <altinn:correspondenceResource env="Staging">app-correspondence-resource-2</altinn:correspondenceResource>
  <altinn:correspondenceResource env="Production">app-correspondence-resource</altinn:correspondenceResource>
    ...
</altinn:signatureConfig>
```

`Env`-attributten godtar en rekke verdier, men kategoriserer disse til slutt i tre kategorier som vist i tabellen under. Det skilles ikke mellom store og små bokstaver i verdiene.

<!-- HTML markup because this table could not be rendered using markdown inside an `insert` shortcode -->

<table>
  <thead>
    <tr>
      <th>Miljø</th>
      <th>Aliaser</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lokal test</td>
      <td>development, dev, local, localtest</td>
    </tr>
    <tr>
      <td>Test</td>
      <td>staging, test, at22, at23, at24, tt02, yt01</td>
    </tr>
    <tr>
      <td>Produksjon</td>
      <td>production, prod, produksjon</td>
    </tr>
  </tbody>
</table>
