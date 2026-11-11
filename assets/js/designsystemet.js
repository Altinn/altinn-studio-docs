// Registrerer web-komponentene og observerne til Designsystemet (https://designsystemet.no/no/fundamentals/code/setup),
// og markeringen i «På denne siden» på dokumentasjonssidene.
// Hugo bygger filen med js.Build i layouts/partials/designsystemet/head.html.
import '@digdir/designsystemet-web';
import { initDocsToc } from './docs-toc.js';

initDocsToc();
