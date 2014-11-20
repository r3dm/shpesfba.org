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

  $('.datepicker').pickadate({
    today: '',
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd'
  });

  $('#jobForm').bootstrapValidator({
    excluded: ':disabled',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // expirationDate: {
      //   validators: {
      //     date: {
      //       format: 'YYYY/MM/DD',
      //       message: 'The value is not a valid date'
      //     }
      //   }
      // }
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
