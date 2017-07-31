$(document).ready(function () {

  // Materialize jquery
  $('.modal').modal();
  $('.tooltipped').tooltip({ delay: 50 });
  $('.button-collapse').sideNav();
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
    e.preventDefault();
    var $container = $(this).parent('.appointment-block');
    $container.find('.visible').hide();
    $container.find('.not-visible').show();
  });

  $('.appointment-delete').on('click', function (e) {
      $.ajax({
        method: 'DELETE',
        url: '/appointments/' + $(this).attr('data-id'),
        success: deleteSuccess,
      });
    });

  $('#newLinkForm').on('submit', function (e) {
    e.preventDefault();
    console.log($(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/users/' + $('select.link-select').val() + '/links',
      data: $(this).serializeArray(),
      success: newLinkSuccess,
    });
  });

  function newLinkSuccess(json) {
    console.log('Success!');
    $('#newLinkForm input').val('');
  }

  function deleteSuccess() {
    location.reload(true);
  }

}); // End doc.ready
