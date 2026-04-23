{{- $_hugo_config := `{ "version": 1 }` -}}
{{- $title := "" -}}
{{- if .IsNamedParams -}}
  {{- $title = .Get "default" | default "Expand me..." -}}
{{- else -}}
  {{- $title = .Get 0 | default "Expand me..." -}}
{{- end -}}

<details>
<summary>{{ $title }}</summary>

{{ .Inner | .Page.RenderString }}

</details>
