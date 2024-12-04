---
title: Automatic cleanup
description: How unknown options are automatically removed from the data model
---

Some options for components may be dynamic. Either directly via [dynamic options](../../sources/dynamic),
[options derived from a changing data model](../../sources/from-data-model), or by [static options](../../sources/static)
where some values may be [filtered](../filtering) out.

When the options are dynamic, the data model may contain values that are no longer valid. This can happen if the user
(or prefill) has selected an option that is no longer available. In such cases, to avoid the data model from containing
invalid values, unknown options are automatically removed from the data model.

## How it works

When the form is loaded, the options for all components are fetched and compared to their values in the data model. Even
if a component is not visible (i.e. when on a page that is not currently shown), the app-frontend will still
check the options for that component and remove any values that are not in the options list.

This has some implications that you should be aware of:
- If you configure multiple components pointing to the same field in the data model, the options for all those components
  should be the same. If they are not, the data model will be cleaned up to only contain the options that are valid for
  all components.
- If the component is not marked as `required`, the user can submit the form even if the value is removed from the data
  model. If you want to ensure that the user selects a valid option, you should mark the component as required.

## When it _doesn't_ happen

- The automatic cleanup of unknown options currently only happens when the form is loaded via the app-frontend,
  i.e. when the user opens the form in a browser.
- Automatic cleanup does not happen when the component is marked as `hidden`. For this reason you can also have
  multiple components pointing to the same field in the data model, where some are hidden and some are visible. In such
  cases, only the visible components will have their options checked and cleaned up. This is also the case if a component
  is hidden due to being on a hidden page, or inside another hidden component. The term 'hidden' in this sense refers to
  [dynamic expressions](../../../dynamics) used to hide components, not which components are currently visible on
  the page.
- Removal of unknown values does not happen for the `FileUploadWithTag` component.
- Removal of unknown values does not happen for components configured with `renderAsSummary` set to `true`.