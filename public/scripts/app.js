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

}); // End doc.ready
