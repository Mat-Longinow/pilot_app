const puppeteer = require('puppeteer');
const twil = require('./send_message.js');
const root = require('./../app.js');

exports.scrapeInit = () => {
    (async () => {
        try {
            console.log(root.newTime(), 'You have entered scrape.js');
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();

            await page.goto('https://login.swalife.com/myswa_lifelogin.htm');

            await page.waitFor(1000);

            await page.type('#useridField', process.env.SW_USERNAME);
            await page.type('input[type="password"]', process.env.SW_PASS);
            await page.click('.submitButton');

            await page.waitFor(10000);

            await page.click('div.megamenuItemGreen');

            await page.waitFor(2000);

            await page.click('div.myWorkNavigation.borderGreen div.linkContainer div.navLink:nth-child(2)');

            await page.waitFor(2000);

            let myWorkButton = await page.evaluate(() => {
                let data = document.querySelectorAll('div')
            })

            // let foundData = await page.evaluate(() => {
            //     let data = document.querySelectorAll('p');
            //
            //     let found = [];
            //
            //     data.forEach(element => {
            //         if (element.innerText.includes('$')) {
            //             found.push(element.innerText);
            //         }
            //     });
            //
            //     return found;
            // });
            //
            // await browser.close();
            //
            // if(foundData[0] === undefined || foundData[1] === undefined) {
            //     console.log(root.newTime(), 'Uh oh, error finding the SCE data. Text incoming.');
            //     twil.errorMessage();
            // }else{
            //     console.log(root.newTime(), 'Got the data! Text incoming.');
            //     twil.sendMessage(foundData[0], foundData[1]);
            // }

        } catch (err) {
            console.log(Error(err));
        }

    })();
};