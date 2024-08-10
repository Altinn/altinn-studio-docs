#!/bin/bash


# Function to create directory and Markdown files
make_dir() {
    mkdir -p "$1"
    cat > "$1/index.nb.md" <<EOF
---
title: '$2'
linktitle: '$2'
description: '$4'
---

{{<notice warning>}}
Informasjon om Dialogporten er foreløpig kun tilgjengelig på engelsk.
{{</notice>}}

{{<children />}}
EOF
    cat > "$1/index.en.md" <<EOF
---
title: '$3'
linktitle: '$3'
description: '$5'
---

{{<children />}}
EOF
}

# Base directory for the Hugo project
base_dir="dialogporten"

# Remove base directory if it exists to avoid duplication
rm -rf "$base_dir"

# Create base directory
mkdir -p "$base_dir"
cd "$base_dir"

# Manual directory structure creation based on the TOC
make_dir "introduction" "Introduksjon" "Introduction" "En kort introduksjon til Dialogporten." "A brief introduction to Dialogporten."
make_dir "concepts-and-definitions" "Konsepter og begrep" "Concepts and Definitions" "Viktige konsepter og begreper i Dialogporten." "Key concepts and definitions in Dialogporten."
make_dir "concepts-and-definitions/conceptual-model" "Begrepsmodell" "Conceptual Model" "Beskrivelse av Dialogportens begrepsmodell." "Description of Dialogportens conceptual model."
make_dir "concepts-and-definitions/high-level-conceptual-sketch" "Overordnet konseptskisse" "High-level Conceptual Sketch" "En overordnet skisse av konseptene i Dialogporten." "A high-level sketch of concepts in Dialogporten."
make_dir "gui" "Frontend (\"Arbeidsflate\")" "Frontend (\"Arbeidsflate\")" "Informasjon om arbeidsflaten i Dialogporten." "Information about the frontend in Dialogporten."
make_dir "authorization" "Autorisasjon" "Authorization" "Autorisasjonsmekanismer i Dialogporten." "Authorization mechanisms in Dialogporten."
make_dir "authorization/usage-in-policies" "Bruk i policies" "Usage in Policies" "Hvordan autorisasjon brukes i policies." "How authorization is used in policies."
make_dir "authorization/authorization-attributes" "Autorisasjonsattributter" "Authorization Attributes" "Beskrivelse av autorisasjonsattributter." "Description of authorization attributes."
make_dir "authorization/dialog-token" "Dialogtoken" "Dialog Token" "Informasjon om dialogtoken." "Information about dialog tokens."
make_dir "events" "Hendelser" "Events" "Håndtering av hendelser i Dialogporten." "Handling events in Dialogporten."
make_dir "events/on-creation" "Ved opprettelse" "On Creation" "Hendelser ved opprettelse av dialog." "Events on creation of a dialog."
make_dir "events/on-change" "Ved endring" "On Change" "Hendelser ved endring av dialog." "Events on change of a dialog."
make_dir "events/consuming-events" "Konsumere hendelser" "Consuming Events" "Hvordan konsumere hendelser i Dialogporten." "How to consume events in Dialogporten."
make_dir "guides" "Guider" "Guides" "Veiledninger for bruk av Dialogporten." "Guides for using Dialogporten."
make_dir "guides/service-owner" "Tjenesteeier" "Service Owner" "Informasjon for tjenesteeiere." "Information for service owners."
make_dir "guides/service-owner/service-owner-on-altinn-3" "Tjenesteeier på Altinn 3" "Service Owner on Altinn 3" "Veiledning for tjenesteeiere på Altinn 3." "Guide for service owners on Altinn 3."
make_dir "guides/service-owner/service-owner-on-altinn-3/get-started" "Kom i gang" "Get Started" "Hvordan komme i gang som tjenesteeier på Altinn 3." "How to get started as a service owner on Altinn 3."
make_dir "guides/service-owner/service-owner-on-altinn-3/create-dialog" "Opprette dialog" "Create Dialog" "Hvordan opprette en dialog på Altinn 3." "How to create a dialog on Altinn 3."
make_dir "guides/service-owner/service-owner-on-altinn-3/update-dialog" "Oppdatere dialog" "Update Dialog" "Hvordan oppdatere en dialog på Altinn 3." "How to update a dialog on Altinn 3."
make_dir "guides/service-owner/service-owner-on-altinn-3/end-dialog" "Avslutte dialog" "End Dialog" "Hvordan avslutte en dialog på Altinn 3." "How to end a dialog on Altinn 3."
make_dir "guides/service-owner/service-owner-on-altinn-3/cancel-delete-dialog" "Avbryte/slette dialog" "Cancel/Delete Dialog" "Hvordan avbryte eller slette en dialog på Altinn 3." "How to cancel or delete a dialog on Altinn 3."
make_dir "guides/service-owner/service-owner-outside-altinn-3" "Tjenesteeier utenfor Altinn 3" "Service Owner outside Altinn 3" "Veiledning for tjenesteeiere utenfor Altinn 3." "Guide for service owners outside Altinn 3."
make_dir "guides/service-owner/service-owner-outside-altinn-3/get-started" "Kom i gang" "Get Started" "Hvordan komme i gang som tjenesteeier utenfor Altinn 3." "How to get started as a service owner outside Altinn 3."
make_dir "guides/service-owner/service-owner-outside-altinn-3/create-dialog" "Opprette dialog" "Create Dialog" "Hvordan opprette en dialog utenfor Altinn 3." "How to create a dialog outside Altinn 3."
make_dir "guides/service-owner/service-owner-outside-altinn-3/update-dialog" "Oppdatere dialog" "Update Dialog" "Hvordan oppdatere en dialog utenfor Altinn 3." "How to update a dialog outside Altinn 3."
make_dir "guides/service-owner/service-owner-outside-altinn-3/end-dialog" "Avslutte dialog" "End Dialog" "Hvordan avslutte en dialog utenfor Altinn 3." "How to end a dialog outside Altinn 3."
make_dir "guides/service-owner/service-owner-outside-altinn-3/cancel-delete-dialog" "Avbryte/slette dialog" "Cancel/Delete Dialog" "Hvordan avbryte eller slette en dialog utenfor Altinn 3." "How to cancel or delete a dialog outside Altinn 3."
make_dir "guides/system-providers" "Systemleverandører" "System Providers" "Informasjon for systemleverandører." "Information for system providers."
make_dir "guides/system-providers/get-started" "Kom i gang" "Get Started" "Hvordan komme i gang som systemleverandør." "How to get started as a system provider."
make_dir "guides/system-providers/search-for-dialogs" "Søke etter dialoger" "Search for Dialogs" "Hvordan søke etter dialoger." "How to search for dialogs."
make_dir "guides/system-providers/retrieve-dialog" "Hente dialog" "Retrieve Dialog" "Hvordan hente en dialog." "How to retrieve a dialog."
make_dir "guides/system-providers/detect-changes" "Oppdage endringer" "Detect Changes" "Hvordan oppdage endringer i dialoger." "How to detect changes in dialogs."
make_dir "guides/system-providers/perform-actions" "Utføre handlinger" "Perform Actions" "Hvordan utføre handlinger i dialoger." "How to perform actions in dialogs."
make_dir "guides/system-providers/perform-actions/front-channel-writes" "Front channel writes" "Front Channel Writes" "Skriving gjennom frontkanal." "Writing through front channel."
make_dir "guides/system-providers/retrieve-dialog-elements" "Hente dialogelementer" "Retrieve Dialog Elements" "Hvordan hente dialogelementer." "How to retrieve dialog elements."
make_dir "guides/system-providers/retrieve-dialog-elements/front-channel-embeds" "Front channel embeds" "Front Channel Embeds" "Innebygging gjennom frontkanal." "Embedding through front channel."
make_dir "guides/system-providers/migration-from-altinn-2" "Migrering fra Altinn 2" "Migration from Altinn 2" "Veiledning for migrering fra Altinn 2." "Guide for migration from Altinn 2."

echo "Directories and files created successfully."