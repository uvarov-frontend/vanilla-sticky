"use strict";

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
  var contentSticky = new VanillaSticky({
    HTMLElement: document.querySelector('.main-content'),
    indents: {
      top: 70,
      bottom: 10
    }
  });
  contentSticky.init();
  var mainSidebarSticky = new VanillaSticky({
    HTMLElement: document.querySelector('.main-sidebar'),
    indents: {
      top: 70,
      bottom: 10
    }
  });
  mainSidebarSticky.init();
  var additionalSidebarSticky = new VanillaSticky({
    HTMLElement: document.querySelector('.additional-sidebar'),
    indents: {
      top: 70,
      bottom: 10
    }
  });
  additionalSidebarSticky.init(); // Temp
  // hljs.highlightAll();
});