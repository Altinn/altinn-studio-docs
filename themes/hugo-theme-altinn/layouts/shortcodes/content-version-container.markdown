{{/* For markdown output, just render the inner content without the UI container */}}
{{ with .Get "version-label" }}**{{ . }}**

{{ end }}
{{.Inner | .Page.RenderString }}
