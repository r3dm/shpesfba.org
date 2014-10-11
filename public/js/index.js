/*
 * built by r3dm.com
 * Berkeley Martinez, robotie.com
 * Lenore Messler, lenoremessler.com
 * Harry Moreno, harrymoreno.com
 */
$(document).ready(function() {

  $('.carousel-upcoming').slick({
    slidesToShow: 3,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true
        }
      }
    ]
  });

  // $('.menu_hamburger-container').menu({
  // });

});
