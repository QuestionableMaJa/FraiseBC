// ==UserScript==
// @name FraiseBC
// @namespace https://www.bondageprojects.com/
// @version 1.0.0
// @description A various silly scripts that Fraise makes
// @author MaJaNamesuu
// @match http://localhost:*/*
// @match https://bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match https://bondageprojects.com/*
// @match https://www.bondageprojects.com/*
// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";
  var script = document.createElement("script");
  script.setAttribute("crossorigin", "anonymous");
  script.src = "https://majanames.github.io/FraiseBC/FraiseBC.js";
  document.head.appendChild(script);
})();
