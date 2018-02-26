var express = require('express');        // call express

var app = express();                 // define our app using express

var bodyParser = require('body-parser');
var request = require('request');

const jandiWebhook = 'https://wh.jandi.com/connect-api/webhook/18119/02f6f0884f014e2a4356f348e065cacc';

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 38080;        // set our port

app.use('/webhook', function (req, res) {

//  console.log(req, res);

    var gBody = req.body;

    // console.log(gBody);

    var data = {};

    var message = '[' + gBody.project.name + '] ' + gBody.user_name + '님이 Push 했습니다.';

    data.body = message;

    var commits = gBody.commits;

    if(commits){
        data.connectColor = '#FAC11B';
        var connectInfos = [];
        for(var i = 0; i < commits.length; i++){
            var commit = commits[i];
            var connectInfo = {};
            connectInfo.title = '[' + commit.id + '](' + commit.url + ')';
            connectInfo.description = commit.message;
            connectInfos.push(connectInfo);
        }
        data.connectInfo = connectInfos;
    }

    var options = {
        method: 'POST',
        url: jandiWebhook,
        headers: {
            'Accept': 'application/vnd.tosslab.jandi-v2+json',
            'Content-Type': 'application/json'
        },
        json: data
    };


    request(options, function (error, response, body) {
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

