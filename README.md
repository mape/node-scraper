# node-scraper

A little module that makes scraping websites a little easier. Uses node.js and jQuery.

## Installation

Via [npm](http://github.com/isaacs/npm):

    $ npm install scraper

## Usage

### Simple
First argument is an url as a string, second is a callback which exposes a jQuery object with your scraped site as "body".

    var scraper = require('scraper');
    scraper('http://search.twitter.com/search?q=javascript', function(err, jQuery) {
        if (err) {throw err}
        
        jQuery('.msg').each(function() {
            console.log(jQuery(this).text().trim()+'\n');
        });
    });
### Advanced
First argument is an object containing settings for the "request" instance used internally, second is a callback which exposes a jQuery object with your scraped site as "body".

    var scraper = require('scraper');
    scraper({
        'uri': 'http://search.twitter.com/search?q=nodejs'
        , 'headers': {
            'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
        }}
        , function(err, $) {
        if (err) {throw err}
        
        $('.msg').each(function() {
            console.log($(this).text().trim()+'\n');
        });
    });
