var bodyParser = require('body-parser');
var request = require('request');

createAE();

function createAE(){
	console.log("\n▶▶▶▶▶");
	var originator = "Cae-monitor-sync";
	var method = "POST";
	var uri= "http://127.0.0.1:8080/~/server/server";
	var resourceType=2;
	var requestId = "123456";
	var representation = {
		"m2m:ae":{
			"rn":"mymonitor-sync",			
			"api":"app.company.com",
			"rr":"false"
		}
	};

	console.log(method+" "+uri);
	console.log(representation);

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
		console.log("◀◀◀◀◀");
		if(error){
			console.log(error);
		}else{
			console.log(response.statusCode);
			console.log(body);
			
			setInterval(function() {
				retrieveContentInstance();
			}, 5000);
		}
	});
}


function retrieveContentInstance(){
	console.log("\n▶▶▶▶▶");
	var originator = "Cae-monitor-sync";
	var method = "GET";
	var uri= "http://127.0.0.1:8080/~/server/server/mysensor/luminosity/la";
	var requestId = "123456";

	console.log(method+" "+uri);

	var options = {
		uri: uri,
		method: method,
		headers: {
			"X-M2M-Origin": originator,
			"X-M2M-RI": requestId,
			"Content-Type": "application/json"
		}
	};

	request(options, function (error, response, body) {
		console.log("◀◀◀◀◀");
		if(error){
			console.log(error);
		}else{
			console.log(response.statusCode);
			console.log(body);
			var jsonBody = JSON.parse(body);
			var value = jsonBody["m2m:cin"].con;
			console.log("Receieved luminosity: "+value);

			if(value>5){
				console.log("High luminosity => Switch lamp OFF");
				createContentInstance(false);
			}else{
				console.log("Low luminosity => Switch lamp ON");
				createContentInstance(true);
			}
		}
	});
}

function createContentInstance(value){
	console.log("\n▶▶▶▶▶");
	var originator = "Cae-monitor-sync";
	var method = "POST";
	var uri= "http://127.0.0.1:8080/~/server/server/myactuator/switch";
	var resourceType=4;
	var requestId = "123456";
	var representation = {
		"m2m:cin":{
				"con": value
			}
		};

	console.log(method+" "+uri);
	console.log(representation);

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
		console.log("◀◀◀◀◀");
		if(error){
			console.log(error);
		}else{
			console.log(response.statusCode);
			console.log(body);
		}
	});
}
