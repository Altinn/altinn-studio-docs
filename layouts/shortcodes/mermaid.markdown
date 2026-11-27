{{- /*
  The mermaid shortcode in the Markdown version of a page (index.md).
  That Markdown is made from the HTML (see _default/all.markdown), and
  the theme's HTML would turn the diagram source into one line of text, so
  this makes it a mermaid code block instead.
*/ -}}
<pre><code class="language-mermaid">{{ trim .Inner "\n" | htmlEscape }}</code></pre>
