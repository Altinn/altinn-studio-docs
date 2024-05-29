---
title: What's new
description: Overview of changes introduced in v3 of app frontend.
---

For a high-level overview of [upcoming changes, you can check out the roadmap](https://github.com/Altinn/altinn-roadmap/issues).

## >3.37.2
Changelog for app-frontend can now be [found on Github Releases](https://github.com/Altinn/app-frontend-react/releases).

## 3.37.2 (2022-05-20) - Dependency patching
Patching of external dependencies for week 20 of 2022.

## 3.37.1 (2022-05-15) - Fix for prefills when using preselectedOptionIndex
When using `preselectedOptionIndex` on a field which is used to determine later dynamic
prefills (or when clicking really fast), the wrong prefills could end up being used.
Issue [#8255](https://github.com/Altinn/altinn-studio/issues/8255).

## 3.37.0 (2022-05-15) - Support for tracks in stateless apps
Stateless apps can now utilize tracks. Requires version 5.1.0 or later of nuget packages.
Issue [#8347](https://github.com/Altinn/altinn-studio/issues/8347).

## 3.36.4 (2022-05-10) - Fix in validation of required field in hidden groups (again)
After the last fix, released in version 3.35.2, the problem would persist if the fields were hidden individually
instead of hiding the entire group. This additional vector has now been fixed.
Issue [#6398](https://github.com/Altinn/altinn-studio/issues/6398).

## 3.36.3 (2022-05-10) - Only reference description if the field exists
Fixes a bug where components had defined `aria-describedby` to a element that did not exist.
Issue [#23](https://github.com/Altinn/app-frontend-react/issues/23).

## 3.36.2 (2022-05-06) - Fixed a potential crash after failing validation from server
Fixes a recently introduced bug where some failing validations passed from the server could crash the app instance.
Issue [#8481](https://github.com/Altinn/altinn-studio/issues/8481).  
Patching of external dependencies for week 18 of 2022.

## 3.36.1 (2022-05-06) - Fix in validation of required fields in repeating multi-page groups
Fixes a bug where required fields inside multi-page repeating groups were being marked with
errors even when no instances of the repeating group had been added.
Issue [#7478](https://github.com/Altinn/altinn-studio/issues/7478).

## 3.36.0 (2022-05-03) - Added support for dynamics in nested repeating groups.
Added support for dynamics in nested repeating groups.
Issue [#55](https://github.com/Altinn/app-frontend-react/issues/55).

## 3.35.2 (2022-05-02) - Fix in validation of required field in hidden groups
Fixes a bug where hiding a non-repeating group with required fields could display a message asking the user to fill
the invisible required fields.
Issue [#6398](https://github.com/Altinn/altinn-studio/issues/6398).

## 3.35.1 (2022-04-28) - Dependency patching
Patching of external dependencies for week 17 of 2022.

## 3.35.0 (2022-04-28) - Marking required fields
Changed default behaviour of marking optional fields to now mark required fields with * as default.
Optional fields have no marking as default behaviour, but this can be configured using the `labelSettings`
property of the field, see [here](/altinn-studio/reference/ux/fields/settings/).

## 3.34.4 (2022-04-28) - Removed out-of-place heading in receipt when there are no attachments
When PDF generation has been disabled and there are no attachments, the heading indicating there should follow a list
of attachments has also been hidden.
Issue [#8296](https://github.com/Altinn/altinn-studio/issues/8296).

## 3.34.3 (2022-04-28) - Bugfixes for caching of lasted visited view
Fixes a bug where stateless app would use a shared key for persisting the last visited view. Also fixes an issue where an empty page would be displayed if the persisted layout id was no longer present.
Issues [#7897](https://github.com/Altinn/altinn-studio/issues/7897) and [#6975](https://github.com/Altinn/altinn-studio/issues/6975).

## 3.34.2 (2022-04-25) - Fixed colors in radio and checkbox
The colors for radio and checkbox borders were not adhering to accessibility requirements from WCAG 2.1.
These colors have been adjusted slightly to follow standard theme colors.
Issue [#11](https://github.com/Altinn/app-frontend-react/issues/11).

## 3.34.1 (2022-04-22) - Fixed invalid HTML attribute in ImageComponent
The `width` attribute on `img` element can only
be [a number that represents px](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-width). We have
support for other units, f.ex %.
The width declaration was moved to inline styling instead to resolve this issue.
Issue [#14](https://github.com/Altinn/app-frontend-react/issues/14).

## 3.34.0 (2022-04-11) - Options from the data model
Added possibility to setup options from repeating groups in the data model. Read more on [docs.](/altinn-studio/reference/data/options/repeating-group-codelists)
Issue [#7626](https://github.com/Altinn/altinn-studio/issues/7626). 

## 3.33.5 (2022-04-11) - External dependency patching
Patched external dependency to fix security issue.
Pull request [#8371](https://github.com/Altinn/altinn-studio/pull/8371).

## 3.33.4 (2022-03-31) - Webpack 5 + dependency patching
App frontend is now bundled with webpack 5. Also patched some external dependencies.
Issue [#5073](https://github.com/Altinn/altinn-studio/issues/5073).

## 3.33.3 (2022-03-25) - Support for defining row or columns for checkbox and radio
Added support for defining row or columns layout for radio and checkbox.
Issue [#5730](https://github.com/Altinn/altinn-studio/issues/5730).

## 3.33.2 (2022-03-24) - Adjusted height of input fields and date picker
The height of these fields was incorrect. They are now set to 36px height.
Issue [#7377](https://github.com/Altinn/altinn-studio/issues/7377).

## 3.33.1 (2022-03-23) - Bugfix for dynamic options
Fixed bug where only fist options fetched when two components reference same optionId but with different mapping.
Issue [#8292](https://github.com/Altinn/altinn-studio/issues/8292).

## 3.33.0 (2022-03-18) - New text in Confirm view + possible to customize
New text for `confirm.sender` in confirm view. Now also possible to override this text.
Issue [#8243](https://github.com/Altinn/altinn-studio/issues/8243).

## 3.32.10 (2022-03-18) - Bugfix for Datepicker
Fixed a bug where malformed dates would not display any validation message.
Issue [#8121](https://github.com/Altinn/altinn-studio/issues/8121).

## 3.32.9 (2022-03-10) - Bugfix for attachments in LocalTest
Attachments are now possible to download in LocalTest.
Pull request [#7925](https://github.com/Altinn/altinn-studio/pull/7925).

## 3.32.8 (2022-03-04) - Bugfix for Dropdown-component in repeating groups
Fixed bug where a dropdown component in a repeating group would result in an unknown error.
Issue [#8169](https://github.com/Altinn/altinn-studio/issues/8169).

## 3.32.7 (2022-03-04) - Dependency patching
Patching of external dependencies for week 9 of 2022.
Issue [#8137](https://github.com/Altinn/altinn-studio/issues/8137).

## 3.32.6 (2022-03-02) - Fixes validation on multiple tracks
Fixed page validation on apps with multiple tracks.
Issue [#8145](https://github.com/Altinn/altinn-studio/issues/8145).

## 3.32.5 (2022-03-02) - Fixes for text elements
Multiple fixes for texts and support for markdown in header component.
Issue [#7874](https://github.com/Altinn/altinn-studio/issues/7874).
Issue [#7571](https://github.com/Altinn/altinn-studio/issues/7571).

## 3.32.4 (2022-03-01) - UX fixes for mobile view
Fixed modal header padding in mobile view.
Issue [#8143](https://github.com/Altinn/altinn-studio/issues/8143).

# 3.32.3 (2022-03-01) - Run frontend rules on backend calculations
Fixed a bug where frontend rules did not get triggered when a backend calculation has updated a connected field.
Issue [#8054](https://github.com/Altinn/altinn-studio/issues/8054).

# 3.32.2 (2022-02-28) - Bugfix for address component
Fixed a bug where address component could get in a bad state and not fetch post place based on zip code.
Issue [#8130](https://github.com/Altinn/altinn-studio/issues/8130).

# 3.32.1 (2022-02-25) - Bugfix for handling layout name
Fixed app loading with layout name as data.
Issue [#8125](https://github.com/Altinn/altinn-studio/issues/8125).

## 3.32.0 (2022-02-23) - Secure options
Now possible to setup secure options.
Issue [#7893](https://github.com/Altinn/altinn-studio/issues/7893).

## 3.31.4 (2022-02-23) - Bugfixes for confirm
Fixed bug where spinner for confirm button would not last the whole request.
Also now displays the generated PDF in the confirm view.
Issue [#7824](https://github.com/Altinn/altinn-studio/issues/7824).

## 3.31.3 (2022-02-17) - Fix alignment of label grid
Fix alignment of label grid so that padding match normal grid.
Pull request [#8059](https://github.com/Altinn/altinn-studio/pull/8059).

## 3.31.2 (2022-02-17) - Dependency patching
Patching of external dependencies for week 7 of 2022.
Issue [#8048](https://github.com/Altinn/altinn-studio/issues/8048).

## 3.31.1 (2022-02-16) - New styling button
New styling for button component to match figma skcetches.
Pull request [#8057](https://github.com/Altinn/altinn-studio/pull/8057).

## 3.31.0 (2022-02-16) - Added possibility to override texts in archive receipt

Texts in archive receipt can now be overridden by the application, and also supports markdown and variables.

Issue [#7902](https://github.com/Altinn/altinn-studio/issues/7902).

## 3.30.0 (2022-02-16) - Added refetching of options.

Added functionality for refetching dynamic options when a mapping field changes.

Issue [#7888](https://github.com/Altinn/altinn-studio/issues/7888).

## 3.29.1 (2022-02-14) - Fixed issue with variables in texts being ignored on calculation

This fixes an issue that was introduced in 3.29.0

Pull request [#8045](https://github.com/Altinn/altinn-studio/pull/8045).

## 3.29.0 (2022-02-11) - Added Navigation bar component

Added Navigation bar component

Issue [#5893](https://github.com/Altinn/altinn-studio/issues/5893).

## 3.28.2 (2022-02-10) - Moved test files

No code changes

Pull request [#7999](https://github.com/Altinn/altinn-studio/pull/7999).

## 3.28.1 (2022-02-09) - Fixed an issue in checkbox component

This fixed an issue introduced in 3.27.5, where changes to checkbox items could cause the simplebinding value to be set
to `,`.

Pull request [#7996](https://github.com/Altinn/altinn-studio/pull/7996).

## 3.28.0 (2022-02-09) - Added FileUploadWithTag component

Added file upload component with option to tag files

Issue [#6479](https://github.com/Altinn/altinn-studio/issues/6479).

## 3.27.5 (2022-02-09) - Fixed an issue in the checkbox component
Fixed an issue in the checkbox component

Related to issue [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.4 (2022-02-08) - Fixed an issue in the confirm container
Fixed an issue in the confirm container

Related to issue [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.3 (2022-02-07) - Fixed an issue in the radiobutton component
Fixed an issue in the radiobutton component

Related to issue [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.2 (2022-02-07) - Fixed an issue in the receipt container
Fixed an issue in the receipt container

Related to issue [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.1 (2022-02-07) - Fixed an issue in the datepicker component
Fixed an issue in the datepicker component

Related to issue [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.27.0 (2022-02-01) - Show app owner in header
App owner will now be displayed in the app header to improve visibility to who owns the app.

Issue [#7227](https://github.com/Altinn/altinn-studio/issues/7227).

## 3.26.3 (2022-02-01) - Fixed an issue in the address component
Fixed an issue in the address component

Related to issue [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.26.2 (2022-02-01) - Fixed an issue in the dropdown component
Fixed an issue in the dropdown component

Related to issue [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.26.1 (2022-01-31) - Fixed an issue in the instantiation container
Fixed an issue in the instantiation container

Related to issue [#7464](https://github.com/Altinn/altinn-studio/issues/7464).

## 3.26.0 (2022-01-30) - Design updates for repeating groups
- "Save"-button will get a different style than the "Next"-button.
- "Edit"-button gets the same focus style as the editable box, so its easier to see which row is being edited.
- Icon is left adjusted for the text in all icon buttons.
- The margin in the group is changed so that the text uses the entire width, and flows on the same vertical line as the rest of the content of the form.

Related to issue [#7577](https://github.com/Altinn/altinn-studio/issues/7577).

## 3.25.1 (2022-01-24) - Dependency patching
Patching of external dependencies for week  4 av 2022.

Issue [#7842](https://github.com/Altinn/altinn-studio/issues/7842).

## 3.25.0 (2022-01-24) - Added more data sources for dynamic texts
The feature that adds support for variables in texts have recieved two new data sources. The new sources are the current Instance and ApplicationSettings. ApplicationSettings requires version 4.25.0 or newer of the backend NuGet packages.

Related to issue [#7520](https://github.com/Altinn/altinn-studio/issues/7520).

## 3.24.0 (2022-01-24) - Neutral design
Added a more neutral design.
Issue [#7234](https://github.com/Altinn/altinn-studio/issues/7234).

## 3.23.1 (2022-01-24) - Dependency patching
Patching of external dependencies for week 3 of 2022.
Issue [#7842](https://github.com/Altinn/altinn-studio/issues/7842).

## 3.23.0 (2022-01-21) - Dynamic options
Added support for first version of dynamic options.
Issue [#5247](https://github.com/Altinn/altinn-studio/issues/5247).

## 3.22.9 (2022-01-20) - Stable FormData + Typescript improvements
Make FormData type stable and various improvements to typings.
Pull request [#7718](https://github.com/Altinn/altinn-studio/pull/7718).

## 3.22.8 (2022-01-17) - Fix for various eslint rules
Fixes several eslint issues, adds some more test coverage. Minor refactors to some components that were very outdated.
Pull request [#7786](https://github.com/Altinn/altinn-studio/pull/7786).

## 3.22.7 (2022-01-13) - Dependency patching
Patching of external dependencies for week 2 of 2022.
Issue [#7753](https://github.com/Altinn/altinn-studio/issues/7753).

## 3.22.6 (2022-01-11) - Bugfix repeating groups

Fixed a bug where repeating group state would not be cleared when loading a new form layout.
Issue [#7773](https://github.com/Altinn/altinn-studio/issues/7773).

## 3.22.5 (2022-01-10) - Optimization for SummaryGroupComponent
Added missing keys for improved performance.
Pull request [#7720](https://github.com/Altinn/altinn-studio/pull/7720).

## 3.22.4 (2022-01-07) - Display error when rendering unknown component
App frontend now shows an error when trying to render an unknown component.
Pull request [#7724](https://github.com/Altinn/altinn-studio/pull/7724).

## 3.22.3 (2022-01-07) - Dependency patching
Patching of external dependencies for week 1 of 2022.
Issue [#7753](https://github.com/Altinn/altinn-studio/issues/7753).

## 3.22.2 (2021-12-23) - Bugfix variables in text
Fixed a bug where variables in text not would get updated after a backend calculation.
Issue [#7308](https://github.com/Altinn/altinn-studio/issues/7308).

## 3.22.1 (2021-12-23) - Bugfix missing rights for stateless view
Fixed a bug where missing rights would display generic error message and not the missing rights error.
Issue [#6514](https://github.com/Altinn/altinn-studio/issues/6514).

## 3.22.0 (2021-12-22) - More options for customization of repeating groups
Added more possible texts to override possibility to hide "add new" button for a repeating group.
Issue [#7164](https://github.com/Altinn/altinn-studio/issues/7164).

## 3.21.1 (2021-12-17) - Bugfix for task validation
Fixed a bug where validations set in `ValidateTask` in `ValidationHandler.cs` would not get presented to the user.
Issue [#7333](https://github.com/Altinn/altinn-studio/issues/7333).

## 3.21.0 (2021-12-17) - Possibility to use h2, h3 and h4 as size values for the header component in FormLayout
It is now possible to use h2, h3 and h4, instead of S, M and L as size values in the header component.
Issue [#7611](https://github.com/Altinn/altinn-studio/issues/7611).

## 3.20.1 (2021-12-16) - Bugfix for address component
Fixed a bug where the address component would crash unexpectedly for empty values.
Issue [#7658](https://github.com/Altinn/altinn-studio/issues/7658).

## 3.20.0 (2021-12-14) - Support for custom OIDC provider
Added support in frontend so that Altinn.Apps can have a custom OIDC provider.
Issue [#7173](https://github.com/Altinn/altinn-studio/issues/7173).

## 3.19.2 (2021-12-09) - Dependency patching
Patching of external dependencies for week 49.
Issue [#7590](https://github.com/Altinn/altinn-studio/issues/7590).

## 3.19.1 (2021-12-09) - Fixes for image component
Several fixes for image component.
Issue [#7484](https://github.com/Altinn/altinn-studio/issues/7484).

## 3.19.0 (2021-12-06) - Create instance from stateless view
Support for starting a stateful app instance from a stateless view.
Issue [#6196](https://github.com/Altinn/altinn-studio/issues/6196).

## 3.18.4 (2021-12-03) - Optimization for mobile view - bug fix
Rollback maxWidth changes from version 3.18.3.
Issue [#7588](https://github.com/Altinn/altinn-studio/pull/7588).

## 3.18.3 (2021-12-01) - Optimization for mobile view - spacing
Fixed maxWidth for input and spacing for address component.
Issue [#6697](https://github.com/Altinn/altinn-studio/issues/6697).

## 3.18.2 (2021-11-30) - Optimization for mobile view - spacing

Fixed spacing for header and paragraph.
Issue [#6697](https://github.com/Altinn/altinn-studio/issues/6697).

## 3.18.1 (2021-11-30) - Optimization for mobile view - maxWidth

Changed max-width of validation error from auto to none.
Issue [#6697](https://github.com/Altinn/altinn-studio/issues/6697).

## 3.18.0 (2021-11-29) - Support for label grid

Support for label grid in grid enabling long lists of short questions and answers to be presented in a table like way
Issue [#7027](https://github.com/Altinn/altinn-studio/pull/7027).

## 3.17.1 (2021-11-24) - Bugfix DataProcessWrite

Fixed bug where numeric fields that gets changed in DataProcessWrite are not updated if their value happened to be 0.
Issue [#7393](https://github.com/Altinn/altinn-studio/issues/7393).

## 3.17.0 (2021-11-24) - Mobile optimization layout

Added some optimized layout for our mobile view.
Issue [#6697](https://github.com/Altinn/altinn-studio/issues/6697).

## 3.16.0 (2021-11-24) - Changed icon for help text
Changed help text icon from plus to question mark.
Issue [#5722](https://github.com/Altinn/altinn-studio/issues/5722).

## 3.15.1 (2021-11-18) - Invalid types for reselect

Fixed invalid types in reselect.
Pull request [#7502](https://github.com/Altinn/altinn-studio/pull/7502).

## 3.15.0 (2021-11-15) - Support for returnUrl

Added support for returnUrl in app-frontend.
Issue [#7183](https://github.com/Altinn/altinn-studio/issues/7183).

## 3.14.2 (2021-11-11) - Patching of json pointer

Patching of external dependency json pointer.
Issue [#7317](https://github.com/Altinn/altinn-studio/issues/7317).

## 3.14.1 (2021-11-11) - Dependency patching

Patching of external dependencies for week 45.
Issue [#7317](https://github.com/Altinn/altinn-studio/issues/7317).

## 3.14.0 (2021-11-08) - Today-flag for datepicker min/max dates

Added a flag to dynamicly control min/max dates based on the current date.
Issue [#7228](https://github.com/Altinn/altinn-studio/issues/7228).

## 3.13.6 (2021-11-04) - Dependency patching
Patching of external dependencies for week 44.
Issue [#7317](https://github.com/Altinn/altinn-studio/issues/7317).

## 3.13.5 (2021-10-28) - Dependency patching
Patching of external dependencies for week 43.
Issue [#7303](https://github.com/Altinn/altinn-studio/issues/7303).

## 3.13.4 (2021-10-22) - Dependency patching
Patching of external dependencies for week 42.
Issue [#7303](https://github.com/Altinn/altinn-studio/issues/7303).

## 3.13.3 (2021-10-15) - Right align text in input fields
Added functionality to right align text in input fields.
Pull request [#7034](https://github.com/Altinn/altinn-studio/pull/7034).

## 3.13.2 (2021-10-14) - Dependency patching
Patching of external dependencies for week 41.
Issue [#7051](https://github.com/Altinn/altinn-studio/issues/7051).

## 3.13.1 (2021-10-13) - Fix for custom validation of attachment
Fixed appfrontend crash on custom validation of an attachment.
Issue [#7107](https://github.com/Altinn/altinn-studio/issues/7107).

## 3.13.0 (2021-10-11) - Start from active instance
Added functionality to start an application from an active instance.
Issue [#6766.](https://github.com/Altinn/altinn-studio/issues/6766)

## 3.12.4 (2021-10-11) - Repeating group open configuration
Added functionality to configure that a repeating group should be opened in edit mode when the app starts.
Solves parts of Issue [#4870.](https://github.com/Altinn/altinn-studio/issues/4870)

## 3.12.3 (2021-10-07) - Dependency patching
Patching of external dependencies for week 40.
Issue [#7051](https://github.com/Altinn/altinn-studio/issues/7051).

## 3.12.2 (2021-10-04) - Fixed design of readonly datepicker component
Readonly datepicker component now follows design of other readonly components.
Issue [#6253.](https://github.com/Altinn/altinn-studio/issues/6253)

## 3.12.1 (2021-09-30) - Dependency patching
Patching of external dependencies for w39.
Issue [#6873.](https://github.com/Altinn/altinn-studio/issues/6873).

## 3.12.0 (2021-09-29) - Image component
Added image component for easier adding of images to our apps.
Issue [#379.](https://github.com/Altinn/altinn-studio/issues/379)

## 3.11.9 (2021-09-29) - Support for JSON Schema 2020-12 in app frontend
Fixed bug where JSON Schema 2020-12 not was supported in app frontend.
Connected issues: [#6703](https://github.com/Altinn/altinn-studio/issues/6703) [#6812.](https://github.com/Altinn/altinn-studio/issues/6812)

## 3.11.8 (2021-09-27) - Added white space between optional label and title text
Added white space between optional label and title text in radiobutton, checkbox and address component.
Issue [#6893](https://github.com/Altinn/altinn-studio/issues/6893).

## 3.11.7 (2021-09-24) - Dependency patching
Patching of external dependencies for w38.
Issue [#6873](https://github.com/Altinn/altinn-studio/issues/6873).

## 3.11.6 (20201-09-21) - Focus indicator input field
Fixed bug for missing focus indicator on input field.
Issue [#6801.](https://github.com/Altinn/altinn-studio/issues/6801)

## 3.11.5 (2021-09-21) - Content loader overflow
Fixed bug where content loader would overflow for small screens.
Issue [#6876.](https://github.com/Altinn/altinn-studio/issues/6876)

## 3.11.4 (2021-09-20) - Fix parsing error in confirm page
Fix for text parsing error in confirm page.
Issue [#6775](https://github.com/Altinn/altinn-studio/issues/6775).

## 3.11.3 (2021-09-17) - Preselect dropdown
Support for preselectedOptionIndex in dropdown component.
Issue [#5255](https://github.com/Altinn/altinn-studio/issues/5255).

## 3.11.2 (2021-09-16) - Dependency patching
Patching of external dependencies for w37.
Issue [#6794](https://github.com/Altinn/altinn-studio/issues/6794).

## 3.11.1 (2021-09-09) - Dependency patching
Patching of external dependencies for w36.
Issue [#6794](https://github.com/Altinn/altinn-studio/issues/6794).

## 3.11.0 (2021-09-08) - Party selection in stateless view
Added functionality for party selection in stateless view.
Issue [#6443](https://github.com/Altinn/altinn-studio/issues/6443).

## 3.10.3 (2021-08-23) - Added some IDs used by automated tests
Non functional change. Not connected to an issue.

## 3.10.2 (2021-08-19) - Dependency patching
Patching of external dependencies for w33.
Issue [#6600](https://github.com/Altinn/altinn-studio/issues/6600).

## 3.10.1 (2021-08-16) - App frontend includes partyID for stateless apps
App frontend includes partyID in calls for fetching stateless data.
Issue [#6609](https://github.com/Altinn/altinn-studio/issues/6609).

## 3.10.0 (2021-08-13) - Log out functionality
Added functionality for log out from app frontend.
Issue [#6620](https://github.com/Altinn/altinn-studio/issues/6620).

## 3.9.9 (2021-08-12) - Dependency patching
Patching of external dependencies for w32.
Issue [#6600](https://github.com/Altinn/altinn-studio/issues/6600).

## 3.9.8 (2021-08-05) - Dependency patching

Patching of external dependencies for w31.
Issue [#6571](https://github.com/Altinn/altinn-studio/issues/6571).

## 3.9.7 (2021-08-03) - Bugfix print view
Fixed a bug where the print view for Altinn Apps would display an empty container.
Issue [#6578](https://github.com/Altinn/altinn-studio/issues/6578).

## 3.9.6 (2021-08-02) - Dependency patching

Patching of external dependencies for w30.
Issue [#6571](https://github.com/Altinn/altinn-studio/issues/6571).

## 3.9.5 (2021-07-28) - Bugfix for mobile view during app startup
Fixed a bug where the app modal would behave inconsistent during app startup on mobile devices.
Issue [#6558](https://github.com/Altinn/altinn-studio/issues/6558).

## 3.9.4 (2021-07-23) - Bugfix validation trigger for groups.
Fix a bug where validations would not be triggered when closing a repeating group by clicking `Edit` button when trigger was present.
Issue [#6427](https://github.com/Altinn/altinn-studio/issues/6427).

## 3.9.3 (2021-07-23) - Dependency patching
Patching of external dependencies for w29.

## 3.9.2 (2021-07-02) - Dependency patching
Patching of external dependencies for w26.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385).

## 3.9.1 (2021-07-01) - Support for redirect to require higher authentication level for stateless app
Fix for bug that didn't redirect user to login page with allowed authentication levels if logged in with a too low level.
Issue [#6506](https://github.com/Altinn/altinn-studio/issues/6506).

## 3.8.0 (2021-06-29) - Several updates to validation functionality
- Support for adding custom error messages to client side validations (JSON schema).
- Support for specifying single field validation (server) as FIXED to make sure resolved validation error messages are removed.
- Fixes bug where single field validation that returned empty (no errors/warnings) did not remove existing validation messages.
Issue [#5747](https://github.com/Altinn/altinn-studio/issues/5747).

## 3.7.0 (2021-06-29) - Support for posting data from stateless app
Issue [#6194](https://github.com/Altinn/altinn-studio/issues/6194).

## 3.6.14 (2021-06-22) - Bug fix for duplicated validation messages
Fixed a bug that caused validation messages on a FileUpload component to be displayed twice.
Issue [#6400](https://github.com/Altinn/altinn-studio/issues/6400).

## 3.6.13 (2021-06-18) - Bugfix for replaceAll with variables in text
Fix for bug introduced in 3.6.9, where only the last variable in texts with multiple variables was replaced. 
The change in 3.6.9 also caused summary page to fail in some cases.
Issue [#6455](https://github.com/Altinn/altinn-studio/issues/6455).

## 3.6.12 (2021-06-18) - Dependency patching
Patching of external dependencies.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385).

## 3.6.11 (2021-06-16) - Bugfix for disappearing validation messages
Fixed bug for disappearing validation messages. Single field validation response would overwrite all 
existing validations, causing earlier triggered validation messages to disappear.
Issue [#5857](https://github.com/Altinn/altinn-studio/issues/5857).

## 3.6.10 (2021-06-15) - Bugfix for navigation buttons with multiple triggers
Fixed bug for navigation buttons configured with multiple triggers, where only the first one was actually triggered.
Issue [#6387](https://github.com/Altinn/altinn-studio/issues/6387).

## 3.6.9 (2021-06-14) - Bugfix variables in text

Fixed bug where only first occurrence of a variable in a given text was replaced.
Issue [#6091](https://github.com/Altinn/altinn-studio/issues/6091)

## 3.6.8 (2021-06-11) - New endpoints for stateless app
New endpoints for stateless app.
Issue [#6227](https://github.com/Altinn/altinn-studio/issues/6227)

## 3.6.7 (2021-06-10) - Dependency patching
Patching of external dependencies.
Issue [#6385](https://github.com/Altinn/altinn-studio/issues/6385)

## 3.6.6 (2021-06-09) - Dependency patching
Updated to latest major version of react v17. 
Issue [#5072](https://github.com/Altinn/altinn-studio/issues/5072)

## 3.6.5 (2021-06-02) Bugfix for stateless app 
Fixed bug where stateless app with onEntry.show set to `new-instance` would crash.
Issue [#6321](https://github.com/Altinn/altinn-studio/issues/6321).

## 3.6.4 (2021-06-02) Bugfix for simple receipt
Fixed bug where simple receipt did not parse markdown if the app overrides defult texts.
Issue [#6232](https://github.com/Altinn/altinn-studio/issues/6362).

## 3.6.3 (2021-06-02) Bugfix for content loader
Fixed bug where content loader did not scale for whole view.
Issue [#4888](https://github.com/Altinn/altinn-studio/issues/4888).

## 3.6.2 (2021-06-01) Bugfix for summary view of group with multiple pages
Fixed bug that caused app frontend to crash when rendering summary component for group when the group was defined with
multiple pages in edit mode.
Issue [#6233](https://github.com/Altinn/altinn-studio/issues/6233).

## 3.6.1 (2021-05-28) Dependency patching
Patching of external dependencies. Issue [#6324](https://github.com/Altinn/altinn-studio/issues/6324).

## 3.6.0 (2021-05-28) Support for hiding back button in apps
Issue [#6193](https://github.com/altinn/altinn-studio/issues/6193).

## 3.5.0 (2021-05-27) Support for number formatting
Added support for formatting numbers for `Input`-components. 
Issue [#5972](https://github.com/altinn/altinn-studio/issues/5972).

## 3.4.2 (2021-05-26) Improve look of summary for checkboxes component
Issue [#6329](https://github.com/Altinn/altinn-studio/issues/6329).

## 3.4.1 (2021-05-20) Dependency patching
Patching of external dependencies. Issue [#6221](https://github.com/Altinn/altinn-studio/issues/6221).

## 3.4.0 (2021-05-18) Support for stateless apps
Issue [#6124](https://github.com/Altinn/altinn-studio/issues/6124).

## 3.3.5 (2021-05-14) - Dependency patching
Patching of external dependencies. Issue [#6221](https://github.com/Altinn/altinn-studio/issues/6221).

## 3.3.4 (2021-05-11) Bugfix for calculation in groups
Issue [#6235](https://github.com/Altinn/altinn-studio/issues/6235).

## 3.3.3 (2021-05-11) Run data validation on page switch, and fix group component mobile view
Issue [#6236](https://github.com/Altinn/altinn-studio/issues/6236).
Issue [#5977](https://github.com/Altinn/altinn-studio/issues/5977).

## 3.3.2 (2021-05-06) - Dependency patching
Patching of external dependencies. Issue [#6011](https://github.com/Altinn/altinn-studio/issues/6011).

## 3.3.1 (2021-05-06) Support for markdown in validation messages
Issue [#5137](https://github.com/Altinn/altinn-studio/issues/5137).

## 3.3.0 (2021-05-03) Support for multiple views in repeating group edit mode
Issue [#5869](https://github.com/Altinn/altinn-studio/issues/5869).

## 3.2.2 (2021-04-23) - Dependency patching
Patching of external dependencies. Issue [#6011.](https://github.com/Altinn/altinn-studio/issues/6011)

## 3.2.1 (2021-04-23) - Bugfix for group validations
Fixed a bug where groups with validation trigger would call the instance validation api. Now calls data validation. Issue [#6089.](https://github.com/Altinn/altinn-studio/issues/6089)

## 3.2.0 (2021-04-21) - Validation on group save
Added support for running validations on a group when the user tries to save an entry. Issue [#5281.](https://github.com/Altinn/altinn-studio/issues/5281)

## 3.1.6 (2021-04-19) - Bugfix for checkbox values in summary component
Fixed bug where summary would display an empty string for checkboxes with multiple selected values. Issue [#5993.](https://github.com/Altinn/altinn-studio/issues/5993)

## 3.1.5 (2021-04-19) - Bugfix for repeating group state on calculation
Fixed bug where repeating group state would not be updated if a backend calculation had altered a repeating group. Issue [#6006.](https://github.com/Altinn/altinn-studio/issues/6006)

## 3.1.4 (2021-04-19) - Bugfix for validations on group delete
Fixed bug where validations for a given group index would not be removed on delete. Issue [#5960.](https://github.com/Altinn/altinn-studio/issues/5960)

## 3.1.3 (2021-04-16) - Bugfix for validation
Fixed bug where single field validation would validate the whole instance and not data. Issue [#5885.](https://github.com/Altinn/altinn-studio/issues/5885)

## 3.1.2 (2021-04-12) - Dependency patching.
Patching of external dependencies. Issue [#5957.](https://github.com/Altinn/altinn-studio/issues/5957)

## 3.1.1 (2021-04-09) - Bugfix for slow calculate 
Fixed bug where a slow backend calculation can overwrite later entered data. Issue [#5754.](https://github.com/Altinn/altinn-studio/issues/5754)

## 3.1.0 (2021-04-07)- Help text for paragraph and header components
App now supports help text for paragraph and header components. Issue [#5862.](https://github.com/Altinn/altinn-studio/issues/5862)

## 3.0.16 (2021-04-06) - Dependency patching
Patching of external dependencies. Issue [#5877.](https://github.com/Altinn/altinn-studio/issues/5877)

## 3.0.15 (2021-03-22) - Bugfix for group component with checkboxes
Fixed bug where group component summary would display an empty value for checkboxes that had several selected values. Issue [#5907.](https://github.com/Altinn/altinn-studio/issues/5907)

## 3.0.14 (2021-03-19) - Dependency patching
Patching of external dependencies. Issue [#5877.](https://github.com/Altinn/altinn-studio/issues/5877) 

## 3.0.13 (2021-03-18) - Internal typings 
App frontend internal typings updated to fix failing tests. No issue connected.

## 3.0.12 (2021-03-17) - Bugfix for markdown support in summary and group titles
Fixed bug where app frontend would not render markdown in summary and group titles. Issue [#5781.](https://github.com/Altinn/altinn-studio/issues/5781)

## 3.0.11 (2021-03-17) - Bugfix for page order calculation
Fixed bug where app frontend would trigger call to calculate page order even when no calculation trigger was present. Issue [#5863.](https://github.com/Altinn/altinn-studio/issues/5863)

## 3.0.10 (2021-03-12) - Bugfix for page order calculation 
Fixed bug where app frontend would trigger call to calculate page order for single page applications. Issue [#5859.](https://github.com/Altinn/altinn-studio/issues/5859) 

## 3.0.9 (2021-03-12) - Dependency patching
Patching of external dependencies. Issue [#5771.](https://github.com/Altinn/altinn-studio/issues/5771) 


## 3.0.8 (2021-03-12) - Support for dynamicly getting page order
App frontend now supports dynamicly fetching the page order on next page ("sporvalg"). See [docs](https://altinn.github.io/docs/altinn-studio/app-creation/sporvalg/) for more information. Issue [#5640.](https://github.com/Altinn/altinn-studio/issues/5640) 

## 3.0.7 (2021-03-09) - Bugfix for page caching
Fixed issue where the app would cache the first page in alphabetical order and not respect the order in Settings.json. Issue [#5819.](https://github.com/Altinn/altinn-studio/issues/5819)

## 3.0.6 (2021-03-08) - Caching of last viewed page

Introduced caching of the last viewed form page, so user is returned to this page when refreshing or coming back at a
later
time. Issue [#5278.](https://github.com/Altinn/altinn-studio/issues/5278)

## 3.0.5 (2021-03-05) - Dependency patching

Patching of external dependencies. Issue [#5770.](https://github.com/Altinn/altinn-studio/issues/5770)

## 3.0.4 (2021-03-05) - Bugfix for text styling in titles/descriptions

Fix issue where label and description texts would get cut off mid word.
Issue [#5810.](https://github.com/Altinn/altinn-studio/issues/5810)

## 3.0.3 (2021-03-02) - Bugfix for metadata with layout sets

Fix issue where app-frontend fetched wrong metadata when using layout sets.
Issue [#5624.](https://github.com/Altinn/altinn-studio/issues/5624)

## 3.0.2 (2021-02-26) - Dependency patching

Patching of external dependencies. Issue [#5676.](https://github.com/Altinn/altinn-studio/issues/5676)

## 3.0.1 (2021-02-25) - Horizontally aligned components & Bugfix for loading options

App-frontend now supports horizontally aligned components.
See [docs](https://altinn.github.io/docs/altinn-studio/app-creation/ui-editor/layout-style/#sidestilte-komponenter) for
more information. Issue [#1515.](https://github.com/Altinn/altinn-studio/issues/1515)

Fix issue that only loaded options related to form layout in first data task - for subsequent data tasks
options were not loaded. Issue [#5619.](https://github.com/Altinn/altinn-studio/issues/5619)

## 3.0.0 (2021-02-23) - New font for App Frontend

This version changes the font for the app frontend from Roboto to Altinn-DIN.
For the apps to show fonts as expected, some changes need to be made. See [breaking changes](../breaking-changes)
for the details.
