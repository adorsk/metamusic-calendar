var ENDPOINT = 'https://www.googleapis.com/calendar/v3/calendars/';
var CALENDAR_ID = '112tet0ano4odoh096eiqdbh40@group.calendar.google.com';
var API_KEY = 'AIzaSyD8C670y5MdncenGsjFrIqBppLErQd3Gbk';

$(document).ready(function() {
  // Get calendar data.
  var promise = $.ajax({
    //url: ENDPOINT + CALENDAR_ID + '/events',
    url: 'data.json',
    data: {
      key: API_KEY,
      //timeMin: null,
      //timeMax: null,
    },
    //dataType: 'jsonp'
    dataType: 'json'
  })

  promise.then(function(data) {
    var items = data.items;

    // Decorate items with date time objects for start times
    for (var i=0; i < items.length; i++) {
      var item = items[i];
      item.startDateObj = new Date(item.start.dateTime || item.start.date);
    }

    items.sort(function(a, b) {
      return a.startDateObj - b.startDateObj;
    });

    // Output items.
    var lastDateString = null;
    var $outputEl = $('#output');
    var $datesListEl = $('<ol style="list-style-type: none;"></ol>');
    var $dateLiEl = null;
    var $itemsListEl = null;

    items.forEach(function(item) {
      // Start new date group for each new date.
      var dateString = item.startDateObj.toDateString(); 
      if (dateString != lastDateString) {
        if ($dateLiEl) {
          $dateLiEl.append($itemsListEl);
          $datesListEl.append($dateLiEl);
        }
        var dateTitle = '=== ' + dateString.toUpperCase() + ' ===';
        $dateLiEl = $('<li style="margin-top: 1em;">' + dateTitle + '</li>');
        $itemsListEl = $('<ul style="list-style-type: disc; padding-top: 1em;"></ul>');
      }

      var $itemLiEl = $('<li></li>');

      // Format time if available.
      var itemTime = '';
      if (item.start.dateTime) {
        var dateTime = new Date(item.start.dateTime);
        var itemTime = pad(dateTime.getHours(),2) + ':' + pad(dateTime.getMinutes(),2);
      }

      var itemTitle = item.summary.toUpperCase();
      var itemDescription = Autolinker.link(item.description, {newWindow: true});

      var line1 = itemTime + ' ' + itemTitle;
      var line2 = itemDescription;

      $itemLiEl.html(line1 + '</br>' + line2 + '</br></br>');
      $itemsListEl.append($itemLiEl);

      lastDateString = dateString;
    });

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
