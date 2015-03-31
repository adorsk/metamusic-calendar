var ENDPOINT = 'https://www.googleapis.com/calendar/v3/calendars/';
var CALENDAR_ID = '112tet0ano4odoh096eiqdbh40@group.calendar.google.com';
var API_KEY = 'AIzaSyD8C670y5MdncenGsjFrIqBppLErQd3Gbk';

$(document).ready(function() {
  // Get calendar data.
  var promise = $.ajax({
    url: ENDPOINT + CALENDAR_ID + '/events',
    data: {
      key: API_KEY,
      //timeMin: null,
      //timeMax: null,
    },
    dataType: 'jsonp'
  })

  promise.then(function(data) {
    console.log('data is: ', data);
  });

  promise.error(function(xhr, status, e) {
    console.log('error', arguments);
  });
});

