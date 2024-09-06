// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isValidDate = (date) => {
  return date.toUTCString() !== "Invalid Date";
};

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  let dateUTC = new Date(date).toUTCString(), timestamp;

  if(!isValidDate(new Date(date))) {
    dateUTC = new Date(+date).toUTCString();
  }

  if(isValidDate(dateUTC)) {
    timestamp = new Date(date).getTime();
  } else {
    res.json({
      error : "Invalid Date"
    });
    return;
  }

  res.json({
    unix: timestamp,
    utc: dateUTC
  });
});

app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
