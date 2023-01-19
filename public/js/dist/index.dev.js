"use strict";

var modal = document.getElementById("modal");
var main = document.getElementById("main");

if (modal) {
  setTimeout(function () {
    modal.className = "d-none";
    main.className = 'd-block';
  }, 2000);
}