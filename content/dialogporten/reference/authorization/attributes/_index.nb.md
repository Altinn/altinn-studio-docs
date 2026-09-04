---
title: 'Autorisasjonsattributter'
description: 'Referanseinformasjon om autorisasjonsattributter'
weight: 10
---

{{<notice warning "deprecated">}}
Autorisasjonsattributter er utfaset til fordel for [autorisasjonskontekster]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}), som dekker de samme brukstilfellene i tillegg til tilgang for flere parter og kontroll over hva en uautorisert sluttbruker ser. Autorisasjonsattributter fortsetter å fungere; det finnes ingen dato for fjerning.
{{</notice>}}

## Introduksjon

Se [komme i gang med autorisasjonsattributter](/nb/dialogporten/reference/authorization/attributes/../../../getting-started/authorization/attributes/) for en funksjonell oversikt over autorisasjonsattributter og hva de kan brukes til.

Autorisasjonsattributter er en måte å kontrollere hvordan XACML-forespørselen er konstruert for en gitt dialog, noe som gjør det mulig å ha mer finkornede regler og til og med referere til flere distinkte ressurspolicyer.

{{<notice warning>}}
En gammel handling uten noe autorisasjonsattributt i det hele tatt autoriseres nå mot nøyaktig den ressursen entiteten refererer til, ikke bare «en eller annen entitet i denne dialogen har et treffende tillat». Hvis du er avhengig av at en handling gis implisitt gjennom en annen entitets tillatelse på hovedressursen, gjelder ikke det lenger.
{{</notice>}}

{{<notice info>}}
Autorisasjonsattributter vurderes bare i single dialog-endepunkter, dvs. når du ber om en dialog etter ID. For dialogsøk/lister blir ikke autorisasjonsattributtene vurdert.
{{</notice>}}

## Bruk

Autorisasjonsattributter kan leveres på:

* GUI-handlinger
* API-handlinger
* Overføringer

## Grunnleggende format

Verdien til autorisasjonsattributtet vil bli mappet til en XACML-ressurs som Altinn Authorization kan forstå, dvs. en URN. Gyldige eksempler:

```
urn:altinn:subresource:mysubresource
urn:altinn:task:Task_1
urn:altinn:resource:someotherresource
```

{{<notice info>}}
I tillegg kan en bar ikke-URN-streng som `foobar` leveres som en snarvei for `urn:altinn:subresource:foobar`
{{</notice>}}

Autorisasjonsattributtet er delt ved det siste segmentet, og den første delen brukes som *attributt-ID* og den andre delen som *attributtverdi*.

## Mapping til XACML

Eks. gitt en dialog som har `ServiceResource` satt til `urn:altinn:resource:myfirstservice` og en GUI/API-handling formet som dette på en dialog:

```json
{
    "action": "sign",
    "authorizationAttribute": "urn:altinn:task:gm_signing_task",
    ...
}
```

vil resultere i en XACML-forespørsel som dette:

```json
{
  "Request": {
    "AccessSubject": [ /* information about the user omitted */ ],
    "Action": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "sign"
          }
        ]
      }
    ],
    "Resource": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "myfirstservice"
          },
          {
            "AttributeId": "urn:altinn:task",
            "Value": "gm_signing_task"
          }
          /* information about the party owning the dialog omitted */
        ]
      }
    ]
  }
}
```

Dette kan styres av en policyregel som dette:

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
<xacml:Description>En regel som gir bruker med rolle DAGL til å "sign" innenfor oppgaven med navnet "gm_signing_task"</xacml:Description>
    <xacml:Target>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">myfirstservice</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:resource" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">gm_signing_task</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:task" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">sign</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
    </xacml:Target>
