var http = require('http');
http.createServer(function (request, response) {
	var respondTime = Math.floor(Math.random()*1000);
	setTimeout(function() {
		var links = '';
		var linkCount = Math.floor(Math.random()*400)+100;
		for (var i=0; i < linkCount; i++) {
			links += '<a href="/">Test - '+i+'</a>';
		};
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('<html><head><title>Page has '+linkCount+' links</title></head><body><div id="time">'+respondTime+'</div>'+links+'</body></html>\n');
	}, respondTime);
}).listen(8486);

var urls = [];
for (var u=0; u < 2; u++) {
	for (var i=0; i < 1000; i++) {
		urls.push('http://localhost:8486');
	};
};

setTimeout(function() {
	var scraper = require('scraper');
	scraper(urls, function(err, $) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('Server took '+$('#time').text()+'ms to respond, found '+$('a').length+' <a> @ '+new Date().toString()+' with title "'+$('title').text()+'"');
	}, {
		'reqPerSec': 0.5
	});
}, 1000);