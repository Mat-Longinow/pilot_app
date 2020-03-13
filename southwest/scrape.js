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

            await page.waitFor(2000);

            // Ended up being able to access just the iframe url to take us to a page with just the iframe
            // Did this by calling const frame = page.frames().find(frame => frame.name() === 'menu'); and inspecting the object to find the url
            const frame = await page.frames().find(frame => frame.name() === 'menu');

            let cookies = await page.cookies();

            console.log(cookies);

            // const buildASolution = await frame.$eval('#input', (element) => {
            //     console.log(element);
            //
            //     return element;
            // });

            await page.goto('https://lcs.swalife.com/line-check-solver-ui/menu.jsp');

            await page.click('#input');

            await page.waitFor(2000);

            await page.waitFor(1000);

            await page.select('#dateSelection', 'Mar 14, 2020');
            // const text = await frame.$eval('.selector', element => element.textContent);

            // let myWorkButton = await page.evaluate(() => {
            //     let data = document.querySelectorAll('div')
            // })

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