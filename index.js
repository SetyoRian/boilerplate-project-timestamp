// index.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  const params = req.params.date;
  if (isNaN(params)) {
    const checkDate = moment(params).isValid();
    if (checkDate === false) {
      res.status(400).json({ error: "Invalid Date" });
      throw new Error("Invalid Date");
    } else {
      let unixDate = Date.parse(params);
      let utcDate = new Date(params).toUTCString();
      res.json({ unix: unixDate, utc: utcDate });
    }
  } else {
    let unixToUtc = new Date(params * 1000).toUTCString();
    let unixNumber = Number(params);
    res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
  }
})

app.get('/api', (req, res) => {
  const unixDate = Date.now();
  let utcDate = new Date(unixDate).toUTCString();
  res.json({unix: unixDate, utc: utcDate});
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
