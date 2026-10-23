(function () {
  'use strict';
  var tabs = document.querySelectorAll('[role="tab"]');
  function selectDay(tab, focus) {
    for (var i = 0; i < tabs.length; i++) {
      var selected = tabs[i] === tab;
      tabs[i].setAttribute('aria-selected', String(selected));
      tabs[i].tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(tabs[i].getAttribute('aria-controls'));
      if (selected) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    }
    if (focus) tab.focus();
  }
  function bindTab(tab, index) {
    tab.addEventListener('click', function () { selectDay(tab, false); });
    tab.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight' || event.key === 'Right' || event.key === 'ArrowLeft' || event.key === 'Left') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (next) { event.preventDefault(); selectDay(next, true); }
    });
  }
  for (var i = 0; i < tabs.length; i++) bindTab(tabs[i], i);

  var links = document.querySelectorAll('nav a');
  function setActive(id) {
    for (var j = 0; j < links.length; j++) {
      var active = links[j].hash === '#' + id;
      if (active) {
        links[j].classList.add('active');
        links[j].setAttribute('aria-current', 'location');
      } else {
        links[j].classList.remove('active');
        links[j].removeAttribute('aria-current');
      }
    }
  }
  function bindLink(link) {
    link.addEventListener('click', function () { setActive(link.hash.slice(1)); });
  }
  for (var j = 0; j < links.length; j++) bindLink(links[j]);
  if (window.location.hash) setActive(window.location.hash.slice(1));
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].isIntersecting) setActive(entries[k].target.id);
      }
    }, { rootMargin: '-15% 0px -65% 0px' });
    for (var k = 0; k < links.length; k++) {
      var section = document.querySelector(links[k].getAttribute('href'));
      if (section) observer.observe(section);
    }
  }
}());
