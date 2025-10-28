---
title: 'Integrating Altinn Apps'
description: 'How to override or enrich the automatic Dialogporten integration from your app'
weight: 50
---

## Introduction

Altinn Apps are automatically synchronized with Dialogporten. Every time a new
instance is created, the dialog service will create or update a corresponding
dialog that is visible to the end user in Altinn Inbox ("arbeidsflate"). This
guide explains how the default behaviour can be adjusted and how you can take
full control over the integration if needed.

## Automatic dialog synchronization

By default, the synchronization is enabled for all applications. Updates to the
instance, such as status changes, added activities or attachments, will be
reflected in Dialogporten. The behaviour can be tuned in the app settings. See the
reference information linked below for details.

**Read more**

* {{<link "../../../reference/front-end/altinn-apps">}}

## Using the Dialogporten WebAPI SDK

Some scenarios require more control than the automatic synchronization offers.
The [Dialogporten WebAPI SDK](https://github.com/Altinn/dialogporten/tree/main/src/Digdir.Library.Dialogporten.WebApiClient)
gives your application programmatic access to Dialogporten so you can create and
update dialogs yourself. This enables fine-grained handling of activities,
transmissions and synchronization with Altinn Inbox.

## Convention-based use of application texts

Altinn Apps can automatically resolve localized text content for dialogs by following a convention-based key lookup.
It searches for specific keys in your application texts with a fallback mechanism.

### Key Resolution Order

The system attempts to find the most specific key first, then falls back to more general keys in this order:

1. **Active task for status** - Most specific match
2. **Active task** - Task-specific match
3. **Any task for status** - Status-specific match
4. **Any task and any status** - Most general match

### Key Format Structure

All keys follow this pattern (case-insensitive, converted to lowercase):

dp.{content_type}[.{task}[.{state}]]

**Components:**

- **content_type** (required): One of:
  - `title` - Dialog title
  - `summary` - Dialog summary/description
  - `primaryactionlabel` - Primary action button text
  - `secondaryactionlabel` - Secondary action button text
  - `tertiaryactionlabel` - Tertiary action button text

- **task** (optional): Either:
    - A specific task name (alphanumeric with internal dashes or underscores)
    - `_any_` for wildcard matching

- **state** (optional): The instance status, such as:
  - `archivedunconfirmed`, `archivedconfirmed`
  - `rejected`
  - `awaitingserviceownerfeedback`, `awaitingconfirmation`
  - `awaitingsignature`, `awaitingadditionaluserinput`
  - `awaitinginitialuserinput`, `awaitinginitialuserinputfromprefill`

### Examples

**Basic content:**

* `dp.title` General dialog title
* `dp.summary` General dialog summary
* `dp.primaryactionlabel` General primary action text

**Task-specific:**

* `dp.title.DataEntry` Title for DataEntry task
* `dp.summary.Review` Summary for a Review task
* `dp.primaryactionlabel.Sign` Primary action for a Sign task
* `dp.primaryactionlabel._any_` Primary action for any tasks

**State-specific:**

* `dp.title.DataEntry.awaitinginitialuserinput` Title for DataEntry task awaiting input
* `dp.summary._any_.rejected` Summary for any task when rejected
* `dp.primaryactionlabel.Sign.awaitingsignature` Action label A for a Sign task awaiting signature

### Default Fallback Values

If no custom application text keys are found, the system provides built-in default values for summaries based on the
instance status:

#### Title Text Defaults

Uses the Title of the app

#### Summary Text Defaults

| Status                                 | Norwegian (nb)                                                                                                                            | Nynorsk (nn)                                                                                                                            | English (en)                                                                                                                                    |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **archivedunconfirmed**                | Innsendingen er maskinelt kontrollert og formidlet, venter på endelig bekreftelse. Du kan åpne dialogen for å se en foreløpig kvittering. | Innsendinga er maskinelt kontrollert og formidla, ventar på endeleg stadfesting. Du kan opne dialogen for å sjå ei førebels kvittering. | The submission has been automatically checked and forwarded, awaiting final confirmation. You can open the dialog to see a preliminary receipt. |
| **archivedconfirmed**                  | Innsendingen er bekreftet mottatt. Du kan åpne dialogen for å se din kvittering.                                                          | Innsendinga er stadfesta motteken. Du kan opne dialogen for å sjå di kvittering.                                                        | The submission has been confirmed as received. You can open the dialog to see your receipt.                                                     |
| **rejected**                           | Innsendingen ble avvist. Åpne dialogen for mer informasjon.                                                                               | Innsendinga vart avvist. Opne dialogen for meir informasjon.                                                                            | The submission was rejected. Open the dialog for more information.                                                                              |
| **awaitingserviceownerfeedback**       | Innsendingen er maskinelt kontrollert og formidlet, venter på tilbakemelding.                                                             | Innsendinga er maskinelt kontrollert og formidla, ventar på tilbakemelding.                                                             | The submission has been automatically checked and forwarded, awaiting feedback.                                                                 |
| **awaitingconfirmation**               | Innsendingen må bekreftes for å gå til neste steg.                                                                                        | Innsendinga må stadfestast for å gå til neste steg.                                                                                     | The submission must be confirmed to proceed to the next step.                                                                                   |
| **awaitingsignature**                  | Innsendingen må signeres for å gå til neste steg.                                                                                         | Innsendinga må signerast for å gå til neste steg.                                                                                       | The submission must be signed to proceed to the next step.                                                                                      |
| **awaitingadditionaluserinput**        | Innsendingen er under arbeid og trenger flere opplysninger for å gå til neste steg.                                                       | Innsendinga er under arbeid og treng fleire opplysningar for å gå til neste steg.                                                       | The submission is in progress and requires more information to proceed to the next step.                                                        |
| **awaitinginitialuserinput** (default) | Innsendingen er klar for å fylles ut.                                                                                                     | Innsendinga er klar til å fyllast ut.                                                                                                   | The submission is ready to be filled out.                                                                                                       |

#### Primary Action Label Defaults

| Instance Status                      | Norwegian (nb)         | Nynorsk (nn)           | English (en)          |
|--------------------------------------|------------------------|------------------------|-----------------------|
| **Archived** (any archived status)   | Se innsendt skjema     | Sjå innsendt skjema    | See submitted form    |
| **Active** (any non-archived status) | Gå til skjemautfylling | Gå til skjemautfylling | Go to form completion |

#### Secondary Action Label Defaults

| Status  | Norwegian Bokmål (nb) | Norwegian Nynorsk (nn) | English (en) |
|---------|-----------------------|------------------------|--------------|
| **any** | Slett                 | Slett                  | Delete       |

#### Tertiary Action Label Defaults

| Status  | Norwegian Bokmål (nb) | Norwegian Nynorsk (nn) | English (en)    |
|---------|-----------------------|------------------------|-----------------|
| **any** | Lag en kopi           | Lag en kopi            | Create new copy |

### Implementation Notes

- All keys are converted to lowercase during lookup
- Task names can contain letters, numbers, dashes (-), and underscores (_)
- Task names must start and end with alphanumeric characters
- Use `_any_` as a wildcard to match any task name
- The system returns the first match found following the resolution order