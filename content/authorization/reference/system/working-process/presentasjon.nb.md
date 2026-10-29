---
title: "Slik jobber vi: tavlen og visningene"
description: "Presentasjon av arbeidsprosessen i Team Autorisasjon: flyten fra idé til produksjon og hva hver rolle ser på tavlen."
type: animated-deck
arialabel: "Presentasjon av arbeidsprosessen i Team Autorisasjon"
backlink: "/nb/authorization/reference/system/working-process/"
hidden: true
outputs: [HTML]
build:
  list: never
  render: always
---

<section id="cover" data-transition="fade" style="background:#111d46;color:#ffffff;font-family:Inter, Arial, sans-serif">
<div style="position:absolute;left:1184px;top:240px;width:128px;height:600px;background:rgba(255,255,255,0.06);border-radius:8px" data-build-in="fade 5 auto"></div>
<div style="position:absolute;left:1344px;top:240px;width:128px;height:600px;background:rgba(255,255,255,0.06);border-radius:8px" data-build-in="fade 5 auto"></div>
<div style="position:absolute;left:1504px;top:240px;width:128px;height:600px;background:rgba(255,255,255,0.06);border-radius:8px" data-build-in="fade 5 auto"></div>
<div style="position:absolute;left:1664px;top:240px;width:128px;height:600px;background:rgba(255,255,255,0.06);border-radius:8px" data-build-in="fade 5 auto"></div>
<div style="position:absolute;left:1196px;top:256px;width:104px;height:12px;background:rgba(255,255,255,0.3);border-radius:6px" data-build-in="fade 5 auto"></div>
<div style="position:absolute;left:1356px;top:256px;width:104px;height:12px;background:rgba(255,255,255,0.3);border-radius:6px" data-build-in="fade 5 auto"></div>
<div style="position:absolute;left:1516px;top:256px;width:104px;height:12px;background:rgba(255,255,255,0.3);border-radius:6px" data-build-in="fade 5 auto"></div>
<div style="position:absolute;left:1676px;top:256px;width:104px;height:12px;background:rgba(255,255,255,0.3);border-radius:6px" data-build-in="fade 5 auto"></div>
<div style="position:absolute;left:1196px;top:288px;width:104px;height:56px;background:#ffffff;border-radius:4px" data-build-in="pop 6 auto"></div>
<div style="position:absolute;left:1196px;top:356px;width:104px;height:56px;background:#a8f3d0;border-radius:4px" data-build-in="pop 6 auto"></div>
<div style="position:absolute;left:1196px;top:424px;width:104px;height:56px;background:#fae6c6;border-radius:4px" data-build-in="pop 6 auto"></div>
<div style="position:absolute;left:1356px;top:288px;width:104px;height:56px;background:#ffffff;border-radius:4px" data-build-in="pop 7 auto"></div>
<div style="position:absolute;left:1356px;top:356px;width:104px;height:56px;background:#fae6c6;border-radius:4px" data-build-in="pop 7 auto"></div>
<div style="position:absolute;left:1356px;top:424px;width:104px;height:56px;background:#a8f3d0;border-radius:4px" data-build-in="pop 7 auto"></div>
<div style="position:absolute;left:1356px;top:492px;width:104px;height:56px;background:#f8e4e4;border-radius:4px" data-build-in="pop 7 auto"></div>
<div style="position:absolute;left:1516px;top:288px;width:104px;height:56px;background:#ffffff;border-radius:4px" data-build-in="pop 8 auto"></div>
<div style="position:absolute;left:1516px;top:356px;width:104px;height:56px;background:#f8e4e4;border-radius:4px" data-build-in="pop 8 auto"></div>
<div style="position:absolute;left:1676px;top:288px;width:104px;height:56px;background:#ffffff;border-radius:4px" data-build-in="pop 9 auto"></div>
<div style="position:absolute;left:1676px;top:356px;width:104px;height:56px;background:#fae6c6;border-radius:4px" data-build-in="pop 9 auto"></div>
<div style="position:absolute;left:1676px;top:424px;width:104px;height:56px;background:#ffffff;border-radius:4px" data-build-in="pop 9 auto"></div>
<p style="position:absolute;left:128px;top:128px;width:960px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#a5d6fb" data-build-in="fade 1 auto">Team Autorisasjon · ADR-0005</p>
<h1 style="position:absolute;left:128px;top:300px;width:1000px;font-size:96px;font-weight:600;line-height:1.1;letter-spacing:-1px;color:#ffffff" data-build-in="rise 2 auto">Én tavle,<br>én visning<br>per rolle</h1>
<p style="position:absolute;left:128px;top:664px;width:900px;font-size:40px;line-height:1.3;color:#c9d3f0" data-build-in="rise 3 auto">Slik flyter arbeidet fra idé til produksjon, og hva hver rolle ser på tavlen</p>
<p style="position:absolute;left:128px;top:880px;width:1000px;font-size:24px;color:#a5d6fb" data-build-in="fade 4 auto">Basert på ADR-0005 og håndboken i docs/process/ i altinn-auth</p>
</section>

<section id="regel" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:288px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2" data-build-in="fade 1 auto">Grunnregelen</p>
<p style="position:absolute;left:128px;top:344px;width:1664px;font-size:64px;font-weight:500;line-height:1.15;color:#1e2950" data-build-in="rise 2 auto">Hver rolle har sin egen issue på tavlen.</p>
<p style="position:absolute;left:128px;top:448px;width:1664px;font-size:64px;font-weight:500;line-height:1.15;color:#1e2950" data-build-in="rise 3 auto">Du får den når den forrige er <span style="color:#0062ba">lukket</span>.</p>
<p style="position:absolute;left:128px;top:552px;width:1664px;font-size:64px;font-weight:500;line-height:1.15;color:#1e2950" data-build-in="rise 4 auto">Du lukker den når din del er <span style="color:#0062ba">ferdig</span>.</p>
<p style="position:absolute;left:128px;top:704px;width:1100px;font-size:28px;line-height:1.4;color:#545c7a" data-build-in="fade 5 auto">Lukkingen flytter kortet til Done. Overleveringen til neste rolle gjør du foreløpig for hånd, med en flytting eller en omtale.</p>
</section>

<section id="sprint" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Iterasjonen</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">To uker, felles for begge team</h2>
<p style="position:absolute;left:304px;top:276px;width:284px;font-size:24px;font-weight:600;color:#545c7a">Mandag</p>
<p style="position:absolute;left:605px;top:276px;width:284px;font-size:24px;font-weight:600;color:#545c7a">Tirsdag</p>
<p style="position:absolute;left:906px;top:276px;width:284px;font-size:24px;font-weight:600;color:#545c7a">Onsdag</p>
<p style="position:absolute;left:1207px;top:276px;width:284px;font-size:24px;font-weight:600;color:#545c7a">Torsdag</p>
<p style="position:absolute;left:1508px;top:276px;width:284px;font-size:24px;font-weight:600;color:#545c7a">Fredag</p>
<p style="position:absolute;left:128px;top:340px;width:160px;font-size:28px;font-weight:600;line-height:1.3;color:#1e2950">Uke 1<br><span style="color:#545c7a">åpner</span></p>
<p style="position:absolute;left:128px;top:628px;width:160px;font-size:28px;font-weight:600;line-height:1.3;color:#1e2950">Uke 2<br><span style="color:#545c7a">lukker</span></p>
<div style="position:absolute;left:304px;top:324px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 1 auto">
<p style="font-size:24px;font-weight:600;background:#111d46;color:#ffffff;padding:6px 12px;border-radius:4px">Planlegging</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Felles: to–tre iterasjonsmål</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Per område: hvem gjør hva</p>
</div>
<div style="position:absolute;left:605px;top:324px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 2 auto">
<p style="font-size:24px;font-weight:600;background:#ecf6ee;color:#056d13;padding:6px 12px;border-radius:4px">Prod-deploy</p>
</div>
<div style="position:absolute;left:906px;top:324px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 3 auto">
<p style="font-size:24px;font-weight:600;background:#d3eafd;color:#1e2950;padding:6px 12px;border-radius:4px">Status</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Per område · 60 min</p>
<p style="font-size:24px;font-weight:600;background:#ecf6ee;color:#056d13;padding:6px 12px;border-radius:4px">TT02-deploy</p>
</div>
<div style="position:absolute;left:1207px;top:324px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 4 auto">
<p style="font-size:24px;font-weight:600;border:2px dashed #717891;color:#545c7a;padding:4px 10px;border-radius:4px">Raffinering</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Ved behov, per område</p>
</div>
<div style="position:absolute;left:1508px;top:324px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 5 auto">
<p style="font-size:24px;font-weight:600;background:#d3eafd;color:#1e2950;padding:6px 12px;border-radius:4px">Status</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Per område · 30 min</p>
</div>
<div style="position:absolute;left:304px;top:612px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 6 auto">
<p style="font-size:24px;font-weight:600;background:#d3eafd;color:#1e2950;padding:6px 12px;border-radius:4px">Status</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Per område · 30 min</p>
</div>
<div style="position:absolute;left:605px;top:612px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 7 auto">
<p style="font-size:24px;font-weight:600;background:#ecf6ee;color:#056d13;padding:6px 12px;border-radius:4px">Prod-deploy</p>
</div>
<div style="position:absolute;left:906px;top:612px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 8 auto">
<p style="font-size:24px;font-weight:600;background:#d3eafd;color:#1e2950;padding:6px 12px;border-radius:4px">Status</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Per område · 60 min</p>
<p style="font-size:24px;font-weight:600;background:#ecf6ee;color:#056d13;padding:6px 12px;border-radius:4px">TT02-deploy</p>
</div>
<div style="position:absolute;left:1207px;top:612px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 9 auto">
<p style="font-size:24px;font-weight:600;background:#111d46;color:#ffffff;padding:6px 12px;border-radius:4px">Prioritering</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">45 min · bekrefter listen for neste iterasjon</p>
</div>
<div style="position:absolute;left:1508px;top:612px;width:284px;height:272px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:16px;display:flex;flex-direction:column;align-items:flex-start;gap:8px" data-build-in="pop 10 auto">
<p style="font-size:24px;font-weight:600;background:#111d46;color:#ffffff;padding:6px 12px;border-radius:4px">Resultatmøte</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">45 min · alt uferdig får en beslutning</p>
<p style="font-size:24px;font-weight:600;background:#111d46;color:#ffffff;padding:6px 12px;border-radius:4px">Retro</p>
</div>
<p style="position:absolute;left:128px;bottom:64px;width:1664px;font-size:24px;color:#545c7a">Første iterasjon starter 9. november 2026. Møtene erstatter grooming, teammøte og fredagsmøte.</p>
</section>

