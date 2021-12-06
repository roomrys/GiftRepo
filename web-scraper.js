const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
let amazonUrl = 'https://www.amazon.com/RockBros-Lightweight-Mountain-Bicycle-Platform/dp/B07NV6TMF1/ref=sr_1_1_sspa?keywords=mtb%2Bpedals&qid=1638554707&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyWVNJWVZDUkRHTDVYJmVuY3J5cHRlZElkPUEwMTA3OTM3MTk5N1pOWlZPTFQ2VyZlbmNyeXB0ZWRBZElkPUEwMjQwMzM2MkNYT1I2VVM1RzVMWCZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU&th=1';

// // EXAMPLE WEBSCRAPER
// var itemD;
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
            let corePrice = $('span .a-offscreen','#corePrice_feature_div').text().trim();
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