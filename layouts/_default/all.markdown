{{- /*
  The Markdown version of every page and section (index.md), which llms.txt
  points AI tools to. It is converted from the rendered HTML, so it has all the
  text a reader sees on the page. The title and lead text come first, since
  .Content doesn't have them.
*/ -}}
{{ with .Title }}# {{ . }}

{{ end }}{{ with .Description }}{{ . }}

{{ end }}{{ .Content | transform.HTMLToMarkdown -}}
