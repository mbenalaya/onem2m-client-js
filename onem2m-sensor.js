var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();


var aeJson = {
	"m2m:ae":{
		"rn":"mysensor",			
		"api":"app.company.com",
		"rr":"true",
		"poa":["http://127.0.0.1:3000/"]
	}
};

setTimeout(function() {
	send("POST","http://127.0.0.1:8080/~/server/server","Cae-sensor","123456","2",aeJson);
}, 1000)

var cntJson = {
	"m2m:cnt":{
		"rn":"light",
		"mni":100		

	}
};

setTimeout(function() {
  send("POST","http://127.0.0.1:8080/~/server/server/mysensor","Cae-sensor","123456","3",cntJson);
}, 2000)


var cinJson = {
	"m2m:cin":{
		"con": Math.floor( Math.random() * 10)
	}
};

setInterval(function() {
  send("POST","http://127.0.0.1:8080/~/server/server/mysensor/light","Cae-sensor","123456","4",cinJson);
}, 3000)

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


