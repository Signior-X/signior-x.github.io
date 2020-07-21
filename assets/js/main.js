'use strict';

// Init AOS Animate on Scroll
function aos_init() {
  AOS.init({
    duration: 1000,
    once: true
  });
}

// For inital typing animation using Typed.js
var typed_strings = ["Designer", "Developer", "Freelancer", "Philosopher"];
new Typed('.typed', {
  strings: typed_strings,
  loop: true,
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1000
});

/* ----- For Mobile Toggler ----- */
function togglerMobile(){
  document.getElementsByTagName('body')[0].classList.toggle('mobile-nav-active');
  var icon = document.getElementsByClassName('mobile-nav-toggle')[0].getElementsByTagName('i')[0];
  icon.classList.toggle('icofont-navigation-menu');
  icon.classList.toggle('icofont-close');
}

document.getElementsByClassName('mobile-nav-toggle')[0].onclick = function (){
  togglerMobile();
}

// https://gomakethings.com/detecting-clicks-inside-an-element-with-vanilla-javascript/#:~:text=The%20simplest%20way%20is%20to,target.
document.addEventListener('click', function(e) {
  // var container = document.getElementsByClassName('mobile-nav-toggle');
  // if (event.target.closest('.modal')) return;
  // This is to check that it is not close to mobile nav toggle but also it exists
  if (!e.target.closest('.mobile-nav-toggle')  ) {
    if(document.getElementsByTagName('body')[0].classList.contains('mobile-nav-active')) {
      // console.log("Check for a moment");
      togglerMobile();
    }
  }
});


/* ----- Skills section on paasing animation ----- */

// Way Point currently used for skills increasing animation
// var waypoint = new Waypoint({
//   element: document.getElementById('skills'),
//   handler: function() {
//     // notify('Basic waypoint triggered')
//     console.log("WayPoints reached!");
//     var progressBars = document.getElementsByClassName('progress-bar');
//     for(var i=0; i<progressBars.length; i++){
//       progressBars[i].style.width = progressBars[i].getAttribute('aria-valuenow') + "%";
//     }
//   },
//   offset: '40%'
// });


// Help from https://stackoverflow.com/questions/21561480/trigger-event-when-user-scroll-to-specific-element-with-jquery
// This works once the skills id section is crossed!
// Needs to be changed a bit also
window.addEventListener('scroll', function() {
  var skillsSec = document.getElementById('skills');
  if(!skillsSec.classList.contains('increased')){
    var hT = skillsSec.offsetTop;
    var hH = skillsSec.offsetHeight;
    var wH = window.outerHeight;
    var wS = window.scrollY;
    if (wS > (hT+hH-wH)){
      // console.log('Skills has been reached!');
      skillsSec.classList.add('increased');
      var progressBars = document.getElementsByClassName('progress-bar');
      for(var i=0; i<progressBars.length; i++){
        progressBars[i].style.width = progressBars[i].getAttribute('aria-valuenow') + "%";
      }
    }
  }
});


window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  document.getElementById('preloader').style.display = "none";
  aos_init();
});

var nav_sections = document.getElementsByTagName('section');
var main_nav = document.getElementsByClassName('nav-menu')[0];
// console.log("Nav_sec", nav_sections)
// console.log("mani", main_nav)

window.addEventListener('scroll', function() {
  var cur_pos = window.scrollY + 300;

  for (var i=0; i<nav_sections.length; i++){
    var thisOne = nav_sections[i];
    
    var top = thisOne.offsetTop, bottom = top + window.outerHeight;

    if (cur_pos >= top && cur_pos <= bottom) {
      if (cur_pos <= bottom) {
        main_nav.querySelectorAll('li').forEach(function(el,i) {
          el.classList.remove('active');
        });
      }
      try{
        main_nav.querySelector('a[href="#' + thisOne.getAttribute('id') + '"]').parentNode.classList.add('active');
      } catch(error){
        // just element does not exist so no problem
      }
    }
    if (cur_pos < 200) {
      main_nav.querySelector('li').classList.add('active');
    }
  }
});


window.addEventListener('load', function() {
  var portfolioIsotope = new Isotope( '.portfolio-container', {
    itemSelector: '.portfolio-item'
  });

  var portfolioList = document.getElementById('portfolio-flters').getElementsByTagName('li');
  // console.log(portfolioList);
  for (let i=0; i< portfolioList.length; i++) {
    (function () {
      var thisOne = portfolioList[i];
      thisOne.addEventListener('click', function(){
        // Remove the class from everyone
        for(var j=0; j<portfolioList.length; j++){
          portfolioList[j].classList.remove('filter-active');
        }
        thisOne.classList.add('filter-active');
  
        portfolioIsotope.arrange({
          filter: thisOne.getAttribute('data-filter')
        });
        aos_init();
      });
    }()); //Immediate invocation
  }

});
