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

  var $input = $('.datepicker').pickadate({
    today: ''
  });
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
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
    }
  });
 });