<section id="inntak" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Inntak</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Slik kommer arbeid inn</h2>
<div style="position:absolute;left:128px;top:288px;width:288px;height:340px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 1 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">1</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Idé</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Hvem som helst lager en issue med skjemaet. Den lander i Backlog med status/triage.</p>
</div>
<div style="position:absolute;left:472px;top:288px;width:288px;height:340px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 2 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">2</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Triage</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Innen en uke: den som står nærmest, setter type og area/*.</p>
</div>
<div style="position:absolute;left:816px;top:288px;width:288px;height:340px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 3 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">3</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Prioritering</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Torsdag i uke 2: vi bekrefter listen for neste iterasjon, velger kandidater og setter prioritet og milestone.</p>
</div>
<div style="position:absolute;left:1160px;top:288px;width:288px;height:340px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 4 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">4</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Raffinering</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Iterasjonen før: nok til å starte. Mål, hovedkriterier, navngitte personer og en første oppgave.</p>
</div>
<div style="position:absolute;left:1504px;top:288px;width:288px;height:340px;background:#111d46;border-radius:4px;padding:24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 5 auto">
<p style="font-size:24px;font-weight:600;color:#a5d6fb">5</p>
<p style="font-size:28px;font-weight:600;color:#ffffff">Planlegging</p>
<p style="font-size:24px;line-height:1.2;color:#c9d3f0">Tar bare features som er nok til å starte. Resten venter én iterasjon.</p>
</div>
<x-connector x1="416" y1="458" x2="472" y2="458" style="color:#545c7a;border-width:3px" data-build-in="fade 2 auto"></x-connector>
<x-connector x1="760" y1="458" x2="816" y2="458" style="color:#545c7a;border-width:3px" data-build-in="fade 3 auto"></x-connector>
<x-connector x1="1104" y1="458" x2="1160" y2="458" style="color:#545c7a;border-width:3px" data-build-in="fade 4 auto"></x-connector>
<x-connector x1="1448" y1="458" x2="1504" y2="458" style="color:#545c7a;border-width:3px" data-build-in="fade 5 auto"></x-connector>
<p style="position:absolute;left:128px;top:668px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2" data-build-in="fade 6 auto">Hvem triagerer?</p>
<div style="position:absolute;left:128px;top:712px;width:398px;height:184px;background:#d3eafd;border-radius:4px;padding:20px 24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 7 auto">
<p style="font-size:28px;font-weight:600;color:#1e2950">Områdeeieren</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950">Det som lander i området, senest i neste raffinering.</p>
</div>
<div style="position:absolute;left:550px;top:712px;width:398px;height:184px;background:#d3eafd;border-radius:4px;padding:20px 24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 7 auto">
<p style="font-size:28px;font-weight:600;color:#1e2950">Den som fant det</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950">Egne funn. En liten fiks under en halv dag kan gå rett til In progress.</p>
</div>
<div style="position:absolute;left:972px;top:712px;width:398px;height:184px;background:#d3eafd;border-radius:4px;padding:20px 24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 7 auto">
<p style="font-size:28px;font-weight:600;color:#1e2950">Vakten</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950">Det som kommer fra Slack eller CRM uten et åpenbart område.</p>
</div>
<div style="position:absolute;left:1394px;top:712px;width:398px;height:184px;background:#d3eafd;border-radius:4px;padding:20px 24px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 7 auto">
<p style="font-size:28px;font-weight:600;color:#1e2950">Ingen etter en uke</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950">Områdeeieren for nærmeste område tar det i raffinering.</p>
</div>
</section>

<section id="foran" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Rytme</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Raffinering og brukerinnsikt går én iterasjon foran</h2>
<div style="position:absolute;left:128px;top:344px;width:1664px;height:120px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:480px;width:1664px;height:120px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:616px;width:1664px;height:120px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:752px;width:1664px;height:120px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<p style="position:absolute;left:384px;top:290px;width:448px;font-size:28px;font-weight:600;color:#1e2950">Iterasjon N−1</p>
<p style="position:absolute;left:864px;top:290px;width:448px;font-size:28px;font-weight:600;color:#1e2950">Iterasjon N</p>
<p style="position:absolute;left:1344px;top:290px;width:448px;font-size:28px;font-weight:600;color:#1e2950">Iterasjon N+1</p>
<p style="position:absolute;left:152px;top:387px;width:216px;font-size:28px;font-weight:600;color:#1e2950">Prioritering</p>
<p style="position:absolute;left:152px;top:523px;width:216px;font-size:28px;font-weight:600;color:#1e2950">Raffinering</p>
<p style="position:absolute;left:152px;top:659px;width:216px;font-size:28px;font-weight:600;color:#1e2950">Brukerinnsikt</p>
<p style="position:absolute;left:152px;top:795px;width:216px;font-size:28px;font-weight:600;color:#1e2950">Bygg og test</p>
<p style="position:absolute;left:384px;top:360px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#111d46;color:#ffffff" data-build-in="left 1 auto">Bekrefter A for iterasjon N</p>
<p style="position:absolute;left:384px;top:496px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#111d46;color:#ffffff" data-build-in="left 2 auto">Raffinerer A</p>
<p style="position:absolute;left:384px;top:632px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#111d46;color:#ffffff" data-build-in="left 3 auto">A: prototyper og brukertest</p>
<p style="position:absolute;left:864px;top:768px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#111d46;color:#ffffff" data-build-in="left 4 auto">Bygger og tester A, designer på frontend</p>
<p style="position:absolute;left:864px;top:360px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#0062ba;color:#ffffff" data-build-in="left 5 auto">Bekrefter B for iterasjon N+1</p>
<p style="position:absolute;left:864px;top:496px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#0062ba;color:#ffffff" data-build-in="left 5 auto">Raffinerer B</p>
<p style="position:absolute;left:864px;top:632px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#0062ba;color:#ffffff" data-build-in="left 5 auto">B: prototyper og brukertest</p>
<p style="position:absolute;left:1344px;top:768px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#0062ba;color:#ffffff" data-build-in="left 6 auto">Bygger og tester B, designer på frontend</p>
<p style="position:absolute;left:1344px;top:360px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#a5d6fb;color:#111d46" data-build-in="left 7 auto">Bekrefter C for iterasjon N+2</p>
<p style="position:absolute;left:1344px;top:496px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#a5d6fb;color:#111d46" data-build-in="left 7 auto">Raffinerer C</p>
<p style="position:absolute;left:1344px;top:632px;width:448px;font-size:24px;font-weight:600;padding:29px 24px;border-radius:4px;background:#a5d6fb;color:#111d46" data-build-in="left 7 auto">C: prototyper og brukertest</p>
<p style="position:absolute;left:128px;bottom:64px;width:1664px;font-size:24px;color:#545c7a" data-build-in="fade 8 auto">Brukerinnsikt hører til raffineringen. Mens utvikleren bygger featuren, jobber designeren på frontend-oppgaven sammen med utvikleren.</p>
</section>

<section id="flyt" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Flyten</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Fra prioritert feature til lukket feature</h2>
<!-- P 128,508,240,160  R 413,508  FE 698,268  B 698,748  T1 982,508  T 1267,748  F 1552,748 -->
<div style="position:absolute;left:128px;top:508px;width:240px;height:160px;background:#111d46;border-radius:4px;padding:16px;display:flex;flex-direction:column;justify-content:center;gap:8px" data-build-in="pop 1 auto">
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#ffffff">Feature prioritert</p>
<p style="font-size:24px;line-height:1.2;color:#c9d3f0">Produkteier</p>
</div>
<div style="position:absolute;left:413px;top:508px;width:240px;height:160px;background:#ffffff;border:2px solid #717891;border-radius:4px;padding:16px;display:flex;flex-direction:column;justify-content:center;gap:8px" data-build-in="pop 2 auto">
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Raffinering</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Nok til å starte, med brukerinnsikt</p>
</div>
<div style="position:absolute;left:698px;top:268px;width:240px;height:160px;background:#eaf7ef;border:2px solid #56826b;border-radius:4px;padding:16px;display:flex;flex-direction:column;justify-content:center;gap:8px" data-build-in="pop 3 auto">
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend</p>
<p style="font-size:24px;line-height:1.2;color:#32674b">Designer og utvikler sammen</p>
</div>
<div style="position:absolute;left:698px;top:748px;width:240px;height:160px;background:#dcebf6;border:2px solid #1f7dc5;border-radius:4px;padding:16px;display:flex;flex-direction:column;justify-content:center;gap:8px" data-build-in="pop 3 auto">
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#042d4d">Backend</p>
<p style="font-size:24px;line-height:1.2;color:#0860a3">Merge lukker den</p>
</div>
<div style="position:absolute;left:982px;top:508px;width:240px;height:160px;background:#fcf2e2;border:2px solid #a56d13;border-radius:4px;padding:16px;display:flex;flex-direction:column;justify-content:center;gap:8px" data-build-in="pop 4 auto">
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test av én oppgave</p>
<p style="font-size:24px;line-height:1.2;color:#80540f">Når den er merget</p>
</div>
<div style="position:absolute;left:1267px;top:748px;width:240px;height:160px;background:#fcf2e2;border:2px solid #a56d13;border-radius:4px;padding:16px;display:flex;flex-direction:column;justify-content:center;gap:8px" data-build-in="pop 5 auto">
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test av featuren</p>
<p style="font-size:24px;line-height:1.2;color:#80540f">Når alle er merget</p>
</div>
<div style="position:absolute;left:1552px;top:748px;width:240px;height:160px;background:#ecf6ee;border:2px solid #108c22;border-radius:4px;padding:16px;display:flex;flex-direction:column;justify-content:center;gap:8px" data-build-in="pop 6 auto">
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#023409">Feature lukket</p>
<p style="font-size:24px;line-height:1.2;color:#056d13">Godkjent og i produksjon</p>
</div>
<x-connector x1="368" y1="588" x2="413" y2="588" style="color:#545c7a;border-width:3px" data-build-in="fade 2 auto"></x-connector>
<x-connector x1="533" y1="508" x2="698" y2="348" route="vh" style="color:#545c7a;border-width:3px" data-build-in="fade 3 auto"></x-connector>
<x-connector x1="533" y1="668" x2="698" y2="828" route="vh" style="color:#545c7a;border-width:3px" data-build-in="fade 3 auto"></x-connector>
<x-connector x1="818" y1="428" x2="982" y2="588" route="vh" style="color:#545c7a;border-width:3px" data-build-in="fade 4 auto"></x-connector>
<x-connector x1="938" y1="790" x2="1102" y2="668" route="hv" style="color:#545c7a;border-width:3px" data-build-in="fade 4 auto"></x-connector>
<x-connector x1="938" y1="840" x2="1267" y2="840" style="color:#545c7a;border-width:3px" data-build-in="fade 5 auto"></x-connector>
<x-connector x1="938" y1="348" x2="1387" y2="748" route="hv" style="color:#545c7a;border-width:3px" data-build-in="fade 5 auto"></x-connector>
<x-connector x1="1507" y1="828" x2="1552" y2="828" style="color:#545c7a;border-width:3px" data-build-in="fade 6 auto"></x-connector>
<p style="position:absolute;left:1432px;top:290px;width:360px;font-size:24px;line-height:1.3;color:#545c7a" data-build-in="fade 7 auto">Ingen egen designoppgave. Designeren tar én designreview, på pull requesten eller senere i AT. Utvikleren som åpner pull requesten, bestemmer når.</p>
<p style="position:absolute;left:128px;bottom:64px;width:1664px;font-size:24px;color:#545c7a" data-build-in="fade 7 auto">Én regel: når en issue er lukket, kan det som ventet på den, gå videre. Den som ble ferdig, gjør overleveringen.</p>
</section>

<section id="kjeden" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Kjeden</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Kjeden går nesten av seg selv</h2>
<div style="position:absolute;left:128px;top:288px;width:480px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 1 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Sub-issues</p>
<p style="font-size:28px;line-height:1.35;color:#1e2950">Testoppgaven er sub-issue av featuren og venter på alle de andre.</p>
</div>
<div style="position:absolute;left:128px;top:476px;width:480px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 2 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Designer og utvikler</p>
<p style="font-size:28px;line-height:1.35;color:#1e2950">Frontend-oppgaven har begge. Merge lukker den for begge.</p>
</div>
<div style="position:absolute;left:128px;top:664px;width:480px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 3 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Lukking</p>
<p style="font-size:28px;line-height:1.35;color:#1e2950">Den som lukker, gjør overleveringen: en flytting eller en omtale.</p>
</div>
<template class="deck-embed-src" data-style="position:absolute;left:672px;top:268px;width:1120px;height:640px" data-title="Animasjon: én feature går gjennom tavlen" data-body-class="no"><style>
*{box-sizing:border-box;margin:0}
body{font-family:Inter,"Segoe UI",system-ui,Arial,sans-serif;background:transparent;color:#1e2950;overflow:hidden}
#w{position:relative;width:1120px;height:640px;transition:opacity .4s}
.no *{transition:none!important}
.ft{position:absolute;left:0;top:0;width:1120px;height:64px;background:#111d46;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-size:24px;font-weight:600;transition:background .5s}
.ft.done{background:#068718}
.pg{display:flex;align-items:center;gap:16px}
.bar{width:200px;height:14px;border-radius:7px;background:rgba(255,255,255,.25);overflow:hidden}
.fill{height:100%;width:0;background:#a5d6fb;transition:width .8s}
.ch{position:absolute;top:76px;width:254px;font-size:24px;font-weight:600;color:#545c7a}
.cb{position:absolute;top:116px;width:254px;height:480px;border-radius:6px;background:#ffffff;box-shadow:0 0 1px rgba(0,0,0,.16),0 1px 2px rgba(0,0,0,.12)}
.c{position:absolute;width:238px;height:84px;border-radius:4px;padding:8px 12px;font-size:24px;line-height:1.2;transition:left .8s cubic-bezier(.4,0,.2,1),top .8s cubic-bezier(.4,0,.2,1),background .4s,opacity .4s}
.c b,.c span{display:block;white-space:nowrap}
.D{background:#eaf7ef;border:2px solid #56826b;color:#06331b}
.B{background:#dcebf6;border:2px solid #1f7dc5;color:#042d4d}
.T{background:#fcf2e2;border:2px solid #a56d13;color:#3c2807}
.T.x{background:#fae6c6;border-width:3px}
.cap{position:absolute;left:0;top:604px;width:1120px;font-size:28px;font-weight:500;line-height:1.15;color:#1e2950}
.tag{position:absolute;font-size:24px;font-weight:600;padding:2px 10px;border-radius:14px;background:#0062ba;color:#fff;opacity:0;transform:scale(.6);transition:opacity .3s,transform .3s;white-space:nowrap}
.tag.on{opacity:1;transform:scale(1)}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style><div id="w"><div class="ft" id="ft"><span id="fn"></span><div class="pg"><span id="pt"></span><div class="bar"><div class="fill" id="fl"></div></div></div></div></div><script>
var X=[24,302,580,858],W=document.getElementById('w');
function Y(s){return 124+s*96}
['Ready','In progress','In review','Done'].forEach(function(n,i){W.insertAdjacentHTML('beforeend','<div class="cb" style="left:'+X[i]+'px"></div><div class="ch" style="left:'+X[i]+'px">'+n+'</div>')});
var C={b1:['B','Backend 1'],b2:['B','Backend 2'],f:['D','Frontend'],t:['T','Test']};
for(var k in C)W.insertAdjacentHTML('beforeend','<div class="c '+C[k][0]+'" id="'+k+'"><b>'+C[k][1]+'</b><span></span></div>');
W.insertAdjacentHTML('beforeend','<div class="tag" id="m">@testeren</div><div class="tag" id="dr">Designreview nå</div><div class="cap" id="cap"></div>');
var S=[
{p:0,cap:'Iterasjonen starter. Testeren forbereder testen parallelt.',c:{b1:[0,0,'B1'],b2:[0,1,'B3'],f:[0,2,'Med designer'],t:[1,0,'Forbereder']}},
{cap:'Utvikleren tar backend. Designer og utvikler starter på frontend.',c:{b1:[1,1],f:[1,2],b2:[0,0]}},
{cap:'Pull request åpnet: utvikleren tar neste kort.',c:{b1:[2,0,'PR åpen'],b2:[1,1]}},
{p:1,r:1,cap:'Frontend-PR åpnet. Utvikleren ber om designreview nå.',c:{b1:[3,0,'Merget'],f:[2,0,'PR åpen']}},
{p:2,cap:'Designeren godkjenner, og merge lukker oppgaven for begge.',c:{f:[3,1,'Merget'],b2:[2,0,'PR åpen']}},
{p:3,m:1,cap:'Siste merge: utvikleren nevner testeren i testoppgaven.',c:{b2:[3,2,'Merget']}},
{x:1,cap:'Testeren flytter kortet til Executing og tester i AT.',c:{t:[1,0,'Utfører']}},
{p:4,done:1,cap:'Godkjent og i produksjon: testeren lukker featuren.',c:{t:[3,3,'Godkjent']}}];
var st={},p=0,i=0,$=function(id){return document.getElementById(id)};
function show(n){var s=S[n];if(n===0)st={};
for(var k in s.c){var o=st[k]||[],v=s.c[k];st[k]=[v[0],v[1],v[2]!==undefined?v[2]:o[2]]}
for(k in st){var e=$(k),q=st[k];e.style.left=(X[q[0]]+8)+'px';e.style.top=Y(q[1])+'px';e.lastChild.textContent=q[2]}
$('t').classList.toggle('x',!!s.x);
if(s.p!==undefined)p=s.p;$('pt').textContent=p+' av 4';$('fl').style.width=(p*25)+'%';
$('ft').classList.toggle('done',!!s.done);$('fn').textContent=s.done?'Feature F1 lukket · i produksjon':'Feature F1 · Approval limited to RightKeys';
var tl=X[st.t[0]]+8,tt=Y(st.t[1]);$('m').style.left=(tl+60)+'px';$('m').style.top=(tt-18)+'px';
var fl=X[st.f[0]]+8,ftp=Y(st.f[1]);$('dr').style.left=(fl+20)+'px';$('dr').style.top=(ftp+90)+'px';
$('m').classList.toggle('on',!!(s.m||s.x));$('dr').classList.toggle('on',!!s.r);$('cap').textContent=s.cap}
function tick(){if(i===0&&W.dataset.r){W.style.opacity=0;setTimeout(function(){document.body.className='no';show(0);setTimeout(function(){document.body.className='';W.style.opacity=1},50)},400)}else show(i);
W.dataset.r=1;var d=i===S.length-1?4500:i===0?2600:2400;i=(i+1)%S.length;setTimeout(tick,d)}
show(0);i=1;W.dataset.r=1;setTimeout(function(){document.body.className=''},50);setTimeout(tick,2600);
</script></template>
<p style="position:absolute;left:128px;top:852px;width:480px;font-size:24px;line-height:1.3;color:#545c7a" data-build-in="fade 4 auto">Animasjonen viser én feature med fire sub-issues.</p>
</section>

<section id="overlevering" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Overleveringer</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Hver overlevering for én feature</h2>
<div style="position:absolute;left:128px;top:272px;width:533px;height:304px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:28px 32px;display:flex;flex-direction:column;gap:10px" data-build-in="rise 1 auto">
<div style="display:flex;align-items:center;gap:16px">
<p style="width:44px;height:44px;border-radius:50%;background:#111d46;color:#ffffff;font-size:24px;font-weight:600;line-height:1.83;text-align:center">1</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Produkteier → områdeeier</p>
</div>
<p style="font-size:24px;font-weight:600;color:#0062ba">Når featuren får milestone</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950"><b>Nå:</b> områdeeieren ser den i Features-visningen.</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a"><b>Senere:</b> en kommentar til områdeeieren</p>
</div>
<div style="position:absolute;left:693px;top:272px;width:533px;height:304px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:28px 32px;display:flex;flex-direction:column;gap:10px" data-build-in="rise 2 auto">
<div style="display:flex;align-items:center;gap:16px">
<p style="width:44px;height:44px;border-radius:50%;background:#111d46;color:#ffffff;font-size:24px;font-weight:600;line-height:1.83;text-align:center">2</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Områdeeier → teamet</p>
</div>
<p style="font-size:24px;font-weight:600;color:#0062ba">Når raffineringen er ferdig</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950"><b>Nå:</b> første oppgave og testoppgave, og designer og utvikler på frontend. Det som kan starte, går til Ready.</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a"><b>Senere:</b> manuelt, Ready er en vurdering</p>
</div>
<div style="position:absolute;left:1258px;top:272px;width:533px;height:304px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:28px 32px;display:flex;flex-direction:column;gap:10px" data-build-in="rise 3 auto">
<div style="display:flex;align-items:center;gap:16px">
<p style="width:44px;height:44px;border-radius:50%;background:#111d46;color:#ffffff;font-size:24px;font-weight:600;line-height:1.83;text-align:center">3</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Utvikler → designer</p>
</div>
<p style="font-size:24px;font-weight:600;color:#0062ba">Når utvikleren åpner pull requesten</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950"><b>Nå:</b> utvikleren velger designreview på pull requesten, eller senere i AT.</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a"><b>Senere:</b> uendret, det er en vurdering</p>
</div>
<div style="position:absolute;left:128px;top:608px;width:533px;height:304px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:28px 32px;display:flex;flex-direction:column;gap:10px" data-build-in="rise 4 auto">
<div style="display:flex;align-items:center;gap:16px">
<p style="width:44px;height:44px;border-radius:50%;background:#111d46;color:#ffffff;font-size:24px;font-weight:600;line-height:1.83;text-align:center">4</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Utvikler → tester</p>
</div>
<p style="font-size:24px;font-weight:600;color:#0062ba">Når siste utvikleroppgave er merget</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950"><b>Nå:</b> utvikleren nevner testeren, som flytter kortet til Executing.</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a"><b>Senere:</b> Action-en setter fase og kommentar</p>
</div>
<div style="position:absolute;left:693px;top:608px;width:533px;height:304px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:28px 32px;display:flex;flex-direction:column;gap:10px" data-build-in="rise 5 auto">
<div style="display:flex;align-items:center;gap:16px">
<p style="width:44px;height:44px;border-radius:50%;background:#111d46;color:#ffffff;font-size:24px;font-weight:600;line-height:1.83;text-align:center">5</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Tester → utvikler</p>
</div>
<p style="font-size:24px;font-weight:600;color:#0062ba">Når testen finner en feil</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950"><b>Nå:</b> testeren lager en bug under featuren og setter Retest når den er merget.</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a"><b>Senere:</b> for hånd som nå</p>
</div>
<div style="position:absolute;left:1258px;top:608px;width:533px;height:304px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:28px 32px;display:flex;flex-direction:column;gap:10px" data-build-in="rise 6 auto">
<div style="display:flex;align-items:center;gap:16px">
<p style="width:44px;height:44px;border-radius:50%;background:#111d46;color:#ffffff;font-size:24px;font-weight:600;line-height:1.83;text-align:center">6</p>
<p style="font-size:28px;font-weight:600;color:#1e2950">Tester → produkteier</p>
</div>
<p style="font-size:24px;font-weight:600;color:#0062ba">Når featuren er lukket etter prodsjekk</p>
<p style="font-size:24px;line-height:1.2;color:#1e2950"><b>Nå:</b> epicens sub-issue-teller går av seg selv.</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a"><b>Senere:</b> ingenting mer trengs</p>
</div>
<p style="position:absolute;left:128px;bottom:64px;width:1664px;font-size:24px;color:#545c7a" data-build-in="fade 7 auto">Er designer og utvikler uenige, har designlederen siste ord om design.</p>
</section>

<section id="testfaser" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Test</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Testforberedelse går parallelt med utviklingen</h2>
<div style="position:absolute;left:128px;top:392px;width:1664px;height:128px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:536px;width:1664px;height:128px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:680px;width:1664px;height:128px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<p style="position:absolute;left:384px;top:276px;width:700px;font-size:24px;font-weight:600;color:#1e2950">Uke 1</p>
<p style="position:absolute;left:1084px;top:276px;width:700px;font-size:24px;font-weight:600;color:#1e2950">Uke 2</p>
<p style="position:absolute;left:388px;top:320px;width:132px;font-size:24px;color:#545c7a">Ma</p>
<p style="position:absolute;left:528px;top:320px;width:132px;font-size:24px;color:#545c7a">Ti</p>
<p style="position:absolute;left:668px;top:320px;width:132px;font-size:24px;color:#545c7a">On</p>
<p style="position:absolute;left:808px;top:320px;width:132px;font-size:24px;color:#545c7a">To</p>
<p style="position:absolute;left:948px;top:320px;width:132px;font-size:24px;color:#545c7a">Fr</p>
<p style="position:absolute;left:1088px;top:320px;width:132px;font-size:24px;color:#545c7a">Ma</p>
<p style="position:absolute;left:1228px;top:320px;width:132px;font-size:24px;color:#545c7a">Ti</p>
<p style="position:absolute;left:1368px;top:320px;width:132px;font-size:24px;color:#545c7a">On</p>
<p style="position:absolute;left:1508px;top:320px;width:132px;font-size:24px;color:#545c7a">To</p>
<p style="position:absolute;left:1648px;top:320px;width:132px;font-size:24px;color:#545c7a">Fr</p>
<p style="position:absolute;left:152px;top:439px;width:216px;font-size:28px;font-weight:600;color:#1e2950">Utvikling</p>
<p style="position:absolute;left:152px;top:583px;width:216px;font-size:28px;font-weight:600;color:#1e2950">Test</p>
<p style="position:absolute;left:152px;top:727px;width:216px;font-size:28px;font-weight:600;color:#1e2950">Designreview</p>
<p style="position:absolute;left:388px;top:404px;width:692px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#dcebf6;color:#042d4d" data-build-in="left 1 auto">Backend</p>
<p style="position:absolute;left:668px;top:460px;width:552px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#dcebf6;color:#042d4d" data-build-in="left 1 auto">Frontend</p>
<p style="position:absolute;left:388px;top:576px;width:832px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#fcf2e2;border:2px solid #a56d13;color:#3c2807" data-build-in="left 1 auto">Preparing · testdata, testtilfeller, verktøy, miljø</p>
<x-connector x1="1224" y1="380" x2="1224" y2="816" head="none" style="color:#0062ba;border-width:3px;border-style:dashed" data-build-in="fade 2 auto"></x-connector>
<p style="position:absolute;left:1232px;top:824px;width:264px;font-size:24px;line-height:1.2;font-weight:600;color:#0062ba" data-build-in="fade 2 auto">Siste merge: utvikleren nevner testeren</p>
<p style="position:absolute;left:1228px;top:576px;width:272px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#ea9b1b;color:#3c2807" data-build-in="left 3 auto">Executing i AT</p>
<p style="position:absolute;left:1228px;top:720px;width:272px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#eaf7ef;border:2px solid #56826b;color:#06331b" data-build-in="left 3 auto">Utsatt designreview</p>
<p style="position:absolute;left:1368px;top:404px;width:132px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#fbf1f1;border:2px solid #ce4d4d;color:#b81a1a" data-build-in="pop 4 auto">Bug</p>
<x-connector x1="1504" y1="380" x2="1504" y2="816" head="none" style="color:#0062ba;border-width:3px;border-style:dashed" data-build-in="fade 5 auto"></x-connector>
<p style="position:absolute;left:1512px;top:824px;width:272px;font-size:24px;line-height:1.2;font-weight:600;color:#0062ba" data-build-in="fade 5 auto">Bug lukket: testeren setter Retest</p>
<p style="position:absolute;left:1508px;top:576px;width:272px;font-size:24px;font-weight:600;padding:6px 14px;border-radius:4px;background:#fae6c6;border:2px dashed #a56d13;color:#3c2807" data-build-in="left 6 auto">Retest</p>
<p style="position:absolute;left:1508px;top:720px;width:272px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#ecf6ee;color:#056d13" data-build-in="left 6 auto">Begge godkjent</p>
<p style="position:absolute;left:384px;top:824px;width:800px;font-size:24px;line-height:1.2;color:#545c7a">Test phase-feltet viser fasen: Preparing → Executing → Retest. Testeren lukker testoppgaven når testen er godkjent og en utsatt designreview er gjort.</p>
</section>

<section id="fremdrift" data-transition="fade" style="background:#ffffff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Fremdrift</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Du leser fremdriften i sub-issues</h2>
<div style="position:absolute;left:896px;top:288px;width:896px;height:80px;border:1px solid #b8bbc8;border-radius:4px;padding:0 24px;display:flex;align-items:center;gap:24px">
<p style="width:160px;font-size:24px;font-weight:600;padding:4px 12px;border-radius:4px;background:#dcebf6;color:#042d4d">Utvikler</p>
<p style="font-size:24px;color:#1e2950">Utvikleroppgave 1</p>
</div>
<div style="position:absolute;left:896px;top:384px;width:896px;height:80px;border:1px solid #b8bbc8;border-radius:4px;padding:0 24px;display:flex;align-items:center;gap:24px">
<p style="width:160px;font-size:24px;font-weight:600;padding:4px 12px;border-radius:4px;background:#dcebf6;color:#042d4d">Utvikler</p>
<p style="font-size:24px;color:#1e2950">Utvikleroppgave 2</p>
</div>
<div style="position:absolute;left:896px;top:480px;width:896px;height:80px;border:1px solid #b8bbc8;border-radius:4px;padding:0 24px;display:flex;align-items:center;gap:24px">
<p style="width:160px;font-size:24px;font-weight:600;padding:4px 12px;border-radius:4px;background:#dcebf6;color:#042d4d">Utvikler</p>
<p style="font-size:24px;color:#1e2950">Utvikleroppgave 3</p>
</div>
<div style="position:absolute;left:896px;top:576px;width:896px;height:80px;border:1px solid #b8bbc8;border-radius:4px;padding:0 24px;display:flex;align-items:center;gap:24px">
<p style="width:160px;font-size:24px;font-weight:600;padding:4px 12px;border-radius:4px;background:#dcebf6;color:#042d4d">Utvikler</p>
<p style="font-size:24px;color:#1e2950">Utvikleroppgave 4</p>
</div>
<div style="position:absolute;left:896px;top:672px;width:896px;height:80px;border:1px solid #b8bbc8;border-radius:4px;padding:0 24px;display:flex;align-items:center;gap:24px">
<p style="width:160px;font-size:24px;font-weight:600;padding:4px 12px;border-radius:4px;background:#fcf2e2;color:#3c2807">Test</p>
<p style="font-size:24px;color:#1e2950">Testoppgave · kind/testplan</p>
</div>
<x-icon name="CheckCircle" style="position:absolute;left:1584px;top:312px;width:32px;height:32px;color:#068718" data-build-in="pop 1 auto"></x-icon>
<p style="position:absolute;left:1628px;top:313px;width:140px;font-size:24px;font-weight:600;color:#056d13" data-build-in="pop 1 auto">Lukket</p>
<x-icon name="CheckCircle" style="position:absolute;left:1584px;top:408px;width:32px;height:32px;color:#068718" data-build-in="pop 2 auto"></x-icon>
<p style="position:absolute;left:1628px;top:409px;width:140px;font-size:24px;font-weight:600;color:#056d13" data-build-in="pop 2 auto">Lukket</p>
<x-icon name="CheckCircle" style="position:absolute;left:1584px;top:504px;width:32px;height:32px;color:#068718" data-build-in="pop 3 auto"></x-icon>
<p style="position:absolute;left:1628px;top:505px;width:140px;font-size:24px;font-weight:600;color:#056d13" data-build-in="pop 3 auto">Lukket</p>
<x-icon name="CheckCircle" style="position:absolute;left:1584px;top:600px;width:32px;height:32px;color:#068718" data-build-in="pop 4 auto"></x-icon>
<p style="position:absolute;left:1628px;top:601px;width:140px;font-size:24px;font-weight:600;color:#056d13" data-build-in="pop 4 auto">Lukket</p>
<x-icon name="Clock" style="position:absolute;left:1584px;top:696px;width:32px;height:32px;color:#a56d13"></x-icon>
<p style="position:absolute;left:1628px;top:697px;width:140px;font-size:24px;font-weight:600;color:#80540f">Åpen</p>
<p style="position:absolute;left:896px;top:780px;width:896px;font-size:24px;color:#545c7a">Feature med fem direkte sub-issues</p>
<div style="position:absolute;left:896px;top:824px;width:172px;height:20px;border-radius:4px;background:#e8e8e9"></div>
<div style="position:absolute;left:1077px;top:824px;width:172px;height:20px;border-radius:4px;background:#e8e8e9"></div>
<div style="position:absolute;left:1258px;top:824px;width:172px;height:20px;border-radius:4px;background:#e8e8e9"></div>
<div style="position:absolute;left:1439px;top:824px;width:172px;height:20px;border-radius:4px;background:#e8e8e9"></div>
<div style="position:absolute;left:1620px;top:824px;width:172px;height:20px;border-radius:4px;background:#e8e8e9"></div>
<div style="position:absolute;left:896px;top:824px;width:172px;height:20px;border-radius:4px;background:#068718" data-build-in="left 1 auto"></div>
<div style="position:absolute;left:1077px;top:824px;width:172px;height:20px;border-radius:4px;background:#068718" data-build-in="left 2 auto"></div>
<div style="position:absolute;left:1258px;top:824px;width:172px;height:20px;border-radius:4px;background:#068718" data-build-in="left 3 auto"></div>
<div style="position:absolute;left:1439px;top:824px;width:172px;height:20px;border-radius:4px;background:#068718" data-build-in="left 4 auto"></div>
<p style="position:absolute;left:128px;top:340px;width:680px;font-size:200px;font-weight:600;line-height:1;letter-spacing:-4px;color:#111d46" data-build-in="scale 5 auto">4 av 5</p>
<p style="position:absolute;left:128px;top:572px;width:640px;font-size:40px;line-height:1.3;color:#1e2950" data-build-in="rise 6 auto">med én åpen betyr som regel: venter på test</p>
<p style="position:absolute;left:128px;top:760px;width:640px;font-size:24px;line-height:1.3;color:#545c7a" data-build-in="fade 7 auto">Telleren tar med testoppgaven. En epic teller featurene sine på samme måte.</p>
</section>

<section id="tavlen" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Tavlen</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Én tavle for begge team, fem kolonner</h2>
<div style="position:absolute;left:128px;top:272px;width:312px;height:440px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px">
<p style="font-size:32px;font-weight:600;color:#1e2950">Backlog</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Ikke i en iterasjon: ny, triagert eller raffinert</p>
</div>
<div style="position:absolute;left:466px;top:272px;width:312px;height:440px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px">
<p style="font-size:32px;font-weight:600;color:#1e2950">Ready</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Raffinert og i iterasjonen. Ta det øverste kortet</p>
</div>
<div style="position:absolute;left:804px;top:272px;width:312px;height:440px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px">
<p style="font-size:32px;font-weight:600;color:#1e2950">In progress</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Få aktive per person, ingen hard grense</p>
</div>
<div style="position:absolute;left:1142px;top:272px;width:312px;height:440px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px">
<p style="font-size:32px;font-weight:600;color:#1e2950">In review</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Pull request åpen. Hold den kort: review andres først</p>
</div>
<div style="position:absolute;left:1480px;top:272px;width:312px;height:440px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px;display:flex;flex-direction:column;gap:8px">
<p style="font-size:32px;font-weight:600;color:#1e2950">Done</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Lukket</p>
</div>
<p style="position:absolute;left:148px;top:540px;width:272px;font-size:24px;font-weight:600;padding:20px 16px;border-radius:4px;background:#dcebf6;border:2px solid #1f7dc5;color:#042d4d" data-build-in="pop 1 auto" data-build-out="fade 2 auto">B5 · Task</p>
<p style="position:absolute;left:486px;top:540px;width:272px;font-size:24px;font-weight:600;padding:20px 16px;border-radius:4px;background:#dcebf6;border:2px solid #1f7dc5;color:#042d4d" data-build-in="left 2 auto" data-build-out="fade 3 auto">B5 · Task</p>
<p style="position:absolute;left:824px;top:540px;width:272px;font-size:24px;font-weight:600;padding:20px 16px;border-radius:4px;background:#dcebf6;border:2px solid #1f7dc5;color:#042d4d" data-build-in="left 3 auto" data-build-out="fade 4 auto">B5 · Task</p>
<p style="position:absolute;left:1162px;top:540px;width:272px;font-size:24px;font-weight:600;padding:20px 16px;border-radius:4px;background:#dcebf6;border:2px solid #1f7dc5;color:#042d4d" data-build-in="left 4 auto" data-build-out="fade 5 auto">B5 · Task</p>
<p style="position:absolute;left:1500px;top:540px;width:272px;font-size:24px;font-weight:600;padding:20px 16px;border-radius:4px;background:#ecf6ee;border:2px solid #108c22;color:#023409" data-build-in="left 5 auto">B5 · Task</p>
<p style="position:absolute;left:148px;top:640px;width:272px;font-size:24px;line-height:1.2;font-weight:600;color:#0062ba" data-build-in="fade 1 auto">Ny issue havner på tavlen</p>
<p style="position:absolute;left:486px;top:640px;width:272px;font-size:24px;line-height:1.2;font-weight:600;color:#0062ba" data-build-in="fade 2 auto">Områdeeieren flytter</p>
<p style="position:absolute;left:824px;top:640px;width:272px;font-size:24px;line-height:1.2;font-weight:600;color:#0062ba" data-build-in="fade 3 auto">Utvikleren drar</p>
<p style="position:absolute;left:1162px;top:640px;width:272px;font-size:24px;line-height:1.2;font-weight:600;color:#0062ba" data-build-in="fade 4 auto">PR åpnet</p>
<p style="position:absolute;left:1500px;top:640px;width:272px;font-size:24px;line-height:1.2;font-weight:600;color:#0062ba" data-build-in="fade 5 auto">Merge lukker</p>
<p style="position:absolute;left:128px;top:752px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2" data-build-in="fade 6 auto">Automatikk og rutine</p>
<p style="position:absolute;left:128px;top:796px;width:398px;font-size:24px;line-height:1.2;padding:16px 20px;border-radius:4px;background:#d3eafd;color:#1e2950" data-build-in="rise 7 auto">Ny issue fra repoet havner på tavlen</p>
<p style="position:absolute;left:550px;top:796px;width:398px;font-size:24px;line-height:1.2;padding:16px 20px;border-radius:4px;background:#d3eafd;color:#1e2950" data-build-in="rise 7 auto">Lukket issue går til Done</p>
<p style="position:absolute;left:972px;top:796px;width:398px;font-size:24px;line-height:1.2;padding:16px 20px;border-radius:4px;background:#d3eafd;color:#1e2950" data-build-in="rise 7 auto">Gjenåpnet issue går til In progress</p>
<p style="position:absolute;left:1394px;top:796px;width:398px;font-size:24px;line-height:1.2;padding:16px 20px;border-radius:4px;background:#d3eafd;color:#1e2950" data-build-in="rise 7 auto">Agile coach arkiverer Done for hånd etter resultatmøtet</p>
</section>

<section id="felt" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif;padding:112px 128px 128px;display:flex;flex-direction:column;gap:40px">
<div style="display:flex;flex-direction:column;gap:12px">
<p style="font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Feltene</p>
<h2 style="font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Ett spørsmål per mekanisme</h2>
</div>
<table style="font-size:24px;color:#1e2950;font-family:Inter, Arial, sans-serif">
<tr style="background:#d3eafd"><th style="width:18%">Mekanisme</th><th style="width:22%">Svarer på</th><th style="width:60%">Slik bruker vi den</th></tr>
<tr style="background:#ffffff"><td>Iteration</td><td>Hvilken periode</td><td>Toukersperioden. Satt i planleggingen, og på alt nytt underveis</td></tr>
<tr style="background:#ffffff"><td>Milestone</td><td>Hvilket datert mål</td><td>Datert veikartmål. Frister utenfra hører hjemme her</td></tr>
<tr style="background:#ffffff"><td>Priority</td><td>I hvilken rekkefølge</td><td>Satt i prioriteringen, justert i planleggingen. urgent krever dato</td></tr>
<tr style="background:#ffffff"><td>Labels</td><td>Hva slags, hvor</td><td>Type, area/*, kind/*, skill/*. Klassifisering, aldri planlegging</td></tr>
<tr style="background:#ffffff"><td>Epic</td><td>Hvilket mål</td><td>Grupperer features for ett veikartpunkt. Ingen egen dato</td></tr>
<tr style="background:#ffffff"><td>Test phase</td><td>Hvor en test står</td><td>Preparing, Executing, Retest. Bare på testoppgaver</td></tr>
</table>
<p style="position:absolute;left:128px;top:676px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Ingen horisontfelt: iterasjon og milestone gir nå, neste og senere</p>
<div style="position:absolute;left:128px;top:720px;width:533px;height:168px;background:#111d46;border-radius:4px;padding:24px 32px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 1 auto">
<p style="font-size:40px;font-weight:600;color:#ffffff">Nå</p>
<p style="font-size:24px;color:#c9d3f0">Gjeldende iterasjon, uansett milestone</p>
</div>
<div style="position:absolute;left:693px;top:720px;width:533px;height:168px;background:#0062ba;border-radius:4px;padding:24px 32px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 2 auto">
<p style="font-size:40px;font-weight:600;color:#ffffff">Neste</p>
<p style="font-size:24px;color:#e9f5ff">Senere iterasjon, eller milestone uten iterasjon</p>
</div>
<div style="position:absolute;left:1258px;top:720px;width:533px;height:168px;background:#a5d6fb;border-radius:4px;padding:24px 32px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 3 auto">
<p style="font-size:40px;font-weight:600;color:#111d46">Senere</p>
<p style="font-size:24px;color:#111d46">Verken iterasjon eller milestone</p>
</div>
</section>

<section id="visninger" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visningene</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Åtte lagrede visninger av samme tavle</h2>
<!-- parent 680,288,560,136 (bottom 424, cx 960); bus y 496; children top 520, lefts 128+210n, w188, centres 222 432 642 852 1062 1272 1482 1692 -->
<div style="position:absolute;left:680px;top:288px;width:560px;height:136px;background:#111d46;border-radius:4px;padding:16px 24px;display:flex;flex-direction:column;justify-content:center;gap:6px" data-build-in="pop 1 auto">
<p style="font-size:28px;font-weight:600;color:#ffffff;text-align:center">Én tavle for begge team</p>
<p style="font-size:24px;line-height:1.2;color:#c9d3f0;text-align:center">Hver visning er et lagret filter og et kolonnefelt</p>
</div>
<div style="position:absolute;left:128px;top:520px;width:188px;height:280px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 3 auto">
<x-icon name="Clock" style="width:40px;height:40px;color:#111d46"></x-icon>
<p style="font-size:28px;font-weight:600;color:#1e2950">Iterasjon</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Alle</p>
<p style="font-size:24px;line-height:1.2;color:#0062ba">Tavle · Status</p>
</div>
<div style="position:absolute;left:338px;top:520px;width:188px;height:280px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 4 auto">
<x-icon name="Code" style="width:40px;height:40px;color:#111d46"></x-icon>
<p style="font-size:28px;font-weight:600;color:#1e2950">Utviklere</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Utviklere</p>
<p style="font-size:24px;line-height:1.2;color:#0062ba">Tavle · Status</p>
</div>
<div style="position:absolute;left:548px;top:520px;width:188px;height:280px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 5 auto">
<x-icon name="CheckCircle" style="width:40px;height:40px;color:#111d46"></x-icon>
<p style="font-size:28px;font-weight:600;color:#1e2950">Test</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Testere</p>
<p style="font-size:24px;line-height:1.2;color:#0062ba">Tavle · Test phase</p>
</div>
<div style="position:absolute;left:758px;top:520px;width:188px;height:280px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 6 auto">
<x-icon name="Lightbulb" style="width:40px;height:40px;color:#111d46"></x-icon>
<p style="font-size:28px;font-weight:600;color:#1e2950">Design</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Designere og designleder</p>
<p style="font-size:24px;line-height:1.2;color:#0062ba">Tavle · Status</p>
</div>
<div style="position:absolute;left:968px;top:520px;width:188px;height:280px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 7 auto">
<x-icon name="Chart" style="width:40px;height:40px;color:#111d46"></x-icon>
<p style="font-size:28px;font-weight:600;color:#1e2950">Features</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Eiere og ledere</p>
<p style="font-size:24px;line-height:1.2;color:#0062ba">Tabell</p>
</div>
<div style="position:absolute;left:1178px;top:520px;width:188px;height:280px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 8 auto">
<x-icon name="Home" style="width:40px;height:40px;color:#111d46"></x-icon>
<p style="font-size:28px;font-weight:600;color:#1e2950">Område</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Områdeeier</p>
<p style="font-size:24px;line-height:1.2;color:#0062ba">Tavle · per feature</p>
</div>
<div style="position:absolute;left:1388px;top:520px;width:188px;height:280px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 9 auto">
<x-icon name="Chat" style="width:40px;height:40px;color:#111d46"></x-icon>
<p style="font-size:28px;font-weight:600;color:#1e2950">Vakt</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Den som har vakt</p>
<p style="font-size:24px;line-height:1.2;color:#0062ba">Tavle · Status</p>
</div>
<div style="position:absolute;left:1598px;top:520px;width:188px;height:280px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 10 auto">
<x-icon name="Warning" style="width:40px;height:40px;color:#111d46"></x-icon>
<p style="font-size:28px;font-weight:600;color:#1e2950">Bugs</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Alle</p>
<p style="font-size:24px;line-height:1.2;color:#0062ba">Tavle · Status</p>
</div>
<x-connector x1="960" y1="424" x2="960" y2="496" head="none" style="color:#717891;border-width:3px" data-build-in="fade 2 auto"></x-connector>
<x-connector x1="222" y1="496" x2="1692" y2="496" head="none" style="color:#717891;border-width:3px" data-build-in="fade 2 auto"></x-connector>
<x-connector x1="222" y1="496" x2="222" y2="520" style="color:#717891;border-width:3px" data-build-in="fade 3 auto"></x-connector>
<x-connector x1="432" y1="496" x2="432" y2="520" style="color:#717891;border-width:3px" data-build-in="fade 4 auto"></x-connector>
<x-connector x1="642" y1="496" x2="642" y2="520" style="color:#717891;border-width:3px" data-build-in="fade 5 auto"></x-connector>
<x-connector x1="852" y1="496" x2="852" y2="520" style="color:#717891;border-width:3px" data-build-in="fade 6 auto"></x-connector>
<x-connector x1="1062" y1="496" x2="1062" y2="520" style="color:#717891;border-width:3px" data-build-in="fade 7 auto"></x-connector>
<x-connector x1="1272" y1="496" x2="1272" y2="520" style="color:#717891;border-width:3px" data-build-in="fade 8 auto"></x-connector>
<x-connector x1="1482" y1="496" x2="1482" y2="520" style="color:#717891;border-width:3px" data-build-in="fade 9 auto"></x-connector>
<x-connector x1="1692" y1="496" x2="1692" y2="520" style="color:#717891;border-width:3px" data-build-in="fade 10 auto"></x-connector>
<p style="position:absolute;left:128px;top:840px;width:1664px;font-size:24px;line-height:1.3;color:#545c7a" data-build-in="fade 11 auto">Eksempel-issuene på de neste lysbildene er oppdiktede og har bokstavnavn: F feature, E epic, B backend, FE frontend, T test, X bug og Q vaktsak. Filtrene er de ekte.</p>
</section>

<section id="v-sprint" data-transition="magic" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visning 1 av 8 · Alle</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Iterasjonstavlen, standardvisningen</h2>
<p id="flt" style="position:absolute;left:128px;top:244px;width:300px;font-family:'JetBrains Mono', 'Courier New', monospace;font-size:24px;padding:6px 14px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">iteration:@current</p>
<p id="inf" style="position:absolute;left:1220px;top:250px;width:572px;font-size:24px;text-align:right;color:#545c7a">Kolonner: Status · sortert på Priority</p>
<p id="k1" style="position:absolute;left:128px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Ready · 3</p>
<p id="k2" style="position:absolute;left:552px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In progress · 5</p>
<p id="k3" style="position:absolute;left:976px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In review · 2</p>
<p id="k4" style="position:absolute;left:1400px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Done · 4</p>
<div id="c4292" style="position:absolute;left:128px;top:360px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#0860a3">B5 · Task</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Add via-party mode to Authorize API</p>
</div>
<div id="c4712" style="position:absolute;left:128px;top:476px;width:392px;height:108px;background:#fcf2e2;border:1px solid #a56d13;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#80540f">T4 · skill/test · kind/testplan</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test: Delegation overview end to end</p>
</div>
<div id="c4610" style="position:absolute;left:128px;top:592px;width:392px;height:108px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#32674b">FE1 · Task · med designer</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: select rights on request</p>
</div>
<div id="c3899" style="position:absolute;left:552px;top:360px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#0860a3">B2 · Task · PR åpen</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">ConnectionQuery: prune on resource filter</p>
</div>
<div id="c3745" style="position:absolute;left:552px;top:476px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#80540f">B7 · status/blocked</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Change feed sync in Access Management</p>
</div>
<div id="c4698" style="position:absolute;left:552px;top:592px;width:392px;height:108px;background:#fcf2e2;border:1px solid #a56d13;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#80540f">T2 · skill/test · Preparing</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test: Rights selection on approval</p>
</div>
<div id="cFE4" style="position:absolute;left:552px;top:708px;width:392px;height:108px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#32674b">FE4 · Task · med designer</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: System user delegation flow</p>
</div>
<div id="c4269" style="position:absolute;left:552px;top:824px;width:392px;height:108px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">X1 · Bug</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">RDF export omits contact points</p>
</div>
<div id="c3296" style="position:absolute;left:976px;top:360px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#0860a3">B6 · Task · PR åpen</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Query param for party switch, system user</p>
</div>
<div id="c4511" style="position:absolute;left:976px;top:476px;width:392px;height:108px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">X2 · Bug · PR åpen</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">Enduser-api: delegated clients 500</p>
</div>
<div id="c4605" style="position:absolute;left:1400px;top:360px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#056d13">B1 · merget</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Backend: approval limited to RightKeys</p>
</div>
<div id="c4606" style="position:absolute;left:1400px;top:476px;width:392px;height:108px;background:#fcf2e2;border:1px solid #a56d13;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#056d13">T1 · godkjent</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test: Approval limited to RightKeys</p>
</div>
<div id="c3655" style="position:absolute;left:1400px;top:592px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#056d13">B8 · merget</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Drop old AM database schemas</p>
</div>
<div id="cFE2" style="position:absolute;left:1400px;top:708px;width:392px;height:108px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#056d13">FE2 · merget</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: select rights on approval</p>
</div>
<div id="n1" style="position:absolute;left:976px;top:600px;width:392px;background:#111d46;border-radius:4px;padding:24px;display:flex;flex-direction:column;gap:12px" data-build-in="pop 1 auto">
<p style="font-size:24px;line-height:1.25;color:#ffffff">Eneste visning der utvikleroppgaver og testoppgaver står side om side.</p>
<p style="font-size:24px;line-height:1.25;color:#a5d6fb">Ingen Backlog-kolonne: alt her er i iterasjonen. Grønne kort har designer.</p>
</div>
</section>

<section id="v-utvikler" data-transition="magic" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visning 2 av 8 · Utviklere</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Utviklere: oppgaver, bugs og enhancements</h2>
<p id="flt" style="position:absolute;left:128px;top:244px;width:1000px;font-family:'JetBrains Mono', 'Courier New', monospace;font-size:24px;padding:6px 14px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">type:Task,Bug,Enhancement -label:skill/test iteration:@current</p>
<p id="inf" style="position:absolute;left:1220px;top:250px;width:572px;font-size:24px;text-align:right;color:#545c7a">Kolonner: Status · sortert på Priority</p>
<p id="k1" style="position:absolute;left:128px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Ready · 2</p>
<p id="k2" style="position:absolute;left:552px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In progress · 4</p>
<p id="k3" style="position:absolute;left:976px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In review · 2</p>
<p id="k4" style="position:absolute;left:1400px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Done · 1</p>
<div id="c4292" style="position:absolute;left:128px;top:360px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#0860a3">B5 · high · ↑ F5</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Add via-party mode to Authorize API</p>
</div>
<div id="c4610" style="position:absolute;left:128px;top:476px;width:392px;height:108px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#32674b">FE1 · ↑ F1 · med designer</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: select rights on request</p>
</div>
<div id="c3899" style="position:absolute;left:552px;top:360px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#0860a3">B2 · PR åpen</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">ConnectionQuery: prune on resource filter</p>
</div>
<div id="c3745" style="position:absolute;left:552px;top:476px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#80540f">B7 · venter på Team Core</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Change feed sync in Access Management</p>
</div>
<div id="cFE4" style="position:absolute;left:552px;top:592px;width:392px;height:108px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#32674b">FE4 · ↑ F2 · med designer</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: System user delegation flow</p>
</div>
<div id="c4269" style="position:absolute;left:552px;top:708px;width:392px;height:108px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">X1 · Bug · ↑ F3</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">RDF export omits contact points</p>
</div>
<div id="c3296" style="position:absolute;left:976px;top:360px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#0860a3">B6 · PR åpen</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Query param for party switch, system user</p>
</div>
<div id="c4511" style="position:absolute;left:976px;top:476px;width:392px;height:108px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">X2 · Bug · PR åpen</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">Enduser-api: delegated clients 500</p>
</div>
<div id="c4605" style="position:absolute;left:1400px;top:360px;width:392px;height:108px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#056d13">B1 · merget 09:40</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Backend: approval limited to RightKeys</p>
</div>
<div id="n2" style="position:absolute;left:1400px;top:492px;width:392px;background:#111d46;border-radius:4px;padding:24px;display:flex;flex-direction:column;gap:12px" data-build-in="pop 2 auto">
<p style="font-size:24px;line-height:1.25;color:#ffffff">Parent-featuren (↑) står på hvert kort. En frontend-oppgave med designer er en vanlig oppgave her.</p>
<p style="font-size:24px;line-height:1.25;color:#a5d6fb">In review betyr: ta neste. Kortet forlater ved merge, ikke ved godkjenning.</p>
</div>
</section>

<section id="v-test" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visning 3 av 8 · Testere</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Testtavlen: kolonnene er Test phase</h2>
<p id="flt" style="position:absolute;left:128px;top:244px;width:390px;font-family:'JetBrains Mono', 'Courier New', monospace;font-size:24px;padding:6px 14px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">label:skill/test is:open</p>
<p id="inf" style="position:absolute;left:1220px;top:250px;width:572px;font-size:24px;text-align:right;color:#545c7a">Kolonner: Test phase, ikke Status</p>
<p id="k1" style="position:absolute;left:128px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#fae6c6;color:#3c2807">No phase · 1</p>
<p id="k2" style="position:absolute;left:552px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#fae6c6;color:#3c2807">Preparing · 2</p>
<p id="k3" style="position:absolute;left:976px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#fae6c6;color:#3c2807">Executing · 2</p>
<p id="k4" style="position:absolute;left:1400px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#fae6c6;color:#3c2807">Retest · 0</p>
<div id="t4712" style="position:absolute;left:128px;top:360px;width:392px;height:108px;background:#fcf2e2;border:1px solid #a56d13;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 1 auto">
<p style="font-size:24px;line-height:1.2;color:#80540f">T4 · ↑ F4 · neste iterasjon</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test: Delegation overview end to end</p>
</div>
<div id="t4698" style="position:absolute;left:552px;top:360px;width:392px;height:108px;background:#fcf2e2;border:1px solid #a56d13;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 2 auto">
<p style="font-size:24px;line-height:1.2;color:#80540f">T2 · ↑ F1 · 2 av 5</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test: Rights selection on approval</p>
</div>
<div id="t4713" style="position:absolute;left:552px;top:476px;width:392px;height:108px;background:#fcf2e2;border:1px solid #a56d13;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 2 auto">
<p style="font-size:24px;line-height:1.2;color:#80540f">T5 · ↑ B5</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test: Via-party mode, alone</p>
</div>
<div id="t4606" style="position:absolute;left:976px;top:360px;width:392px;height:108px;background:#fae6c6;border:2px solid #a56d13;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 3 auto">
<p style="font-size:24px;line-height:1.2;color:#80540f">T1 · ↑ F1</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test: Approval limited to RightKeys</p>
</div>
<div id="t4690" style="position:absolute;left:976px;top:476px;width:392px;height:108px;background:#fae6c6;border:2px solid #a56d13;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 3 auto">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">T3 · ↑ F2 · bug X3 meldt</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#3c2807">Test: System user delegation flow</p>
</div>
<div id="n3" style="position:absolute;left:1400px;top:360px;width:392px;background:#111d46;border-radius:4px;padding:24px;display:flex;flex-direction:column;gap:12px" data-build-in="pop 4 auto">
<p style="font-size:24px;line-height:1.25;color:#ffffff">Utviklerens omtale kl. 09:40 var signalet: testeren dro T1 til Executing. Den utsatte designreviewen er gjort.</p>
<p style="font-size:24px;line-height:1.25;color:#a5d6fb">Done er ikke en kolonne. En lukket testoppgave forsvinner fra visningen.</p>
</div>
<p style="position:absolute;left:128px;top:640px;width:1200px;font-size:24px;line-height:1.3;color:#545c7a" data-build-in="fade 5 auto">På iterasjonstavlen står de fleste av disse i In progress. Her er det fasen som teller. Hvor nær en feature er utførelse, ser du i Features-visningen.</p>
</section>

<section id="v-design" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visning 4 av 8 · Designere og designleder</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Design: frontend-oppgavene med designer</h2>
<p style="position:absolute;left:128px;top:244px;width:410px;font-family:'JetBrains Mono', 'Courier New', monospace;font-size:24px;padding:6px 14px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">label:skill/design is:open</p>
<p style="position:absolute;left:1020px;top:250px;width:772px;font-size:24px;text-align:right;color:#545c7a">Kolonner: Status · sortert på Iteration, så Priority</p>
<p style="position:absolute;left:128px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Backlog · 2</p>
<p style="position:absolute;left:466px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Ready · 1</p>
<p style="position:absolute;left:804px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In progress · 1</p>
<p style="position:absolute;left:1142px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In review · 0</p>
<p style="position:absolute;left:1480px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Done · 1</p>
<div style="position:absolute;left:128px;top:360px;width:312px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 1 auto">
<p style="font-size:24px;line-height:1.2;color:#32674b">FE3 · ↑ F4 · neste iterasjon</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: consent dialog, rights selection</p>
</div>
<div style="position:absolute;left:128px;top:520px;width:312px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 1 auto">
<p style="font-size:24px;line-height:1.2;color:#32674b">FE5 · ↑ F6 · designgjeld</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: activity log, empty state</p>
</div>
<div style="position:absolute;left:466px;top:360px;width:312px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 2 auto">
<p style="font-size:24px;line-height:1.2;color:#32674b">FE1 · ↑ F1 · med utvikleren</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: select rights on request</p>
</div>
<div style="position:absolute;left:804px;top:360px;width:312px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 3 auto">
<p style="font-size:24px;line-height:1.2;color:#32674b">FE4 · ↑ F2 · med utvikleren</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: System user delegation flow</p>
</div>
<div style="position:absolute;left:1480px;top:360px;width:312px;background:#eaf7ef;border:1px solid #56826b;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 4 auto">
<p style="font-size:24px;line-height:1.2;color:#056d13">FE2 · ↑ F1 · merget</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#06331b">Frontend: select rights on approval</p>
</div>
<div style="position:absolute;left:128px;top:712px;width:533px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px 28px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 5 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Ingen designoppgave</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Designeren står på frontend-oppgaven sammen med utvikleren. Merge lukker den for begge.</p>
</div>
<div style="position:absolute;left:693px;top:712px;width:533px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px 28px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 6 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Backlog er med</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Designerne ser hva som kommer: det som er raffinert for neste iterasjon, og designgjelden.</p>
</div>
<div style="position:absolute;left:1258px;top:712px;width:533px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px 28px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 7 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Endringer underveis</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">En designendring mens oppgaven er åpen, er en kommentar. En oppfølging til senere er en ny, liten frontend-oppgave.</p>
</div>
</section>

<section id="v-features" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visning 5 av 8 · Produkteiere, designleder, tech leads og områdeeiere</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Features: fremdrift uten oppgaver</h2>
<p style="position:absolute;left:128px;top:244px;width:404px;font-family:'JetBrains Mono', 'Courier New', monospace;font-size:24px;padding:6px 14px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">type:Epic,Feature is:open</p>
<p style="position:absolute;left:1020px;top:250px;width:772px;font-size:24px;text-align:right;color:#545c7a">Tabell · sortert på Milestone, så Priority</p>
<div style="position:absolute;left:128px;top:352px;width:1664px;height:68px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:428px;width:1664px;height:68px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:504px;width:1664px;height:68px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:580px;width:1664px;height:68px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12)"></div>
<div style="position:absolute;left:128px;top:656px;width:1664px;height:68px;border:1px dashed #717891;border-radius:4px"></div>
<div style="position:absolute;left:128px;top:732px;width:1664px;height:68px;border:1px dashed #717891;border-radius:4px"></div>
<p style="position:absolute;left:152px;top:308px;width:420px;font-size:24px;font-weight:600;color:#545c7a">Tittel</p>
<p style="position:absolute;left:584px;top:308px;width:120px;font-size:24px;font-weight:600;color:#545c7a">Type</p>
<p style="position:absolute;left:712px;top:308px;width:140px;font-size:24px;font-weight:600;color:#545c7a">Milestone</p>
<p style="position:absolute;left:860px;top:308px;width:120px;font-size:24px;font-weight:600;color:#545c7a">Priority</p>
<p style="position:absolute;left:988px;top:308px;width:168px;font-size:24px;font-weight:600;color:#545c7a">Status</p>
<p style="position:absolute;left:1164px;top:308px;width:168px;font-size:24px;font-weight:600;color:#545c7a">Iteration</p>
<p style="position:absolute;left:1344px;top:308px;width:448px;font-size:24px;font-weight:600;color:#545c7a">Sub-issues</p>
<p style="position:absolute;left:152px;top:371px;width:420px;font-size:24px;color:#1e2950">E1 Remove Altinn 2 roles</p>
<p style="position:absolute;left:584px;top:371px;width:120px;font-size:24px;color:#1e2950">Epic</p>
<p style="position:absolute;left:712px;top:371px;width:140px;font-size:24px;color:#1e2950">2027-01</p>
<p style="position:absolute;left:860px;top:371px;width:120px;font-size:24px;color:#1e2950">high</p>
<p style="position:absolute;left:988px;top:371px;width:168px;font-size:24px;color:#1e2950">In progress</p>
<p style="position:absolute;left:1164px;top:371px;width:168px;font-size:24px;color:#1e2950">—</p>
<p style="position:absolute;left:152px;top:447px;width:420px;font-size:24px;color:#1e2950">F1 Approval limited to RightKeys</p>
<p style="position:absolute;left:584px;top:447px;width:120px;font-size:24px;color:#1e2950">Feature</p>
<p style="position:absolute;left:712px;top:447px;width:140px;font-size:24px;color:#1e2950">2026-12</p>
<p style="position:absolute;left:860px;top:447px;width:120px;font-size:24px;color:#1e2950">high</p>
<p style="position:absolute;left:988px;top:447px;width:168px;font-size:24px;color:#1e2950">In progress</p>
<p style="position:absolute;left:1164px;top:447px;width:168px;font-size:24px;color:#1e2950">Iterasjon 1</p>
<p style="position:absolute;left:152px;top:523px;width:420px;font-size:24px;color:#1e2950">F4 Delegation overview</p>
<p style="position:absolute;left:584px;top:523px;width:120px;font-size:24px;color:#1e2950">Feature</p>
<p style="position:absolute;left:712px;top:523px;width:140px;font-size:24px;color:#1e2950">2026-12</p>
<p style="position:absolute;left:860px;top:523px;width:120px;font-size:24px;color:#1e2950">normal</p>
<p style="position:absolute;left:988px;top:523px;width:168px;font-size:24px;color:#1e2950">Ready</p>
<p style="position:absolute;left:1164px;top:523px;width:168px;font-size:24px;color:#1e2950">Iterasjon 2</p>
<p style="position:absolute;left:152px;top:599px;width:420px;font-size:24px;color:#1e2950">F2 System user delegation flow</p>
<p style="position:absolute;left:584px;top:599px;width:120px;font-size:24px;color:#1e2950">Feature</p>
<p style="position:absolute;left:712px;top:599px;width:140px;font-size:24px;color:#1e2950">2026-12</p>
<p style="position:absolute;left:860px;top:599px;width:120px;font-size:24px;color:#1e2950">normal</p>
<p style="position:absolute;left:988px;top:599px;width:168px;font-size:24px;color:#1e2950">In progress</p>
<p style="position:absolute;left:1164px;top:599px;width:168px;font-size:24px;color:#1e2950">Iterasjon 1</p>
<p style="position:absolute;left:152px;top:675px;width:420px;font-size:24px;color:#545c7a">F7 Bulk revoke</p>
<p style="position:absolute;left:584px;top:675px;width:120px;font-size:24px;color:#545c7a">Feature</p>
<p style="position:absolute;left:712px;top:675px;width:140px;font-size:24px;color:#545c7a">—</p>
<p style="position:absolute;left:860px;top:675px;width:120px;font-size:24px;color:#545c7a">—</p>
<p style="position:absolute;left:988px;top:675px;width:168px;font-size:24px;color:#545c7a">Backlog</p>
<p style="position:absolute;left:1164px;top:675px;width:168px;font-size:24px;color:#545c7a">—</p>
<p style="position:absolute;left:1344px;top:675px;width:190px;font-size:24px;color:#545c7a">—</p>
<p style="position:absolute;left:152px;top:751px;width:420px;font-size:24px;color:#545c7a">E2 Move to DIS</p>
<p style="position:absolute;left:584px;top:751px;width:120px;font-size:24px;color:#545c7a">Epic</p>
<p style="position:absolute;left:712px;top:751px;width:140px;font-size:24px;color:#545c7a">2027-03</p>
<p style="position:absolute;left:860px;top:751px;width:120px;font-size:24px;color:#545c7a">normal</p>
<p style="position:absolute;left:988px;top:751px;width:168px;font-size:24px;color:#545c7a">Backlog</p>
<p style="position:absolute;left:1164px;top:751px;width:168px;font-size:24px;color:#545c7a">—</p>
<div style="position:absolute;left:1344px;top:378px;width:190px;height:16px;border-radius:8px;background:#e8e8e9"></div>
<div style="position:absolute;left:1344px;top:454px;width:190px;height:16px;border-radius:8px;background:#e8e8e9"></div>
<div style="position:absolute;left:1344px;top:530px;width:190px;height:16px;border-radius:8px;background:#e8e8e9"></div>
<div style="position:absolute;left:1344px;top:606px;width:190px;height:16px;border-radius:8px;background:#e8e8e9"></div>
<div style="position:absolute;left:1344px;top:758px;width:190px;height:16px;border-radius:8px;background:#e8e8e9"></div>
<div style="position:absolute;left:1344px;top:378px;width:76px;height:16px;border-radius:8px;background:#0062ba" data-build-in="left 1 auto"></div>
<div style="position:absolute;left:1344px;top:454px;width:152px;height:16px;border-radius:8px;background:#0062ba" data-build-in="left 2 auto"></div>
<div style="position:absolute;left:1344px;top:606px;width:48px;height:16px;border-radius:8px;background:#0062ba" data-build-in="left 3 auto"></div>
<p style="position:absolute;left:1548px;top:371px;width:244px;font-size:24px;color:#1e2950">2 av 5 features</p>
<p style="position:absolute;left:1548px;top:447px;width:244px;font-size:24px;font-weight:600;color:#0062ba">4 av 5 · test åpen</p>
<p style="position:absolute;left:1548px;top:523px;width:244px;font-size:24px;color:#1e2950">0 av 6</p>
<p style="position:absolute;left:1548px;top:599px;width:244px;font-size:24px;color:#1e2950">1 av 4</p>
<p style="position:absolute;left:1548px;top:751px;width:244px;font-size:24px;color:#545c7a">0 av 3 features</p>
<p style="position:absolute;left:128px;top:832px;width:800px;font-size:24px;line-height:1.2;color:#1e2950" data-build-in="fade 4 auto">Ingen oppgaver her. Telleren tar med testoppgaven, så «4 av 5» med én åpen betyr som regel: venter på test.</p>
<p style="position:absolute;left:992px;top:832px;width:800px;font-size:24px;line-height:1.2;color:#1e2950" data-build-in="fade 5 auto">Backlog står her: features uten milestone, og prioriterte features som ikke er raffinert. Milestone er signalet til områdeeieren om at raffinering er neste.</p>
</section>

<section id="v-omrade" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visning 6 av 8 · Områdeeier</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Område: kjeden per feature</h2>
<p style="position:absolute;left:128px;top:244px;width:404px;font-family:'JetBrains Mono', 'Courier New', monospace;font-size:24px;padding:6px 14px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">label:area/&lt;name&gt;</p>
<p style="position:absolute;left:1020px;top:250px;width:772px;font-size:24px;text-align:right;color:#545c7a">Tavle · Status · gruppert på Parent issue</p>
<p style="position:absolute;left:128px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Ready</p>
<p style="position:absolute;left:552px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In progress</p>
<p style="position:absolute;left:976px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In review</p>
<p style="position:absolute;left:1400px;top:304px;width:392px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Done</p>
<p style="position:absolute;left:128px;top:368px;width:1664px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#111d46;color:#ffffff">F1 · Approval limited to RightKeys · 2026-12 · 4 av 5 lukket, testoppgave åpen</p>
<p style="position:absolute;left:128px;top:424px;width:392px;font-size:24px;font-weight:600;padding:10px 16px;border-radius:4px;background:#fcf2e2;border:1px solid #a56d13;color:#3c2807">T1 · Test</p>
<p style="position:absolute;left:1400px;top:424px;width:392px;font-size:24px;font-weight:600;padding:10px 16px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">B1 · Backend</p>
<p style="position:absolute;left:1400px;top:484px;width:392px;font-size:24px;font-weight:600;padding:10px 16px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">FE2 · Frontend</p>
<p style="position:absolute;left:552px;top:430px;width:816px;font-size:28px;font-weight:600;color:#0062ba" data-build-in="rise 1 auto">← Venter bare på testeren</p>
<p style="position:absolute;left:128px;top:568px;width:1664px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#111d46;color:#ffffff">F4 · Delegation overview · 2026-12 · raffinert, kommer i neste iterasjon</p>
<p style="position:absolute;left:128px;top:624px;width:392px;font-size:24px;font-weight:600;padding:10px 16px;border-radius:4px;background:#eaf7ef;border:1px solid #56826b;color:#06331b">FE3 · Frontend, med designer</p>
<p style="position:absolute;left:128px;top:684px;width:392px;font-size:24px;font-weight:600;padding:10px 16px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">B9 · Backend</p>
<p style="position:absolute;left:552px;top:660px;width:1240px;font-size:28px;font-weight:600;color:#0062ba" data-build-in="rise 2 auto">← Nettopp raffinert: de første oppgavene er flyttet til Ready for hånd</p>
<p style="position:absolute;left:128px;top:768px;width:1664px;font-size:24px;font-weight:600;padding:6px 14px;border-radius:4px;border:2px dashed #717891;color:#545c7a">F7 · Bulk revoke · ingen milestone · Backlog, ikke raffinert</p>
<p style="position:absolute;left:128px;top:836px;width:1664px;font-size:24px;line-height:1.2;color:#545c7a" data-build-in="fade 3 auto">Her ser områdeeieren hva som står for tur til raffinering. Tilbyr ikke menyen gruppering på Parent issue, sorter på den i stedet: oppgavene havner likevel sammen.</p>
</section>

<section id="v-vakt" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visning 7 av 8 · Vakt</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Vakt: på tavlen, men utenfor iterasjonen</h2>
<p style="position:absolute;left:128px;top:244px;width:700px;font-family:'JetBrains Mono', 'Courier New', monospace;font-size:24px;padding:6px 14px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">label:kind/question,kind/incident is:open</p>
<p style="position:absolute;left:1104px;top:250px;width:688px;font-size:24px;text-align:right;color:#545c7a">Tavle · Status · ingen iterasjon</p>
<p style="position:absolute;left:128px;top:304px;width:288px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Backlog</p>
<p style="position:absolute;left:440px;top:304px;width:288px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In progress</p>
<p style="position:absolute;left:752px;top:304px;width:288px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Done</p>
<div style="position:absolute;left:128px;top:360px;width:288px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#0860a3">Q1 · question</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">Vendor asks: why is delegation rejected for org X</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Fra Slack</p>
</div>
<div style="position:absolute;left:440px;top:360px;width:288px;background:#ffffff;border:1px solid #b8bbc8;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#0860a3">Q2 · question</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#1e2950">CRM case: client delegation not visible</p>
<p style="font-size:24px;line-height:1.2;color:#545c7a">Oppgave B10 opprettet</p>
</div>
<div style="position:absolute;left:440px;top:584px;width:288px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">Q3 · incident</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">Authorize API 5xx spike, AT</p>
<p style="font-size:24px;line-height:1.2;color:#b81a1a">I iterasjonen, forbi Ready</p>
</div>
<p style="position:absolute;left:128px;top:768px;width:912px;font-size:24px;line-height:1.2;color:#1e2950">Backlog er en kolonne her: mottatt, men ikke startet, er en reell tilstand for en vaktsak.</p>
<p style="position:absolute;left:128px;top:840px;width:912px;font-size:24px;line-height:1.2;color:#545c7a">Hendelsen står også på iterasjonstavlen fordi den fikk gjeldende iterasjon. Spørsmålene gjør ikke det.</p>
<!-- right flow: box1 1104,304,688,80  box2 1104,432,688,104  L 1104,600,328,176  R 1464,600,328,176  box4 1104,824,688,96 -->
<div style="position:absolute;left:1104px;top:304px;width:688px;height:80px;background:#111d46;border-radius:4px;padding:0 24px;display:flex;align-items:center" data-build-in="pop 1 auto">
<p style="font-size:24px;font-weight:600;color:#ffffff">Sak fra Slack eller CRM</p>
</div>
<div style="position:absolute;left:1104px;top:432px;width:688px;height:104px;background:#ffffff;border:2px solid #717891;border-radius:4px;padding:0 24px;display:flex;align-items:center" data-build-in="pop 2 auto">
<p style="font-size:24px;line-height:1.2;color:#1e2950">Issue med <b>kind/question</b> eller <b>kind/incident</b> og <b>area/*</b>. Spørsmål får ingen iterasjon, hendelser får den gjeldende</p>
</div>
<div style="position:absolute;left:1104px;top:600px;width:328px;height:176px;background:#dcebf6;border:2px solid #1f7dc5;border-radius:4px;padding:16px 20px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 3 auto">
<p style="font-size:24px;font-weight:600;color:#042d4d">Trenger kode?</p>
<p style="font-size:24px;line-height:1.2;color:#0860a3">Vakten lager en oppgave eller bug under riktig feature</p>
</div>
<div style="position:absolute;left:1464px;top:600px;width:328px;height:176px;background:#fbf1f1;border:2px solid #ce4d4d;border-radius:4px;padding:16px 20px;display:flex;flex-direction:column;gap:8px" data-build-in="pop 3 auto">
<p style="font-size:24px;font-weight:600;color:#590d0d">Hendelse?</p>
<p style="font-size:24px;line-height:1.2;color:#b81a1a">Rett til In progress i iterasjonen, forbi Ready</p>
</div>
<div style="position:absolute;left:1104px;top:824px;width:688px;height:96px;background:#ecf6ee;border:2px solid #108c22;border-radius:4px;padding:0 24px;display:flex;align-items:center" data-build-in="pop 4 auto">
<p style="font-size:24px;line-height:1.2;color:#023409">Vakten lukker saken når den er besvart eller løst. Hendelser tar vi opp i resultatmøtet.</p>
</div>
<x-connector x1="1448" y1="384" x2="1448" y2="432" style="color:#545c7a;border-width:3px" data-build-in="fade 2 auto"></x-connector>
<x-connector x1="1448" y1="536" x2="1448" y2="568" head="none" style="color:#545c7a;border-width:3px" data-build-in="fade 3 auto"></x-connector>
<x-connector x1="1268" y1="568" x2="1628" y2="568" head="none" style="color:#545c7a;border-width:3px" data-build-in="fade 3 auto"></x-connector>
<x-connector x1="1268" y1="568" x2="1268" y2="600" style="color:#545c7a;border-width:3px" data-build-in="fade 3 auto"></x-connector>
<x-connector x1="1628" y1="568" x2="1628" y2="600" style="color:#545c7a;border-width:3px" data-build-in="fade 3 auto"></x-connector>
<x-connector x1="1268" y1="776" x2="1268" y2="800" head="none" style="color:#545c7a;border-width:3px" data-build-in="fade 4 auto"></x-connector>
<x-connector x1="1628" y1="776" x2="1628" y2="800" head="none" style="color:#545c7a;border-width:3px" data-build-in="fade 4 auto"></x-connector>
<x-connector x1="1268" y1="800" x2="1628" y2="800" head="none" style="color:#545c7a;border-width:3px" data-build-in="fade 4 auto"></x-connector>
<x-connector x1="1448" y1="800" x2="1448" y2="824" style="color:#545c7a;border-width:3px" data-build-in="fade 4 auto"></x-connector>
</section>

<section id="v-bugs" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Visning 8 av 8 · Alle</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Bugs: alle åpne feil på ett sted</h2>
<p style="position:absolute;left:128px;top:244px;width:300px;font-family:'JetBrains Mono', 'Courier New', monospace;font-size:24px;padding:6px 14px;border-radius:4px;background:#ffffff;border:1px solid #b8bbc8;color:#1e2950">type:Bug is:open</p>
<p style="position:absolute;left:1220px;top:250px;width:572px;font-size:24px;text-align:right;color:#545c7a">Kolonner: Status · sortert på Priority</p>
<p style="position:absolute;left:128px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Backlog · 1</p>
<p style="position:absolute;left:466px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Ready · 1</p>
<p style="position:absolute;left:804px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In progress · 1</p>
<p style="position:absolute;left:1142px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">In review · 1</p>
<p style="position:absolute;left:1480px;top:304px;width:312px;font-size:24px;font-weight:600;padding:8px 16px;border-radius:4px;background:#d3eafd;color:#1e2950">Done · 1</p>
<div style="position:absolute;left:128px;top:360px;width:312px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 1 auto">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">X4 · ingen iterasjon</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">Delegation list shows wrong org name</p>
</div>
<div style="position:absolute;left:466px;top:360px;width:312px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 2 auto">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">X3 · ↑ F2 · funnet i test</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">Consent dialog loses selection on back</p>
</div>
<div style="position:absolute;left:804px;top:360px;width:312px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 3 auto">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">X1 · ↑ F3</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">RDF export omits contact points</p>
</div>
<div style="position:absolute;left:1142px;top:360px;width:312px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 4 auto">
<p style="font-size:24px;line-height:1.2;color:#b81a1a">X2 · PR åpen</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">Enduser-api: delegated clients 500</p>
</div>
<div style="position:absolute;left:1480px;top:360px;width:312px;background:#fbf1f1;border:1px solid #ce4d4d;border-radius:4px;padding:8px 16px;display:flex;flex-direction:column;gap:4px" data-build-in="rise 5 auto">
<p style="font-size:24px;line-height:1.2;color:#056d13">X5 · merget</p>
<p style="font-size:24px;font-weight:600;line-height:1.2;color:#590d0d">Activity log pagination off by one</p>
</div>
<div style="position:absolute;left:128px;top:672px;width:533px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px 28px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 6 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Ingenting blir borte</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Alle åpne bugs samlet, uansett feature, også det som er funnet i test eller meldt utenfra.</p>
</div>
<div style="position:absolute;left:693px;top:672px;width:533px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px 28px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 7 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Oversikt, ikke arbeidskø</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Bugs under en feature står også på utviklertavlen. Der henter utviklerne arbeidet.</p>
</div>
<div style="position:absolute;left:1258px;top:672px;width:533px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:24px 28px;display:flex;flex-direction:column;gap:8px" data-build-in="rise 8 auto">
<p style="font-size:24px;font-weight:600;color:#0062ba">Backlog er med</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Noen melder ofte en bug før teamet har bestemt når det skal rette den.</p>
</div>
</section>

<section id="backlog" data-transition="fade" style="background:#0062ba;color:#ffffff;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:280px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#d3eafd;line-height:1.2">Her ser du Backlog</p>
<p style="position:absolute;left:128px;top:332px;width:1600px;font-size:64px;font-weight:500;line-height:1.15;color:#ffffff" data-build-in="rise 1 auto">Backlog står der noen bestemmer hva som skal skje med det som ikke er startet.</p>
<div style="position:absolute;left:128px;top:600px;width:188px;height:132px;border:2px solid #a5d6fb;border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="fade 2 auto">
<p style="font-size:28px;font-weight:600;color:#ffffff">Iterasjon</p>
<p style="font-size:24px;line-height:1.2;color:#d3eafd">Ingen Backlog</p>
</div>
<div style="position:absolute;left:338px;top:600px;width:188px;height:132px;border:2px solid #a5d6fb;border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="fade 2 auto">
<p style="font-size:28px;font-weight:600;color:#ffffff">Utviklere</p>
<p style="font-size:24px;line-height:1.2;color:#d3eafd">Ingen Backlog</p>
</div>
<div style="position:absolute;left:548px;top:600px;width:188px;height:132px;border:2px solid #a5d6fb;border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:8px" data-build-in="fade 2 auto">
<p style="font-size:28px;font-weight:600;color:#ffffff">Test</p>
<p style="font-size:24px;line-height:1.2;color:#d3eafd">Ingen Backlog</p>
</div>
<div style="position:absolute;left:758px;top:600px;width:188px;height:132px;background:#ffffff;border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 8px 0 rgba(0,0,0,0.18)" data-build-in="pop 3 auto">
<p style="font-size:28px;font-weight:600;color:#111d46">Design</p>
<p style="font-size:24px;line-height:1.2;font-weight:600;color:#0062ba">Viser Backlog</p>
</div>
<div style="position:absolute;left:968px;top:600px;width:188px;height:132px;background:#ffffff;border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 8px 0 rgba(0,0,0,0.18)" data-build-in="pop 4 auto">
<p style="font-size:28px;font-weight:600;color:#111d46">Features</p>
<p style="font-size:24px;line-height:1.2;font-weight:600;color:#0062ba">Viser Backlog</p>
</div>
<div style="position:absolute;left:1178px;top:600px;width:188px;height:132px;background:#ffffff;border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 8px 0 rgba(0,0,0,0.18)" data-build-in="pop 5 auto">
<p style="font-size:28px;font-weight:600;color:#111d46">Område</p>
<p style="font-size:24px;line-height:1.2;font-weight:600;color:#0062ba">Viser Backlog</p>
</div>
<div style="position:absolute;left:1388px;top:600px;width:188px;height:132px;background:#ffffff;border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 8px 0 rgba(0,0,0,0.18)" data-build-in="pop 6 auto">
<p style="font-size:28px;font-weight:600;color:#111d46">Vakt</p>
<p style="font-size:24px;line-height:1.2;font-weight:600;color:#0062ba">Viser Backlog</p>
</div>
<div style="position:absolute;left:1598px;top:600px;width:188px;height:132px;background:#ffffff;border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 8px 0 rgba(0,0,0,0.18)" data-build-in="pop 7 auto">
<p style="font-size:28px;font-weight:600;color:#111d46">Bugs</p>
<p style="font-size:24px;line-height:1.2;font-weight:600;color:#0062ba">Viser Backlog</p>
</div>
<p style="position:absolute;left:128px;top:788px;width:1400px;font-size:28px;line-height:1.4;color:#e9f5ff" data-build-in="fade 8 auto">Backlog er alt som ikke er i en iterasjon. Tavlene for utviklere og testere starter i Ready. Designerne ser Backlog for å vite hva som kommer.</p>
</section>

<section id="dor" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Avtaler</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Nok til å starte, og ferdig</h2>
<div style="position:absolute;left:128px;top:280px;width:816px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:32px;display:flex;flex-direction:column;gap:16px" data-build-in="rise 1 auto">
<p style="font-size:40px;font-weight:600;color:#1e2950">Definition of Ready</p>
<p style="font-size:24px;line-height:1.25;color:#545c7a">Nok til å starte, ikke ferdig spesifisert. Områdeeieren kan flytte en feature til Ready når den har</p>
<div style="display:flex;gap:16px;align-items:flex-start">
<x-icon name="Check" style="width:32px;height:32px;color:#068718"></x-icon>
<p style="flex:1;font-size:24px;line-height:1.25;color:#1e2950">prioritet og milestone fra prioriteringen, og en epic der en finnes</p>
</div>
<div style="display:flex;gap:16px;align-items:flex-start">
<x-icon name="Check" style="width:32px;height:32px;color:#068718"></x-icon>
<p style="flex:1;font-size:24px;line-height:1.25;color:#1e2950">et mål og hovedkriterier for akseptanse som andre enn forfatteren kan teste mot</p>
</div>
<div style="display:flex;gap:16px;align-items:flex-start">
<x-icon name="Check" style="width:32px;height:32px;color:#068718"></x-icon>
<p style="flex:1;font-size:24px;line-height:1.25;color:#1e2950">en navngitt tester, en designer på frontend-oppgaven når brukerne ser endringen, og en utvikler der en er kjent</p>
</div>
<div style="display:flex;gap:16px;align-items:flex-start">
<x-icon name="Check" style="width:32px;height:32px;color:#068718"></x-icon>
<p style="flex:1;font-size:24px;line-height:1.25;color:#1e2950">en første oppgave som sub-issue</p>
</div>
</div>
<div style="position:absolute;left:976px;top:280px;width:816px;background:#111d46;border-radius:4px;padding:32px;display:flex;flex-direction:column;gap:16px" data-build-in="rise 2 auto">
<p style="font-size:40px;font-weight:600;color:#ffffff">Definition of Done</p>
<p style="font-size:24px;font-weight:600;color:#a5d6fb">En oppgave er ferdig når den er merget</p>
<p style="font-size:24px;line-height:1.25;color:#e9f5ff">Testene er grønne. Utvikleren skriver enhets- og integrasjonstestene før oppgaven går til In review.</p>
<p style="font-size:24px;font-weight:600;color:#a5d6fb">En feature er ferdig når</p>
<p style="font-size:24px;line-height:1.25;color:#e9f5ff">alle oppgavene er merget, testoppgaven er lukket med godkjent resultat, og endringen er i produksjon.</p>
<p style="font-size:24px;font-weight:600;color:#a5d6fb">Designreview</p>
<p style="font-size:24px;line-height:1.25;color:#e9f5ff">Alt brukerne ser, går gjennom en designer. Én review, på pull requesten eller senere i AT, før testeren lukker testoppgaven.</p>
</div>
<p style="position:absolute;left:128px;top:824px;width:1664px;font-size:24px;line-height:1.3;color:#545c7a" data-build-in="fade 3 auto"><b>Resten av featuren</b> deler utvikleren i oppgaver i løpet av iterasjonen. En oppgave eller bug uten feature som trenger manuell test, får sin egen testoppgave når utvikleren åpner pull requesten.</p>
</section>

<section id="automasjon" data-transition="fade" style="background:#e9f5ff;color:#1e2950;font-family:Inter, Arial, sans-serif">
<p style="position:absolute;left:128px;top:112px;width:1664px;font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba;line-height:1.2">Veien videre</p>
<h2 style="position:absolute;left:128px;top:152px;width:1664px;font-size:64px;font-weight:500;line-height:1.1;color:#1e2950">Overleveringer for hånd først, en Action senere</h2>
<div style="position:absolute;left:128px;top:288px;width:512px;height:520px;background:#ffffff;border-radius:4px;box-shadow:0 0 1px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.12);padding:32px;display:flex;flex-direction:column;gap:16px" data-build-in="rise 1 auto">
<p style="font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba">Innebygd nå</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Ny issue fra repoet havner på tavlen</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Lukket issue går til Done</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Gjenåpnet issue går til In progress</p>
</div>
<div style="position:absolute;left:704px;top:288px;width:512px;height:520px;background:#d3eafd;border-radius:4px;padding:32px;display:flex;flex-direction:column;gap:16px" data-build-in="rise 2 auto">
<p style="font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0062ba">For hånd de første iterasjonene</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Utvikleren flytter oppgaver som ventet, til Ready</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Utvikleren nevner testeren i testoppgaven</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Testeren setter Test phase</p>
<p style="font-size:24px;line-height:1.25;color:#1e2950">Agile coach arkiverer Done etter resultatmøtet</p>
</div>
<div style="position:absolute;left:1280px;top:288px;width:512px;height:520px;background:#111d46;border-radius:4px;padding:32px;display:flex;flex-direction:column;gap:16px" data-build-in="rise 4 auto">
<p style="font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#a5d6fb">Senere: handoff-Action</p>
<p style="font-size:24px;line-height:1.25;color:#ffffff">Når en issue blir lukket, flytter den det som ventet, til Ready</p>
<p style="font-size:24px;line-height:1.25;color:#ffffff">Den flytter testoppgaven til Executing</p>
<p style="font-size:24px;line-height:1.25;color:#ffffff">Den kommenterer til områdeeieren når en feature får milestone</p>
<p style="font-size:24px;line-height:1.25;color:#c9d3f0">Beskrevet i board-setup og #4088. Den kommer når labels og skjema er på plass, siden den matcher på dem.</p>
</div>
<x-connector x1="1216" y1="548" x2="1280" y2="548" style="color:#0062ba;border-width:4px" data-build-in="fade 3 auto"></x-connector>
<p style="position:absolute;left:128px;top:840px;width:1664px;font-size:24px;line-height:1.3;color:#545c7a" data-build-in="fade 5 auto"><b>Vi bestemmer senere:</b> release-flyten til TT02 og produksjon, og hotfix. Release-gruppen bestemmer. Til da ruller en merge ut til AT, TT02 på onsdager og produksjon på tirsdager.</p>
</section>

<section id="slutt" data-transition="fade" style="background:#111d46;color:#ffffff;font-family:Inter, Arial, sans-serif">
<div style="position:absolute;left:1184px;top:240px;width:128px;height:600px;background:rgba(255,255,255,0.06);border-radius:8px"></div>
<div style="position:absolute;left:1344px;top:240px;width:128px;height:600px;background:rgba(255,255,255,0.06);border-radius:8px"></div>
<div style="position:absolute;left:1504px;top:240px;width:128px;height:600px;background:rgba(255,255,255,0.06);border-radius:8px"></div>
<div style="position:absolute;left:1664px;top:240px;width:128px;height:600px;background:rgba(255,255,255,0.06);border-radius:8px"></div>
<div style="position:absolute;left:1196px;top:256px;width:104px;height:12px;background:rgba(255,255,255,0.3);border-radius:6px"></div>
<div style="position:absolute;left:1356px;top:256px;width:104px;height:12px;background:rgba(255,255,255,0.3);border-radius:6px"></div>
<div style="position:absolute;left:1516px;top:256px;width:104px;height:12px;background:rgba(255,255,255,0.3);border-radius:6px"></div>
<div style="position:absolute;left:1676px;top:256px;width:104px;height:12px;background:rgba(255,255,255,0.3);border-radius:6px"></div>
<div style="position:absolute;left:1676px;top:288px;width:104px;height:56px;background:#ffffff;border-radius:4px" data-build-in="drop 3 auto"></div>
<div style="position:absolute;left:1676px;top:356px;width:104px;height:56px;background:#a8f3d0;border-radius:4px" data-build-in="drop 4 auto"></div>
<div style="position:absolute;left:1676px;top:424px;width:104px;height:56px;background:#ffffff;border-radius:4px" data-build-in="drop 5 auto"></div>
<div style="position:absolute;left:1676px;top:492px;width:104px;height:56px;background:#fae6c6;border-radius:4px" data-build-in="drop 6 auto"></div>
<div style="position:absolute;left:1676px;top:560px;width:104px;height:56px;background:#ffffff;border-radius:4px" data-build-in="drop 7 auto"></div>
<h1 style="position:absolute;left:128px;top:300px;width:1000px;font-size:96px;font-weight:600;line-height:1.1;letter-spacing:-1px;color:#ffffff" data-build-in="rise 1 auto">Vi starter<br>med dette</h1>
<p style="position:absolute;left:128px;top:560px;width:900px;font-size:40px;line-height:1.3;color:#c9d3f0" data-build-in="rise 2 auto">og ser på det igjen i retroen 18. desember, etter tre iterasjoner.</p>
<p style="position:absolute;left:128px;top:760px;width:1000px;font-size:24px;line-height:1.5;color:#a5d6fb" data-build-in="fade 8 auto">Beslutningene: docs/adr/0005-planning-and-flow.md<br>Håndboken: docs/process/how-we-work.md<br>Visningene: docs/process/board-views.md<br>Tavleoppsettet: docs/process/board-setup.md og #4088</p>
</section>
