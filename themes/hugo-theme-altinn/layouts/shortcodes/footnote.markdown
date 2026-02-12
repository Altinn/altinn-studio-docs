{{/*

This short code allows for automatically indexed footnotes using markdown footnote syntax.

Usage:

- Add "footnote" shortcodes where you want a numeric reference to a footnote, adding the
  explaining text as a parameter.

- Add {{<displayFootnotes>}} where you want the explanations to be rendered.

*/}}

{{ if not (.Page.Scratch.Get "footnotesInitialized") }}
  {{ .Page.Scratch.Set "footnotes" (dict) }}
  {{ .Page.Scratch.Set "footnoteIndex" 0 }}
  {{ .Page.Scratch.Set "footnotesInitialized" true }}
{{ end }}
{{ $index := add (.Page.Scratch.Get "footnoteIndex") 1 }}
{{ .Page.Scratch.Set "footnoteIndex" $index }}
{{ $footnotes := .Page.Scratch.Get "footnotes" }}
{{ $newFootnotes := merge $footnotes (dict (string $index) (.Get 0)) }}
{{ .Page.Scratch.Set "footnotes" $newFootnotes }}[^{{$index}}]