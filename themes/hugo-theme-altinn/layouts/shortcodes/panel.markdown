{{ $_hugo_config := `{ "version": 1 }` }}
{{- $theme := .Get "theme" | default "primary" -}}
{{- $icon := "" -}}
{{- if eq $theme "info" -}}
  {{- $icon = "ℹ️" -}}
{{- else if eq $theme "warning" -}}
  {{- $icon = "⚠️" -}}
{{- else if eq $theme "success" -}}
  {{- $icon = "✅" -}}
{{- else if eq $theme "danger" -}}
  {{- $icon = "❌" -}}
{{- end -}}

{{ with .Get "header" }}{{ $icon }} **{{ htmlUnescape . }}**

{{ end -}}
{{.Inner | strings.TrimSpace}}
{{ with .Get "footer" }}

---
*{{ htmlUnescape . }}*
{{ end -}}
