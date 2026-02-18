---
draft: true
headless: true
hidden: true
---

<style>
code {
    max-height: 500px;
}
code.language-xml {
  white-space: pre !important;
}
code.language-xml > span[style*="background-color"] {
  display: block !important;
  min-width: var(--full-line-width, 100%);
}
</style>

<script>
$(window).load(function() {
  const $codeBlock = $('.highlight code.language-xml').first();

  function applyHighlightWidth() {
    const $elmnt = $codeBlock.get(0);
    if (!$elmnt)
        return;

    $elmnt.style.setProperty('--full-line-width', $elmnt.scrollWidth + 'px');
  }

  function scrollToHighlight() {
    const $hlSpan = $codeBlock.find('span[style*="background-color"]').first();
    if (!$hlSpan.length)
        return;

    const offsetTop = $hlSpan.position().top;
    $codeBlock.scrollTop(offsetTop);
  }

  applyHighlightWidth();
  scrollToHighlight();
});
</script>
