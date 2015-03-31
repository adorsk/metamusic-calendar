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
    // Group items by date.
    var itemsByDate = {};
    var items = data.items;
    for (var i=0; i < items.length; i++) {
      var item = items[i];
      var startDate = new Date(item.start.dateTime || item.start.date);
      var dateString = startDate.toDateString();
      if (! itemsByDate[dateString]) {
        itemsByDate[dateString] = [];
      }
      itemsByDate[dateString].push(item);
    }

    // Format output.
    var $outputEl = $('#output');
    var $datesListEl = $('<ol></ol>');
    for (var dateString in itemsByDate) {
      var $dateLiEl = $('<li>' + dateString  + '</li>');
      $datesListEl.append($dateLiEl);

      var $itemsListEl = $('<ol></ol>');

      var dateItems = itemsByDate[dateString];
      dateItems.forEach(function(item) {
        var $itemLiEl = $('<li></li>');

        // Format time if available.
        var time = '';
        if (item.start.dateTime) {
          var dateTime = new Date(item.start.dateTime);
          var time = pad(dateTime.getHours(),2) + ':' + pad(dateTime.getMinutes(),2);
        }

        var title = item.summary.toUpperCase();

        $itemLiEl.html(time + ' ' + title + '</br>' + item.description);

        $itemsListEl.append($itemLiEl);
      });

      $dateLiEl.append($itemsListEl);
    }

    $outputEl.append($datesListEl);

  });

  promise.error(function(xhr, status, e) {
    console.log('error', arguments);
  });
});

// Helper function for padding w/ zeros.
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
