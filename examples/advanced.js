var scraper = require('scraper');

scraper({
	'uri': 'https://twitter.com/search?q=nodejs'
	, 'headers': {
		'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
	}}
	, function(err, $) {
	if (err) {throw err;}

	$('p.js-tweet-text.tweet-text').each(function() {
		console.log($(this).text().trim()+'\n');
	});
});