var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var sleep = require('sleep');
var app = express();

app.use(bodyParser.json());
app.listen(3000, function () {
	console.log('AE Monitor listening on port 3000!');
});

var cinJson = {
	"m2m:cin":{
		"con": true
	}
};

app.post('/', function (req, res) {
	console.log(req.body["m2m:sgn"].nev.rep);
	res.sendStatus(200);
	send("POST","http://127.0.0.1:8080/~/server/server/myactuator/switch","Cae-actuator","123456","4",cinJson);
	console.log("\n");
});

var aeJson = {
	"m2m:ae":{
		"rn":"mymonitor",			
		"api":"app.company.com",
		"rr":"true",
		"poa":["http://127.0.0.1:3000/"]
	}
};

setTimeout(function() {
	send("POST","http://127.0.0.1:8080/~/server/server","Cae-monitor","123456","2",aeJson);
}, 1000)

var subJson = {
	"m2m:sub": {
		"rn": "subTest",
		"nu": ["/server/Cae-monitor"],
		"nct": 2,
		"enc": {
			"net": 3
		}
	}
};

setTimeout(function() {
  send("POST","http://127.0.0.1:8080/~/server/server/mysensor/light","Cae-monitor","123456","23",subJson);
}, 2000)


function send(method, uri, originator,requestId, resourceType, representation){
	console.log("\n"+method+" "+uri);
	var options = {
		uri: uri,
		method: method,
		headers: {
			"X-M2M-Origin": originator,
			"X-M2M-RI": requestId,
			"Content-Type": "application/json;ty="+resourceType
		},
		json: representation
	};

	request(options, function (error, response, body) {
		
		if(error){
			console.log(error);
		}else{
			console.log(response.statusCode);
			console.log(body);
		}
	});
}


