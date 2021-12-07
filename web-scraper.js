const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// // EXAMPLE WEBSCRAPER
// var itemD;
// let amazonUrl = 'https://www.amazon.com/POC-Joint-Uranium-Black-Large/dp/B00QKC4GJI/ref=sr_1_6?keywords=mtb+pads&qid=1638554582&sr=8-6';
// amazonScraper(amazonUrl, function(scraperRes) {itemD = scraperRes});
// setInterval(function() {console.log(itemD)}, 1000);

function amazonScraper(url, cb=console.log) {
    iDict = puppeteer
        .launch()
        .then(function(browser) {
            return browser.newPage();
        })
        .then(function(page) {
            return page.goto(url).then(function() {
                return page.content();
            });
        })
        .then(function(html) {
            let $ = cheerio .load(html);
            let landingImage = $('#landingImage')['0'].attribs.src;
            // console.log(landingImage);
            let productTitle = $('#productTitle').text().trim();
            // console.log(productTitle);
            let corePrice = $('span .a-offscreen', '#corePrice_desktop').text().trim().split('$');
            corePrice = '$' + Math.max(...corePrice);
            // console.log(corePrice);
            return itemDict = {title: productTitle, price: corePrice, link: url, img: landingImage};
        }).then(function(itemDict) {cb(itemDict)})
        .catch(function(err) {
            //handle error
            console.log(err)
        });
}

// export function
module.exports.amazonScraper = amazonScraper;