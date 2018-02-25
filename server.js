var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request = require('request');


// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 38080;        // set our port

app.use('/webhook', function(req, res) {
  
//  console.log(req, res);

  var gBody = req.body;

//  console.log(gBody);


  var json = {
    body: '[[' + gBody.project.name + ']](' + gBody.project.web_url + ') ' + gBody.user_name + '님이 Push 했습니다.',
//    connectColor: '#FAC11B',
//    connectInfo: [
//      {
//        title: '',
//        description: ''
//      }
//    ]
  };


  var options = {
    method: 'POST',
    url: 'https://wh.jandi.com/connect-api/webhook/18119/943b8debc4b7db04ee67d7b51297fcf7',
    headers: { 
      'Accept': 'application/vnd.tosslab.jandi-v2+json',
      'Content-Type': 'application/json'
    },
    json: json
  };


  request(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
      //var info = JSON.parse(body);
      //console.log(info.stargazers_count + " Stars");
      //console.log(info.forks_count + " Forks");
    }
  });



  
  res.status(200).end();


});

app.listen(port);
console.log('Magic happens on port ' + port);

