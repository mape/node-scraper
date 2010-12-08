var scraper = require('scraper');

scraper({
	'uri': 'http://search.twitter.com/search?q=nodejs'
	, 'headers': {
		'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
	}}
	, function(err, $, urlInfo) {
	if (err) {throw err;}

	console.log('Messages from: '+urlInfo.href);
	$('.msg').each(function() {
		console.log($(this).text().trim()+'\n');
	});
});