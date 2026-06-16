---
title: SigningActions
draft: true
---

## Properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `type` | Required. | `"SigningActions"` |
| `textResourceBindings` | See [Text resource bindings](#text-resource-bindings-textresourcebindings). |  |

## Text resource bindings (`textResourceBindings`)

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `awaitingSignaturePanelTitle` | The title of the panel that is displayed when the user should sign |  |
| `checkboxLabel` | The text to display when a user is asked to confirm what they are signing |  |
| `checkboxDescription` | A text that describes the checkbox label in more detail if needed |  |
| `signingButton` | The text to display in the button that the user clicks in order to sign |  |
| `noActionRequiredPanelTitleHasSigned` | The title of the panel that is displayed when the user has signed and no further action is required |  |
| `noActionRequiredPanelTitleNotSigned` | The title of the panel that is displayed when the user has not signed and no further action is required |  |
| `noActionRequiredPanelDescriptionHasSigned` | The description of the panel that is displayed when the user has signed and no further action is required |  |
| `noActionRequiredPanelDescriptionNotSigned` | The description of the panel that is displayed when the user has not signed and no further action is required |  |
| `noActionRequiredButton` | The text to display in the button that the user clicks in order to go to the inbox and no further action is required |  |
| `awaitingOtherSignaturesPanelTitle` | The title for the panel when the signing task is not ready for submit |  |
| `awaitingOtherSignaturesPanelDescriptionNotSigning` | The description for the panel when the current user is not signing |  |
| `awaitingOtherSignaturesPanelDescriptionSigned` | The description for the panel when the current user has signed |  |
| `submitPanelTitle` | The title for the panel when the signing task is ready for submit |  |
| `submitPanelDescription` | The description for the panel when the signing task is ready for submit |  |
| `submitButton` | The text to display in the button that the user clicks in order to submit the signing task |  |
| `errorPanelTitle` | The title of the panel that is displayed when at least one of the signees is invalid and thus has not received access to the form |  |
| `errorPanelDescription` | The description of the panel that is displayed when at least one of the signees is invalid and thus has not received access to the form |  |
| `rejectModalTitle` | The title of the modal that is displayed when the use clicked on the reject button |  |
| `rejectModalDescription` | The description of the modal that is displayed when the use clicked on the reject button |  |
| `rejectModalButton` | The text to display in the button that the user clicks in the modal in order to confirm reject of the signing task |  |
| `rejectModalTriggerButton` | The text to display in the button that triggers the reject modal |  |

## Common properties

| Property | Description | Allowed Values |
|----------|-------------|----------------|
| `id` | The component ID. Must be unique within all layouts/pages in a layout-set. Cannot end with &lt;dash&gt;&lt;number&gt;. Required. |  |
| `hidden` | Boolean value or expression indicating if the component should be hidden. Defaults to false. |  |
| `grid` | Settings for the components grid. Used for controlling horizontal alignment |  |
| `grid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid` |  |  |
| `grid.labelGrid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.labelGrid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid` |  |  |
| `grid.innerGrid.xs` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.sm` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.md` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.lg` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `grid.innerGrid.xl` |  | `"auto"`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12` |
| `pageBreak` | Optionally insert page-break before/after component when rendered in PDF |  |
| `pageBreak.breakBefore` | PDF only: Value or expression indicating whether a page break should be added before the component. Can be either: 'auto' (default), 'always', or 'avoid'. |  |
| `pageBreak.breakAfter` | PDF only: Value or expression indicating whether a page break should be added after the component. Can be either: 'auto' (default), 'always', or 'avoid'. |  |
