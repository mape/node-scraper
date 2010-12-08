var scraper = require('scraper');

scraper('http://search.twitter.com/search?q=javascript', function(err, $, urlInfo) {
	if (err) {throw err;}

	console.log('Messages from: '+urlInfo.href);
	$('.msg').each(function() {
		console.log($(this).text().trim()+'\n');
	});
});