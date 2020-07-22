window.addEventListener('load', function () {
  var portfolioIsotope = new Isotope('.portfolio-container', {
    itemSelector: '.portfolio-item'
  });

  var portfolioList = document.getElementById('portfolio-flters').getElementsByTagName('li');
  // console.log(portfolioList);
  for (let i = 0; i < portfolioList.length; i++) {
    (function () {
      var thisOne = portfolioList[i];
      thisOne.addEventListener('click', function () {
        // Remove the class from everyone
        for (var j = 0; j < portfolioList.length; j++) {
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
