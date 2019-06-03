var bodyParser = require('body-parser');
var request = require('request');

var originator = "Cae-admin";
var key = "xxxxxxx";
var base= "http://127.0.0.1:8080/~";
var cseId = "server";
var cseName = "server";
	
discover();

function discover(){
	console.log("\n>>>>>");
	console.log("GET "+base+"/"+cseId+"/"+cseName+"?fu=1&ty=23");

	var options = {
		uri: base+"/server/server?fu=1&ty=23",
		method: "GET",
		headers: {
			"X-M2M-Origin": originator,
			"X-M2M-Key": key,
			"Content-Type": "application/json"
		}
	};

	request(options, function (error, response, body) {
		console.log("<<<<<");
		if(error){
			console.log(error);
		}else{
			console.log(response.statusCode);
			console.log(body);
			var jsonBody = JSON.parse(body);
			var uril = jsonBody["m2m:uril"];

			for (i = 0; i < uril.length; i++) { 
				console.log(">>>>>");
				console.log("DELETE "+base+uril[i]);

				var options = {
					uri: base+uril[i],
					method: "DELETE",
					headers: {
						"X-M2M-Origin": originator,
						"X-M2M-Key": key,
						"Content-Type": "application/json"
					}
				};
				
				request(options, function (error, response, body) {
					console.log("<<<<<");
					if(error){
						console.log(error);
					}else{
						console.log(response.statusCode);
						console.log(body);
					}
				});
			}
		}
	});
}
