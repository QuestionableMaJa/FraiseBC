// ==UserScript==
// @name FraiseBC
// @namespace https://www.bondageprojects.com/
// @version 1.0.7
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

setTimeout(
	function () {
			let m = document.createElement("script");
			m.setAttribute("language", "JavaScript");
			m.setAttribute("crossorigin", "anonymous");
			m.setAttribute("src", "https://majanames.github.io/FraiseBC/FraiseBC.js?_=" + Date.now());
			m.onload = () => m.remove();
			document.head.appendChild(m);
	}, 
        10000
);
