var scraper = require('scraper');

scraper([
		'https://twitter.com/search?q=javascript'
		, 'https://twitter.com/search?q=css'
		, {
			'uri': 'https://twitter.com/search?q=nodejs'
			, 'headers': {
				'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
			}
		}
		, 'https://twitter.com/search?q=html5'
	]
	, function(err, $) {
	if (err) {throw err;}

	$('p.js-tweet-text.tweet-text').each(function() {
		console.log($(this).text().trim()+'\n');
	});
}, {
	'reqPerSec': 0.2 // Wait 5sec between each external request
});