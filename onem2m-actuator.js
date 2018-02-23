var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var sleep = require('sleep');
var app = express();

app.use(bodyParser.json());

app.listen(4000, function () {
	console.log('AE Actuator listening on port 4000!');
});

app.post('/', function (req, res) {
	console.log(req.body["m2m:sgn"].nev.rep);
	res.sendStatus(200);
});

var aeJson = {
	"m2m:ae":{
		"rn":"myactuator",			
		"api":"app.company.com",
		"rr":"true",
		"poa":["http://127.0.0.1:4000/"]
	}
};

setTimeout(function() {
	send("POST","http://127.0.0.1:8080/~/server/server","Cae-actuator","123456","2",aeJson);
}, 1000)

var cntJson = {
	"m2m:cnt":{
		"rn":"switch",
		"mni":100		

	}
};

setTimeout(function() {
  send("POST","http://127.0.0.1:8080/~/server/server/myactuator","Cae-actuator","123456","3",cntJson);
}, 2000)


var cinJson = {
	"m2m:cin":{
		"con": false
	}
};

setTimeout(function() {
  send("POST","http://127.0.0.1:8080/~/server/server/myactuator/switch","Cae-actuator","123456","4",cinJson);
}, 3000)

var subJson = {
	"m2m:sub": {
		"rn": "subTest",
		"nu": ["/server/Cae-actuator"],
		"nct": 2,
		"enc": {
			"net": 3
		}
	}
};

setTimeout(function() {
  send("POST","http://127.0.0.1:8080/~/server/server/myactuator/switch","Cae-actuator","123456","23",subJson);
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


