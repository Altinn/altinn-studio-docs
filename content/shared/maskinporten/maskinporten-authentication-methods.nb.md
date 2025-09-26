---
headless: true
hidden: true
---

I konteksten av en [Altinn Studio]({{< relref "/altinn-studio" >}}) app er integrasjon med Maskinporten tilgjengelig via den innebygde autentiseringsklienten. Følg ganske enkelt [brukerveiledningen]({{< relref "/altinn-studio/v8/guides/integration/maskinporten" >}}) for å komme i gang.

For andre _.Net_ apper kan du bruke dette [frittstående biblioteket](https://github.com/Altinn/altinn-apiclient-maskinporten) for å håndtere autentisering. Biblioteket tilbyr extension methods for å konfigurere HttpClients til å autentisere med Maskinporten basert på din oppgitte konfigurasjon.