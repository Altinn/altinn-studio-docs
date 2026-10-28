{{- $type := .Get 0 | default "info" -}}
{{- $emoji := "" -}}
{{- if eq $type "warning" -}}
  {{- $emoji = "⚠️" -}}
{{- else if eq $type "info" -}}
  {{- $emoji = "ℹ️" -}}
{{- else if eq $type "tip" -}}
  {{- $emoji = "💡" -}}
{{- else if eq $type "note" -}}
  {{- $emoji = "📝" -}}
{{- end -}}

{{ $emoji }} **{{ $type | title }}**: {{ .Inner | strings.TrimSpace }}
