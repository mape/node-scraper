var scraper = require('scraper');

scraper('https://twitter.com/search?q=javascript', function(err, $) {
	if (err) {throw err;}

	$('p.js-tweet-text.tweet-text').each(function() {
		console.log($(this).text().trim()+'\n');
	});
});