</xacml:Rule>
```

Hvis forespørselen mislykkes, vil Dialogporten flagge GUI/API-handlingen eller overføringen med `isAuthorized: false` og fjerne de tilknyttede URL-ene. Dette gjør at sluttbrukersystemer kan indikere til brukeren at tilgang til den gitte handlingen er nektet.

{{<notice warning>}}
Selv om Dialogporten indikerer at handlingen er uautorisert, og fjerner URL-ene, bør endepunktet fortsatt alltid utføre autentisering/autorisasjon på innkommende forespørsler og ikke stole på at Dialogporten bare skjuler tilgangen til endepunktene
{{</notice>}}

## Bruke autorisasjonsattributter på forsendelser

{{<notice warning>}}
For nye dialoger, vurder en [autorisasjonskontekst]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) i stedet - den kan uttrykke den samme avgrensingen til underressurs/oppgave som vist under, i tillegg til å gi tilgang til en annen part enn dialogens egen.
{{</notice>}}

For forsendelser er mekanismen den samme, men det finnes ingen eksplisitt handling knyttet til en forsendelse - `read` brukes alltid som handling i XACML-forespørselen, uansett hva autorisasjonsattributtet refererer til: en separat ressurs, en underressurs eller en oppgave.

{{<notice warning>}}
En underressurs eller oppgave navngitt i en forsendelses autorisasjonsattributt kan bare *utvide* tilgang gjennom en egen policyregel, aldri *avgrense* den. Handlingen som sendes, er alltid `read`, og en ren `read`-regel på hovedressursen - som typisk er definert for hele ressursen - matcher uansett hvilket underressurs- eller oppgaveattributt som også er med i forespørselen, fordi XACML-målmatching bare kontrollerer at attributtene en regel krever er til stede, ikke at ingen andre attributter er det. Hvis du må begrense en forsendelses synlighet under det som `read` gir tilgang til på hovedressursen, bruk en [autorisasjonskontekst]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) med en eksplisitt `action` i stedet - det er den eneste mekanismen som kan uttrykke reell avgrensing.
{{</notice>}}

Eksempel:

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:1" Effect="Permit">
<xacml:Description>En regel som gir brukere med rolle UTINN eller DAGL til å lese dialogen</xacml:Description>
    <xacml:Target>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">UTINN</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">DAGL</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">myfirstservice</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:altinn:resource" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
        <xacml:AnyOf>
            <xacml:AllOf>
                <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
                    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
                </xacml:Match>
            </xacml:AllOf>
        </xacml:AnyOf>
    </xacml:Target>
</xacml:Rule>
```

Gitt en forsendelse der autorisasjonsattributtet er `urn:altinn:subresource:sometransmission`, sender Dialogporten denne XACML-forespørselen:

```json
{
  "Request": {
    "AccessSubject": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:rolecode",
            "Value": "UTINN"
          }
        ]
      }
    ],
    "Action": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "read"
          }
        ]
      }
    ],
    "Resource": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "myfirstservice"
          },
          {
            "AttributeId": "urn:altinn:subresource",
            "Value": "sometransmission"
          }
        ]
      }
    ]
  }
}
```

Dette tilfredsstiller regelen ovenfor og gir `Permit` for enhver UTINN- eller DAGL-bruker, uavhengig av underressursattributtet `sometransmission` - attributtet avgrenset hvilken ressurs forespørselen navngir, men ikke hvilken policyregel forespørselen kan matche.

## Referer til separat ressurs/policy i Resource Registry

Hvis autorisasjonsattributtverdien starter med enten `urn:altinn:resource` eller `urn:altinn:app`, og hele verdien avviker fra hva `ServiceResource` for den gitte dialogen er satt til, anses autorisasjonsattributtet som å referere til forskjellige ressurser i Resource Registry. På denne måten kan tilgang til de forskjellige delene av en dialog styres av forskjellige policyer.

Et typisk brukstilfelle er å ha dialoger som alle refererer til forskjellige ressurser/policyer, men innenfor dem inneholder [forsendelser](/nb/dialogporten/reference/authorization/attributes/../../entities/transmission/) som representerer en felles type kommunikasjon (dvs. varsel om tvangsgebyr) som styres av samme autorisasjonspolicy, uavhengig av dialogen der den brukes.

Eksempel:
```json
// First dialog
{
    "id": "019275d2-1b5d-7b82-b436-4b74e5cbd02b",
    "serviceResource": "urn:altinn:resource:some-service",
    "transmissions": [
        {
            "id": "019275d3-41d5-743c-be44-aa729cf95acf",
            "authorizationAttribute": "urn:altinn:resource:notice-of-coervice-fine",
            ...
        }
    ]
    ...
}
// Second dialog
{
    "id": "019275d4-d550-7e93-9819-1e40579f243a",
    "serviceResource": "urn:altinn:resource:other-service",
    "transmissions": [
        {
            "id": "019275d5-0044-7b10-803a-fa5e6ac3f593",
            "authorizationAttribute": "urn:altinn:resource:notice-of-coervice-fine",
            ...
        }
    ]
    ...
}
```

Dette gir mulighet for å ha finkornet kontroll over hvilke deler av dialoger en gitt rolle får tilgang til, samtidig som man unngår å duplisere policyregler på tvers av policyene som styrer tilgang til ulike dialogtyper.


{{<children />}}
