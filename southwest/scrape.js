const puppeteer = require('puppeteer');
const twil = require('./send_message.js');
const root = require('./../app.js');

exports.scrapeInit = () => {
    (async () => {
        try {
            console.log(root.newTime(), 'You have entered scrape.js');
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();

            await page.goto('http://sce.com');

            await page.waitFor(1000);

            await page.type('#userName', process.env.USERNAME);
            await page.type('#password', process.env.PASS);
            await page.click('#homePageLogin');

            await page.waitFor(10000);

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
                console.log(root.newTime(), 'Uh oh, error finding the SCE data. Text incoming.');
                twil.errorMessage();
            }else{
                console.log(root.newTime(), 'Got the data! Text incoming.');
                twil.sendMessage(foundData[0], foundData[1]);
            }

        } catch (err) {
            console.log(Error(err));
        }

    })();
};