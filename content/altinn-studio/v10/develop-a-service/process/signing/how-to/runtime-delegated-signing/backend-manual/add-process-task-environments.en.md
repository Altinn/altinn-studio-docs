---
draft: true
headless: true
hidden: true
---

If you want to use environment-specific correspondence resources, you can configure them using the following syntax:

```xml
<altinn:signatureConfig>
    ...
  <altinn:correspondenceResource env="Development">app-correspondence-resource-1</altinn:correspondenceResource>
  <altinn:correspondenceResource env="Staging">app-correspondence-resource-2</altinn:correspondenceResource>
  <altinn:correspondenceResource env="Production">app-correspondence-resource</altinn:correspondenceResource>
    ...
</altinn:signatureConfig>
```

The `env` property accepts a range of values, but will ultimately group them into three categories as shown in the table below.
All property values are case-insensitive.

<!-- HTML markup because this table could not be rendered using markdown inside an `insert` shortcode -->

<table>
  <thead>
    <tr>
      <th>Environment</th>
      <th>Aliases</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Development</td>
      <td>development, dev, local, localtest</td>
    </tr>
    <tr>
      <td>Staging</td>
      <td>staging, test, at22, at23, at24, tt02, yt01</td>
    </tr>
    <tr>
      <td>Production</td>
      <td>production, prod, produksjon</td>
    </tr>
  </tbody>
</table>
