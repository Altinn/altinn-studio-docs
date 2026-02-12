{{- $showhidden := .Get "showhidden" -}}
{{- $depth :=  .Get "depth" | default 1 -}}
{{- $withDescription :=  .Get "description" | default false -}}
{{- $sortTerm :=  .Get "sort" | default "Weight" -}}

{{- .Scratch.Set "current" .Page -}}

{{- if (.Get "page") -}}
	{{- with .Site.GetPage "section" (.Get "page") -}}
		{{- $.Scratch.Set "current" . -}}
	{{- end -}}
{{- end -}}

{{- $cpage := (.Scratch.Get "current") -}}

{{- .Scratch.Set "pages" $cpage.Pages -}}
{{- if $cpage.Sections -}}
    {{- .Scratch.Set "pages" ($cpage.Pages | union $cpage.Sections) -}}
{{- end -}}
{{ $pages := (.Scratch.Get "pages") }}

{{ if eq $sortTerm "Weight" }}
	{{template "childs-md" dict "menu" $pages.ByWeight "showhidden" $showhidden "count" 1 "depth" $depth "description" $withDescription "sortTerm" $sortTerm "Page" .Page}}
{{ else if eq $sortTerm "Name" }}
	{{template "childs-md" dict "menu" $pages.ByTitle "showhidden" $showhidden "count" 1 "depth" $depth "description" $withDescription "sortTerm" $sortTerm "Page" .Page}}
{{ else if eq $sortTerm "NameReverse" }}
	{{template "childs-md" dict "menu" $pages.ByTitle.Reverse "showhidden" $showhidden "count" 1 "depth" $depth "description" $withDescription "sortTerm" $sortTerm "Page" .Page}}
{{ else if eq $sortTerm "PublishDate" }}
	{{template "childs-md" dict "menu" $pages.ByPublishDate "showhidden" $showhidden "count" 1 "depth" $depth "description" $withDescription "sortTerm" $sortTerm "Page" .Page}}
{{ else if eq $sortTerm "Date" }}
	{{template "childs-md" dict "menu" $pages.ByDate "showhidden" $showhidden "count" 1 "depth" $depth "description" $withDescription "sortTerm" $sortTerm "Page" .Page}}
{{ else if eq $sortTerm "Length" }}
	{{template "childs-md" dict "menu" $pages.ByLength "showhidden" $showhidden "count" 1 "depth" $depth "description" $withDescription "sortTerm" $sortTerm "Page" .Page}}
{{ else }}
	{{template "childs-md" dict "menu" $pages "showhidden" $showhidden "count" 1 "depth" $depth "description" $withDescription "sortTerm" $sortTerm "Page" .Page}}
{{ end }}

{{ .Inner }}

{{- define "childs-md" -}}
	{{- range .menu -}}
		{{- if and .Params.hidden (not $.showhidden) -}}
		{{- else }}
- [{{ .Title }}]({{.RelPermalink}}){{- if .Params.SubTitle }} - {{.Params.SubTitle}}{{- end }}
{{- if and .Description $.description }}
  {{ .Description }}
{{- end }}
			{{- if lt $.count $.depth -}}
				{{- $.Page.Scratch.Set "pages" .Pages -}}
				{{- if .Sections -}}
					{{- $.Page.Scratch.Set "pages" (.Pages | union .Sections) -}}
				{{- end -}}
				{{ $pages := ($.Page.Scratch.Get "pages") }}

				{{ if eq $.sortTerm "Weight" }}
					{{template "childs-md" dict "menu" $pages.ByWeight "showhidden" $.showhidden "count" (add $.count 1) "depth" $.depth "description" $.description "sortTerm" $.sortTerm "Page" $.Page}}
				{{ else if eq $.sortTerm "Name" }}
					{{template "childs-md" dict "menu" $pages.ByTitle "showhidden" $.showhidden "count" (add $.count 1) "depth" $.depth "description" $.description "sortTerm" $.sortTerm "Page" $.Page}}
				{{ else if eq $.sortTerm "NameReverse" }}
					{{template "childs-md" dict "menu" $pages.ByTitle.Reverse "showhidden" $.showhidden "count" (add $.count 1) "depth" $.depth "description" $.description "sortTerm" $.sortTerm "Page" $.Page}}
				{{ else if eq $.sortTerm "PublishDate" }}
					{{template "childs-md" dict "menu" $pages.ByPublishDate "showhidden" $.showhidden "count" (add $.count 1) "depth" $.depth "description" $.description "sortTerm" $.sortTerm "Page" $.Page}}
				{{ else if eq $.sortTerm "Date" }}
					{{template "childs-md" dict "menu" $pages.ByDate "showhidden" $.showhidden "count" (add $.count 1) "depth" $.depth "description" $.description "sortTerm" $.sortTerm "Page" $.Page}}
				{{ else if eq $.sortTerm "Length" }}
					{{template "childs-md" dict "menu" $pages.ByLength "showhidden" $.showhidden "count" (add $.count 1) "depth" $.depth "description" $.description "sortTerm" $.sortTerm "Page" $.Page}}
				{{ else }}
					{{template "childs-md" dict "menu" $pages "showhidden" $.showhidden "count" (add $.count 1) "depth" $.depth "description" $.description "sortTerm" $.sortTerm "Page" $.Page}}
				{{ end }}
			{{- end -}}
		{{- end -}}
	{{- end -}}
{{- end -}}
