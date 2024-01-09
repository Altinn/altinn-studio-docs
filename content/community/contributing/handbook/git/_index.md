---
title: Git
description: Information about version control with Git
tags: [development, git]
weight: 100
---
<div id="contributionContent"></div>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  let content = document.getElementById('contributionContent');
  if (content.innerHTML === '') {
    content.innerHTML = 'Loading from github...';
  }
   axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://github.com/Altinn/altinn-studio/blob/master/docs/CONTRIBUTING.md`)
    .then((res) => {
      const doc = new DOMParser().parseFromString(res.data, "text/html");

      content.innerHTML = doc.getElementById('readme').innerHTML;
      });
</script>
