---
title: CSS Utilities
description: I utgangspunktet skal kun de fargene som er presentert her brukes. Hvis nye farger blir implementert skal dette gås opp med ansvarlig designer. 
weight: 3
---

## CSS-utilities
Se Bootstraps sider for [utilities](https://v4-alpha.getbootstrap.com/utilities/borders/). Vi har i tillegg noen egne utilities:

- Fontweight: ```.a-fontLight``` ```.a-fontReg```  ```.a-fontMedium```  ```.a-fontBold```

- Overskrifter: ```.a-h1``` ```.a-h2```  ```.a-h3```  ```.a-h4```

- Bakgrunn: ```.a-bgWhite``` ```.a-bgGreen``` ```.a-bgGreenLight``` ```.a-bgGreenLighter``` ```.a-bgBlue``` ```.a-bgBlueLight``` ```.a-bgBlueLighter``` ```.a-bgPurple``` ```.a-bgPurpleLight``` ```.a-bgYellow``` ```.a-bgYellowLight```  ```.a-bgRed```   ```.a-bgRedLight```

- Deaktivert bakgrunn: ```.a-disabled```

- Tekstfarger: ```.a-textWhite``` ```.a-textBlue```

- Stiplet linje i lister: ```.a-dotted``` ```.a-dotted-line-top```

- Lenker uten understrek: ```.a-noUnderline```

- Maks tre linjer tekst: ```.a-maxThreeLines2```

- Position: ```.a-p-relative``` ```.a-p-static ```

- Display: ```a-displayBlock```

<div id="alert-no-arrow" class="a-message a-message-error a-message--arrow-off a-message--fullwidth mb-2 a-py-minus-1">
  NB: Denne listen er ikke fullstendig per 21.nov 2019.
</div>


## Deaktiverte elementer

Deaktiverte elementer får en stiplet grå bakgrunn ved bruk av klassen <code>.a-disabled</code>

<div class="a-disabled p-3">.a-disabled</div>

## Skygger

Skygger aktiveres ved bruk av variabelen <code>$shadow</code>

<code>box-shadow: 1px 1px 4px 0px rgba(137, 137, 137, 0.5);</code>

<div class="ap-shadowBox" style="text-align: center; line-height: 100px;">$shadow</div>


## Fargevariabler

Fargene refereres til ved bruk av variabler som er definert i <code> variables.scss </code>.

<ul class="no-decoration ap-colors">
<li><span class="ap-swatch" style="background: #022F51;"><span class="ap-colorLabel" style="color: #fff;">$blue-darker: <br>#022F51;</span></span></li>
<li><span class="ap-swatch" style="background: #0062ba;"><span class="ap-colorLabel" style="color: #fff;">$blue-dark: <br>#0062BA; </span></span></li>
<li><span class="ap-swatch" style="background: #1eaef7;"><span class="ap-colorLabel">$blue: <br>#1eaef7;</span></span></li>
<li><span class="ap-swatch" style="background: #cff0ff;"><span class="ap-colorLabel">$blue-light: <br>#cff0ff;</span></span></li>
</ul>

<ul class="no-decoration ap-colors">
<li><span class="ap-swatch" style="background: #17c96b;"><span class="ap-colorLabel">$green: <br>#17c96b;</span> </span></li>
<li><span class="ap-swatch" style="background: #d4f9e4;"><span class="ap-colorLabel">$green-light: <br>#d4f9e4;</span></span></li>
<li><span class="ap-swatch" style="background: #e23b53;"><span class="ap-colorLabel">$red: <br>#e23b53;</span></span></li>
<li><span class="ap-swatch" style="background: #f9cad3;"><span class="ap-colorLabel">$red-light: <br>#f9cad3;</span></span></li>
</ul>

<ul class="no-decoration ap-colors">
<li><span class="ap-swatch" style="background: #3f3161;"><span class="ap-colorLabel" style="color: #fff;">$purple: <br>#3f3161;</span></span></li>
<li><span class="ap-swatch" style="background: #e0daf7;"><span class="ap-colorLabel">$purple-light: <br>#e0daf7;</span></span></li>
<li><span class="ap-swatch" style="background: #ffda06;"><span class="ap-colorLabel">$yellow: <br>#ffda06;</span></span></li>
<li><span class="ap-swatch" style="background: #fbf6bd;"><span class="ap-colorLabel">$yellow-light: <br>#fbf6bd;</span></span></li>
</ul>

<ul class="no-decoration ap-colors" style="margin-bottom: 10px;">
<li><span class="ap-swatch" style="background: #000;"> <span class="ap-colorLabel" style="color: #fff;">$black: <br>#000;</span> </span></li>
<li><span class="ap-swatch" style="background: #6a6a6a;"><span class="ap-colorLabel" style="color: #fff;">$grey: <br>#6a6a6a; </span></span></li>
<li><span class="ap-swatch" style="background: #BCC7CC;"><span class="ap-colorLabel">$grey-medium: <br>#BCC7CC; </span> </span></li>
<li><span class="ap-swatch" style="background: #efefef;"><span class="ap-colorLabel">$grey-light: <br>#efefef; </span> </span></li>
</ul>
<br><br><br>

