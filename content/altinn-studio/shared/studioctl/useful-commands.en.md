---
headless: true
hidden: true
---

Useful commands:

<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>studioctl env up --open</code></td>
      <td>Starts the local test platform and opens local.altinn.cloud on port <code>8000</code>.</td>
    </tr>
    <tr>
      <td><code>studioctl env status</code></td>
      <td>Shows local test platform status.</td>
    </tr>
    <tr>
      <td><code>studioctl env logs</code></td>
      <td>Shows logs from the LocalTest containers.</td>
    </tr>
    <tr>
      <td><code>studioctl run --detach</code></td>
      <td>Runs the app in the background.</td>
    </tr>
    <tr>
      <td><code>studioctl app logs</code></td>
      <td>Shows logs from an app running in the background. Use <code>--follow</code> for live logs.</td>
    </tr>
    <tr>
      <td><code>studioctl stop</code></td>
      <td>Stops apps started with <code>studioctl run --detach</code>.</td>
    </tr>
    <tr>
      <td><code>studioctl env down</code></td>
      <td>Stops the local test platform.</td>
    </tr>
    <tr>
      <td><code>studioctl doctor</code></td>
      <td>Diagnoses missing tools and local environment issues.</td>
    </tr>
  </tbody>
</table>
