---
title: Sources
description: The different sources for options in Altinn Studio
weight: 10
---

When you set up an options-enabled component in Altinn Studio, it needs to be connected to a source of options. There are three different properties in the component configuration that can be used for this, depending on the use case:


| Property    | Usage                                                                                                                                      |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `options`   | [Static options defined per-component](./static/#in-component-configuration-options)                                                       |
| `optionsId` | Either [code lists from json files](./static/#from-json-files-code-list), [dynamic code lists](./dynamic) or [shared code lists](./shared) |
| `source`    | [Code lists from the data model](./from-data-model)                                                                                        |

At least one such property has to be set in the component configuration. If multiple are set, the configuration precedence will be the opposite of the table above, so `source` will take precedence over `optionsId`, which will take precedence over `options`.

{{<children />}}
