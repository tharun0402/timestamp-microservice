// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static('public'));

// home page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// First API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice API
app.get("/api/:date?", function (req, res) {
  var dateInput = req.params.date;
  var date;

  // No date → current time
  if (!dateInput) {
    date = new Date();
  }
  // Unix timestamp → milliseconds
  else if (/^\d+$/.test(dateInput)) {
    date = new Date(Number(dateInput));
  }
  // Normal date string
  else {
    date = new Date(dateInput);
  }

  // Invalid date
  if (isNaN(date.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  // Valid date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});