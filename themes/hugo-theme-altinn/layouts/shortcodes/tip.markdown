{{- if .Get "title" -}}
💡 **{{ .Get "title" | htmlUnescape }}**

{{ .Inner | strings.TrimSpace }}
{{- else -}}
💡 **Tip**: {{ .Inner | strings.TrimSpace }}
{{- end -}}
