var scraper = require('scraper');

scraper([
		'http://search.twitter.com/search?q=javascript'
		, 'http://search.twitter.com/search?q=css'
		, {
			'uri': 'http://search.twitter.com/search?q=nodejs'
			, 'headers': {
				'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
			}
		}
		, 'http://search.twitter.com/search?q=html5'
	]
	, function(err, $) {
	if (err) {throw err;}

	$('.msg').each(function() {
		console.log($(this).text().trim()+'\n');
	});
}, {
	'reqPerSec': 0.2 // Wait 5sec between each external request
});