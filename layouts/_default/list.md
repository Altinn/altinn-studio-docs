---
title: {{ .Title }}
{{- if .Description }}
description: {{ .Description }}
{{- end }}
{{- if .Date }}
date: {{ .Date.Format "2006-01-02" }}
{{- end }}
{{- range $key, $value := .Params }}
{{- if not (in (slice "title" "description" "date") $key) }}
{{ $key }}: {{ $value }}
{{- end }}
{{- end }}
---

{{ .Page.RenderShortcodes }}
