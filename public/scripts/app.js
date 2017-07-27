$(document).ready(function () {

  // Materialize
  $('.button-collapse').sideNav();
  $('.scrollspy').scrollSpy();
  $('select').material_select();
  $('#client-select').on('change', function () {
      $('#client-id').val($('#client-select').val());
    });

  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 5,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false, // Close upon selecting a date,
  });
  $('.timepicker').pickatime({
    default: 'now',
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: true, // Use AM/PM or 24-hour format
    donetext: 'OK',
    cleartext: 'Clear',
    canceltext: 'Cancel',
    autoclose: false,
    ampmclickable: true,
  });

  $('.edit-button').on('click', function (e) {
    console.log('clicked');
    $show = $(e.target).prev('.visible');
    console.log($show);
    $show.hide();
    $(e.target).next().show();
  });

  // TODO - code to return to text $('submit').on('submit', function (e){e.target.show ... but in reverse})

}); // End doc.ready
