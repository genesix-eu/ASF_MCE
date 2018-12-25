// ==UserScript==
// @name            Block Images and Videos
// @description     Block Images and Videos on Steam Store and Community
// @include         https://store.steampowered.com/*
// @include         https://steamcommunity.com/*
// @version         0.1
// @run-at          document-end
// @grant           none
// ==/UserScript==

// var images = document.querySelectorAll("img");
// images.forEach(function(image) {
//   image.src = "";
// });


$("img").removeAttr("src");
$(".category_video_ctn").html("");