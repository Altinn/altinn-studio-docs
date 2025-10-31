{{- if .Get "title" -}}
ℹ️ **{{ .Get "title" | htmlUnescape }}**

{{ .Inner | strings.TrimSpace }}
{{- else -}}
ℹ️ **Info**: {{ .Inner | strings.TrimSpace }}
{{- end -}}
