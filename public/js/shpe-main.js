/* global $, document, window */
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

  $('.carousel-copy').slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 10000,
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

  var $input = $('.datepicker').pickadate({ today: '' });

  var picker = $input.pickadate('picker');
  // wrap picker in case we're on any page other than the job form
  if (picker) {
    picker.on('render', function() {
      $('#jobForm').bootstrapValidator('revalidateField', 'expirationDate');
    });
  }

  $('#jobForm').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  });

  $('#contactForm').bootstrapValidator({
    fields: {},
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  });

  // parallax
  $('div[data-type="background"]').each(function() {
    var $bg = $(this);
    var $window = $(window);

    $window.scroll(function() {
      var scrollPosition = $window.scrollTop();
      var yPosition = (scrollPosition / $bg.data('speed'));
      var zPosition = -(scrollPosition / $bg.data('speed') + 5);

      //$bg.css({ backgroundPosition: '50% ' + yPossition + 'px' });
      $bg.css({
        transform: [
          'translate3d(0, ',
          yPosition + 'px, ',
          zPosition + 'px)'
        ].join('')
      });
    });
  });
});
