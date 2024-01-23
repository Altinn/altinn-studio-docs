---
title: Getting started
description: Information about how to get started
tags: [development]
weight: 100
---
<style>
.highlight-source-batchfile {
  color: #fff !important;
}
</style>
<div id="readmeContent"></div>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  let content = document.getElementById('readmeContent');
  if (content.innerHTML === '') {
    content.innerHTML = 'Loading from github...';
  }  
   axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://github.com/Altinn/altinn-studio/blob/main/README.md`)
    .then((res) => {
      const doc = new DOMParser().parseFromString(res.data, "text/html");

      content.innerHTML = doc.getElementById('readme').innerHTML;
      });
</script>
