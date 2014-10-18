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

  // only public events can be queried this way
  var events = [
    568281156631609,
    270385519824039,
    293243587536772,
    273793429483861,
    1529142387306200,
    713616645384315,
    1530629657165894
  ];

  events.forEach(function(element, index, array) {
    $.get(
      "https://graph.facebook.com/v2.1/" + element +
      "?access_token=1540860829462325|w119GKY-gtms6pHnBUIMhAUDun4",
      {},
      function(data) {
        console.log(data);
        a = data;
      }
    );
  });
  //
  // FB.login(function(){}, {scope: 'user_groups'});
  //
  // $('.menu_hamburger-container').menu({
  // });

});
