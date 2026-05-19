---
headless: true
hidden: true
---

Nyttige kommandoer:

<table>
  <thead>
    <tr>
      <th>Kommando</th>
      <th>Beskrivelse</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>studioctl env up --open</code></td>
      <td>Starter lokal testplattform og åpner local.altinn.cloud på port <code>8000</code>.</td>
    </tr>
    <tr>
      <td><code>studioctl env status</code></td>
      <td>Viser status for lokal testplattform.</td>
    </tr>
    <tr>
      <td><code>studioctl env logs</code></td>
      <td>Viser logger fra LocalTest-containerne.</td>
    </tr>
    <tr>
      <td><code>studioctl run --detach</code></td>
      <td>Kjører appen i bakgrunnen.</td>
    </tr>
    <tr>
      <td><code>studioctl app logs</code></td>
      <td>Viser logger fra en app som kjører i bakgrunnen. Bruk <code>--follow</code> for løpende logg.</td>
    </tr>
    <tr>
      <td><code>studioctl stop</code></td>
      <td>Stopper apper som er startet med <code>studioctl run --detach</code>.</td>
    </tr>
    <tr>
      <td><code>studioctl env down</code></td>
      <td>Stopper lokal testplattform.</td>
    </tr>
    <tr>
      <td><code>studioctl doctor</code></td>
      <td>Diagnostiserer manglende verktøy og lokale miljøproblemer.</td>
    </tr>
  </tbody>
</table>
