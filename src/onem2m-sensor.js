var express = require('express');
var request = require('request');

createAE();
function createAE(){
	console.log("\n▶▶▶▶▶");
	var originator = "Cae-sensor";
	var method = "POST";
	var uri= "http://127.0.0.1:8080/~/server/server";
	var resourceType=2;
	var requestId = "123456";
	var representation = {
		"m2m:ae":{
			"rn":"mysensor",			
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
			createContainer();
		}
	});
}


function createContainer(){
	console.log("\n▶▶▶▶▶");
	var originator = "Cae-sensor";
	var method = "POST";
	var uri= "http://127.0.0.1:8080/~/server/server/mysensor";
	var resourceType=3;
	var requestId = "123456";
	var representation = {
		"m2m:cnt":{
			"rn":"luminosity",
			"mni":100		

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
				createContentInstance();
			}, 5000);
		}
	});
}

function createContentInstance(){
	console.log("\n▶▶▶▶▶");
	var originator = "Cae-sensor";
	var method = "POST";
	var uri= "http://127.0.0.1:8080/~/server/server/mysensor/luminosity";
	var resourceType=4;
	var requestId = "123456";
	var representation = {
		"m2m:cin":{
			"con": Math.floor(Math.random()*10)
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
