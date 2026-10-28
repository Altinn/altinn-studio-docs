---
title: {{ .Title | jsonify }}
{{- if .Description }}
description: {{ .Description | jsonify }}
{{- end }}
{{- if .Date }}
date: {{ .Date.Format "2006-01-02" | jsonify }}
{{- end }}
{{- range $key, $value := .Params }}
{{- if not (in (slice "title" "description" "date") $key) }}
{{ $key }}: {{ $value | jsonify }}
{{- end }}
{{- end }}
---

{{ .Page.RenderShortcodes }}
