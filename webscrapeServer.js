// server.js
// where your node app starts

// init project
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path'); 
var app = express();


app.use('/', express.static(path.join(__dirname, 'dist')))

//cors////////////////////////////////////////////////////
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.get('/scrape', function (req, res) {
	let url = req.query.url; //grab parameter
    let tag = req.query.tag; //grab second parameter
	request(url, function(error, response, html) {
        if (!error){
            $ = cheerio.load(html);
            res.send($(tag).text(''));
        } else {
            res.send("Something when wrong");
        }
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
