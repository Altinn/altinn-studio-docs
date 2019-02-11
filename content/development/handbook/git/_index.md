---
title: Git
description: Information about version control with Git
tags: ["development", "handbook", "git"]
weight: 100
---
<div id="contributionContent"></div>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
   axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://github.com/Altinn/altinn-studio/blob/master/CONTRIBUTING.md`)
    .then((res) => {
      const doc = new DOMParser().parseFromString(res.data, "text/html");

      document.getElementById('contributionContent').innerHTML = doc.getElementById('readme').innerHTML;
      });
</script>
