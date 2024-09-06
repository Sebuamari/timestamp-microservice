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

const isValidDate = (str) => {
  const regex = /^\d{4}-\d{1,2}-\d{1,2}(T\d{1,2}:\d{1,2}:\d{1,2}(?:\.\d{1,3})?(?:Z|([+-]\d{1,2}:\d{2}))?)?$/;
  return regex.test(str);
};

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  let dateUTC = new Date();
  let timestamp = dateUTC.getTime();

  if(date) {
    if (date.includes("-")) {
      if(isValidDate(date)) {
        const [ year, month, day ] = date.split("-");
        dateUTC = new Date(`${year}-${month}-${day}`);
        timestamp = dateUTC.getTime();
      } else {
        res.json({
          error : "Invalid Date"
        });
      }
    } else {
      timestamp = parseInt(date);
      dateUTC = new Date(parseInt(date));
    }
  }

  res.json({
    unix: timestamp,
    utc: dateUTC.toUTCString()
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
