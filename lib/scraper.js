var request = require('request');
var jsdom  = require('jsdom');

var defaults = {
	'uri': null
	, 'headers': {
		'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
	}
};
module.exports = function scrape(requestOptions, callback) {
	var settings = {};
	Object.keys(defaults).forEach(function(key) {
		settings[key] = requestOptions[key] || defaults[key];
	});

	if (typeof requestOptions === 'string') {
		settings['uri'] = requestOptions;
	}

	if (!settings['uri']) {
		callback(new Error('You must supply an uri.'), null, null);
	}

	request(settings, function (err, response, body) {
		if (err) {
			callback(err, null, null);
		}
		if (response.statusCode == 200) {
			var window = jsdom.jsdom().createWindow();
			jsdom.jQueryify(window, '../deps/jquery-1.4.2.min.js' , function() {
				window.$('body').append(body);
				callback(null, window.$);
			});
		} else {
			callback(new Error('Request to '+settings['uri']+' ended with status code: '+response.statusCode), null, null);
		}
	});
};