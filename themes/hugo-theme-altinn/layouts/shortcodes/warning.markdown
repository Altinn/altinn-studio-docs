{{- if .Get "title" -}}
⚠️ **{{ .Get "title" | htmlUnescape }}**

{{ .Inner | strings.TrimSpace }}
{{- else -}}
⚠️ **Warning**: {{ .Inner | strings.TrimSpace }}
{{- end -}}
