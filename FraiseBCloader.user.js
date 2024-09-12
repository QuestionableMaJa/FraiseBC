// ==UserScript==
// @name FraiseBC
// @namespace https://www.bondageprojects.com/
// @version 1.0.3
// @description A very silly script made by MaJaNamesuu
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
  script.src = "https://majanames.github.io/FraiseBC/FraiseBC.js?ts=${Date.now()}";
  document.head.appendChild(script);
})();
