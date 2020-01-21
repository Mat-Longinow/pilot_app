const puppeteer = require('puppeteer');
const twil = require('./send_message.js');

exports.scrapeInit = () => {
    (async () => {
        try {
            console.log('You have entered scrape.js');
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto('http://sce.com');

            await page.waitFor(1000);

            await page.type('#userName', process.env.USERNAME);
            await page.type('#password', process.env.PASS);
            await page.click('#homePageLogin');

            await page.waitFor(5000);

            let foundData = await page.evaluate(() => {
                let data = document.querySelectorAll('p');

                let found = [];

                data.forEach(element => {
                    if (element.innerText.includes('$')) {
                        found.push(element.innerText);
                    }
                });

                return found;
            });

            await browser.close();

            if(foundData[0] === undefined || foundData[1] === undefined) {
                console.log('made it to error!');
                twil.errorMessage();
            }else{
                console.log('made it to send text');
                twil.sendMessage(foundData[0], foundData[1]);
            }

        } catch (err) {
            console.log(Error(err));
        }

    })();
};