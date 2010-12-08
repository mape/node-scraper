var request = require('request');
var jsdom  = require('jsdom');
var requestDefaults = {
	'uri': null
	, 'headers': {
		'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
	}
};
var fetchDefaults = {
	'reqPerSec': 0
};
module.exports = function scrape(requestOptions, callback, fetchOptions) {
	if (!fetchOptions) {
		fetchOptions = {};
	}
	if (!callback) {
		callback = function(){};
	}
	Object.keys(fetchDefaults).forEach(function(key) {
		if (fetchOptions[key] === undefined) {
			fetchOptions[key] = fetchDefaults[key]
		}
	});

	var timeSpacing = !fetchOptions['reqPerSec'] ? 0 : 1000/fetchOptions['reqPerSec'];

	var fetches = [];
	if (!Array.isArray(requestOptions)) {
		fetches.push(requestOptions);
	} else {
		fetches = requestOptions;
	}
	fetches.forEach(function(requestOptions, index) {
		Object.keys(requestDefaults).forEach(function(key) {
			requestOptions[key] = requestOptions[key] || requestDefaults[key];
		});
		if (typeof requestOptions === 'string') {
			requestOptions = {
				'uri': requestOptions
			}
		}

		if (!requestOptions['uri']) {
			callback(new Error('You must supply an uri.'), null, null);
		}

		setTimeout(function() {
			request(requestOptions, function (err, response, body) {
				if (err) {
					callback(err, null, null);
				}
				if (response.statusCode == 200) {
					var window = jsdom.jsdom().createWindow();
					jsdom.jQueryify(window, '../../package/deps/jquery-1.4.2.min.js', function(win, $) {
						$('body').append($(body).find('body').html());
						callback(null, $, requestOptions['uri']);
					});
				} else {
					callback(new Error('Request to '+requestOptions['uri']+' ended with status code: '+response.statusCode), null, null);
				}
			});
		}, timeSpacing*index);
	});
};