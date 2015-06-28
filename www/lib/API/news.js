var $ = require('cheerio')
var request = require('request');

// Whitelist of sites from which to draw articles
var sites = [
  "site:ycombinator.com",
  "site:techcrunch.com",
  "site:wired.com",
  "site:gizmodo.com",
  "site:mashable.com",
  "site:theverge.com",
  "site:news.google.com",
]

/**
 * Convert an array of keywords into a search url for Google
 * @param  {[string]} keywords The search terms to look for
 * @return {string}          A fully interpolated search query
 */
function buildSearchURL(keywords) {
  terms_q = keywords.join(" ");
  sites_q = sites.join(" OR ");
  q = terms_q + " (" + sites_q + ")";
  base = "https://www.google.com/search?q=" + q + "&tbs=qdr:m"; // Get the last month (qdr:y for year)
  return encodeURI(base);
}

/**
 * Transforms a Google-prefixed URL to a canonical one
 * @param  {string} url /url?q=http://wikipedia.org/Puppy%2520Dogs
 * @return {string}     http://wikipedia.org/Puppy%20Dogs
 */
function cleanURL(url) {
  var base = "/url?q="
  var startPos = url.indexOf(base)
  if (startPos ==  -1) {
    if (url[0] == '/') return null; // Discard other google prefixes (/image?, etc)
    return url;
  }
  
  tail = url.substring(startPos + base.length);
  decoded = decodeURI(tail)
  
  // Delete the query parameters
  var paramsPos = decoded.indexOf("&");
  if (paramsPos == -1) return decoded
  return decoded.substring(0, paramsPos);
}

/**
 * Clean an article title scraped from Google's text
 * Example: 
 *   "Cute Puppies | TechcrunchCachedSimilar" ->
 *   "Cute Puppies | Techcrunch"
 * 
 * @param  {string} title An article title, which might have trailing cruft
 *                        starting with 'Cached'
 * @return {string}       A cleansed article title
 */
function cleanTitle(title) {
  var pos = title.indexOf("Cached");
  if (pos == -1) return title;
  return title.substring(0, pos);
}

/**
 * Extracts a list of articles given an HTML page representing Google query results 
 * @param  {string} html The HTML body of a search result page
 * @return {[article]}      The extracted articles
 *         where an article is as follows:
 *         {
 *           url: "http://some.url.here/path/to/site/"
 *           title: "Investors Rethink EdTech As Dealflow Declines | TechCrunch"
 *         }
 */
function processHTML(html) {
  var parsedHTML = $.load(html)
  var articles = []
  parsedHTML('li.g').map(function(num, result) {
    link = $('a:first-child', result);
    url = cleanURL(link.attr('href'));
    title = cleanTitle(link.text());
    if (url !== null) {
      articles.push({
        url: url,
        title: title
      });
    }
  });
  return articles;
}

/**
 * Gets a set of articles given a list of keywords.
 * If successful, we fire callback(articles).
 * Otherwise, we fire callback([])
 * @param  {[string]}   keywords A list of keywords to query
 * @param  {Function} callback Called with the discovered articles
 * @return null
 */
function getArticles(keywords, callback) {
  url = buildSearchURL(keywords);
  
  request(url, function(err, resp, html) {
    if (!err && resp.statusCode == 200) {
      articles = processHTML(html);
      callback(articles);
    } else {
      callback([]);
    }
  });
}

/* Example usage of getArticles */
function main() {
  getArticles(["javascript", "innovate"], console.log);
}

main()