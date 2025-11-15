<!-- See footnote.markdown for usage information -->
{{ $footnotes := .Page.Scratch.Get "footnotes" }}
{{ if $footnotes }}
{{ range $index, $text := $footnotes }}
[^{{ $index }}]: {{ $text }}
{{ end }}
{{ if not (eq (.Get 0) "noreset") }}
{{ .Page.Scratch.Set "footnotes" (dict) }}
{{ .Page.Scratch.Set "footnoteIndex" 0 }}
{{ .Page.Scratch.Set "footnotesInitialized" false }}
{{ end }}
{{ else }}
{{ errorf "No footnotes defined. See footnote.markdown for usage information." }}
{{ end }}
