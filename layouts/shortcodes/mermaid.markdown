{{- /*
  Mermaid-kortkoden i Markdown-versjonen av siden (index.md).
  Vi lager Markdown-versjonen fra HTML-en (se partials/markdown/page.html). Med
  HTML-en til temaet blir diagramkilden én linje løpende tekst, så her lager vi
  en kodeblokk med språket mermaid i stedet.
*/ -}}
<pre><code class="language-mermaid">{{ trim .Inner "\n" | htmlEscape }}</code></pre>
