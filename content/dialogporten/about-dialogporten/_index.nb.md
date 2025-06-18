---
title: 'Om Dialogporten'
description: 'En kort introduksjon til Dialogporten.'
weight: 10
---

## Hva er Dialogporten?
Dialogporten er en løsning som fungerer som et felles API og metadata-lager for digitale dialoger. Hovedmålet med Dialogporten er å legge til rette for sikker og effektiv kommunikasjon mellom offentlige tjenesteplattformer (som Altinn) og brukere ved å tilby en standardisert måte å håndtere digitale dialoger og meldinger på. Dette innebærer å administrere metadataene knyttet til disse dialogene og sikre interoperabilitet på tvers av ulike systemer.

## Hva er lagret i Dialogporten?
Dialogporten inneholder "dialoger", som er representasjoner av en bestemt instans av en digital tjeneste. En dialog består av en avsender (vanligvis en offentlig aktør), en mottaker (en borger eller organisasjon) og en referanse til en digital tjenestedefinisjon i [Altinn Resource Registry]({{<relref "../../authorization/what-do-you-get/resourceregistry">}}), som i seg selv inneholder informasjon om selve tjenesten samt autorisasjonspolicyer som styrer bruken av den.

I tillegg inneholder en dialog noe innhold som brukes til å beskrive statusen til dialogen for sluttbrukere og gi informasjon om hva brukeren bør gjøre (om noe), for eksempel et tittelfelt, en kort sammendragstekst og aktivitetshistorikk som viser de forskjellige handlingene som er utført og statusendringer gjennom hele dialogens levetid.

## Hva er ikke lagret i Dialogporten?
Faktisk innhold, som brødtekster, skjemaer, skjemadata som er fylt ut av brukere, vedlegg osv., er ikke inkludert i dialogen, men bare _referert_ ved hjelp av URL-er som peker til ressursene på den digitale tjenesteplattformen der tjenesten er realisert.

## Hvordan fungerer dette?
Dialogporten er "kun-les"{{<footnote "Det er to unntak; [dialogetiketter](../getting-started/dialogs/#dialogetiketter), som brukere kan tildele for å holde dialogene organisert, og [sett logg](../getting-started/seen-log) som holder styr på brukerens tilgang til dialoger." >}} for sluttbrukere. De digitale tjenesteplattformene (f.eks. Altinn), som vi refererer til som "tjenesteleverandører", utfører skrivingen til dialogen på vegne av en tjenesteeier (den offentlige aktøren). Dette betyr at selv om brukerne kan se statusen og metadataene til sine dialoger gjennom Dialogporten, administreres og registreres alle oppdateringer eller handlinger av selve tjenesteplattformen - vanligvis synkront med at brukeren samhandler med den relevante tjenesten, f.eks. fyller ut eller sender inn et skjema. Dette sikrer at dataene forblir konsistente og sikre på tvers av alle involverte systemer.
{{<displayFootnotes>}}

## Hvordan bruker app-utviklere i Altinn Dialogporten?
Altinn-plattformen vil automatisk gjøre alle [app-instanser]({{<relref "../../api/models/instance/">}}) og [Altinn-meldinger]({{<relref "../../../correspondence">}}) tilgjengelige i Dialogporten, eksponere relevant informasjon og handlinger, og vil oppdatere representasjonen etterhvert som app-instansen/Altinn-meldingen blir oppdatert.

For ytterligere kontroll benytter [app template]({{<relref "../../../app-template/_index.md">}}) en [Dialogporten API-klient]({{<relref "../user-guides/service-owners/api-client">}}) som gjør det mulig for appen å ta full kontroll over hvordan appen er representert i Dialogporten, og dermed portaler som Altinn-innboksen ("arbeidsflate").

{{% notice warning %}}
App template-integrasjonen er under utvikling. Foreløpig må app-utviklere bruke [Dialogporten API-klientens NuGet-pakke](https://www.nuget.org/packages/Altinn.ApiClients.Dialogporten) direkte.
{{% /notice %}}

## Hvor finner brukeren dialogene?
Brukere kan få tilgang til sine dialoger ved å logge inn på altinn.no og navigere til sin "arbeidsflate", som er det felles Dialogporten-grensesnittet (tidligere kalt "innboks"). Dette benytter Dialogporten sluttbruker-APIer for å søke etter og vise dialoger og visualiserer dialogene, og gir brukerne et intuitivt grensesnitt for å administrere sine interaksjoner. I tillegg kan andre sluttbrukersystemer bruke de samme APIene for å skape skreddersydde brukeropplevelser, noe som gir fleksibel integrasjon med ulike tjenesteleverandørplattformer.

{{<notice info>}}
Neste generasjon av Altinn-innboksen GUI er under utvikling og er foreløpig kun tilgjengelig i Altinns testmiljø TT02. Følg utviklingen av "Arbeidsflate" i [roadmap](https://github.com/orgs/digdir/projects/8/views/28)
{{</notice>}}

## Neste steg
Les mer om hva Dialogporten har å tilby av funksjonalitet og funksjoner på høyt nivå

* {{<link "../what-do-you-get">}}