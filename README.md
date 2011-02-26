# node-scraper

A little module that makes scraping websites a little easier. Uses node.js and jQuery.

## Installation

Via [npm](http://github.com/isaacs/npm):

    $ npm install scraper

## Examples

### Simple
First argument is an url as a string, second is a callback which exposes a jQuery object with your scraped site as "body" and third is an object from the request containing info about the url.

    var scraper = require('scraper');
    scraper('http://search.twitter.com/search?q=javascript', function(err, jQuery) {
        if (err) {throw err}

        jQuery('.msg').each(function() {
            console.log(jQuery(this).text().trim()+'\n');
        });
    });
### "Advanced"
First argument is an object containing settings for the "request" instance used internally, second is a callback which exposes a jQuery object with your scraped site as "body" and third is an object from the request containing info about the url.

    var scraper = require('scraper');
    scraper(
	    {
           'uri': 'http://search.twitter.com/search?q=nodejs'
               , 'headers': {
                   'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
               }
        }
        , function(err, $) {
            if (err) {throw err}

            $('.msg').each(function() {
                console.log($(this).text().trim()+'\n');
            });
        }
    );
### Parallel
First argument is an array containing either strings or objects, second is a callback which exposes a jQuery object with your scraped site as "body" and third is an object from the request containing info about the url.

**You can also add rate limiting to the fetcher by adding an options object as the third argument containing 'reqPerSec': float.**

    var scraper = require('scraper');
    scraper(
	    [
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
        }
        , {
            'reqPerSec': 0.2 // Wait 5sec between each external request
        }
    );



## Arguments

### First (required)
Contains the info about what page/pages will be scraped

#### string
    'http://www.nodejs.org'
**or**

#### request object
    {
       'uri': 'http://search.twitter.com/search?q=nodejs'
           , 'headers': {
               'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
           }
    }
**or**

#### Array (if you want to do fetches on multiple URLs)
    [
        urlString
        , urlString
        , requestObject
        , urlString
    ]

### Second (optional)
The callback that allows you do use the data retrieved from the fetch.

    function(err, $) {
        if (err) {throw err;}
        
        $('.msg').each(function() {
            console.log($(this).text().trim()+'\n');
        }
    }

### Third (optional)
This argument is an object containing settings for the fetcher overall.

* **reqPerSec**: float; (allows you to throttle your fetches so you don't hammer the server you are scraping)

## Depends on
* [tmpvar](https://github.com/tmpvar/)'s [jsdom](https://github.com/tmpvar/jsdom)
* [mikeal](https://github.com/mikeal/)'s [request](https://github.com/mikeal/node-utils/tree/master/request)
* [jquery](https://github.com/jquery/jquery)