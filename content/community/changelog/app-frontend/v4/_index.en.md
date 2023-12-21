---
title: v4
description: Overview of breaking changes introduced in v4 of app frontend.
weight: 99
---

App frontend v4 brings with it some new features and breaking changes. This document aims to give an overview of the
changes and how they may affect your app. As always, with a new major version, we recommend that you test your app
thoroughly before deploying to production.

### Requires backend version 8.0.0
- https://github.com/Altinn/app-frontend-react/pull/1450
- 'required' validations no longer being filtered
- and more?

### Language rewrite
- https://github.com/Altinn/app-frontend-react/pull/1444
- New defaultValue feature helps (https://github.com/Altinn/app-frontend-react/pull/1441)
- Support for variables in deeply nested groups

### Most users will be prompted for party each time
In the Altinn profile it was possible to change a setting to 'not be prompted for party each time'. This setting was
mistakenly never read by app-frontend, so we failed to respect it. The default setting in Altinn profile is
_to be prompted_ for a party each time, so in v4 we changed the default behaviour of app-frontend to match the
setting in Altinn profile. This means that most users will be prompted for party each time they start an app, unless
they have changed the setting in Altinn profile.

[//]: # (TODO: Add screenshots of the setting in Altinn profile)
[//]: # (TODO: Add screenshots of the party preference prompt in app-frontend)

### TODO: Font changed to Inter
- https://github.com/Altinn/app-frontend-react/pull/1448
- Especially important look over fixed-length Input fields (personnummer, etc.)

### TODO: Inconsistent prev/next buttons
- https://github.com/Altinn/app-frontend-react/pull/1446
- Nothing should have changed, but apps should be re-tested

### TODO: Validations against dataModelBindings
- https://github.com/Altinn/app-frontend-react/issues/1463
- Some apps may suddenly get schema-validation again

### Title and description changes for Groups
- https://github.com/Altinn/app-frontend-react/pull/1693
The `title` attribute in `textResourceBindings` for the `Group` component as a repeating group previously only applied
to the title shown above each row in the summary view of the repeating group. This attribute is now only used as the
title for the repeating group in the form view. This means that the title will now be shown above the repeating group in
the form view if it has been set.

The `summaryTitle` attribute in `textResourceBindings` for the `Group` component is now used for displaying the title
above each row in the summary view of the repeating group.

The `body` attribute in `textResourceBindings` for the `Group` component is now called `description` in order to be
more consistent with the rest of the components.
