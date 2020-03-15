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

            await page.goto('https://www.swalife.com/wps/myportal/swalife/mywork/flightops/standards/linechecksolver');

            await page.waitFor(1000);

            // this grabs the iframe to manipulate
            const menuFrame = await page.frames().find(frame => frame.name() === 'menu');

            await menuFrame.click('div#input');

            await page.waitFor(7000);

            // this grabs the iframe to manipulate
            const solutionFrame = await page.frames().find(frame => frame.name() === 'body');

            // select only takes in value, so need to get
            const selectItemOne = await solutionFrame.$eval('#dateSelection option:first-child', element => element.value);
            const selectItemTwo = await solutionFrame.$eval('#dateSelection option:nth-child(2)', element => element.value);
            const selectItemThree = await solutionFrame.$eval('#dateSelection option:nth-child(3)', element => element.value);
            const selectItemFour = await solutionFrame.$eval('#dateSelection option:nth-child(4)', element => element.value);

            let dates = {
                today: selectItemOne,
                todayPlusOne: selectItemTwo,
                todayPlusTwo: selectItemThree,
                todayPlusThree: selectItemFour
            };

            console.log(dates);

            await solutionFrame.select('#dateSelection', dates.todayPlusOne);

            // await page.goto('https://lcs.swalife.com/line-check-solver-ui/menu.jsp');
            //
            // await page.click('#input');
            //
            // await page.waitFor(2000);
            //
            // await page.waitFor(1000);
            //
            // await page.select('#dateSelection', 'Mar 14, 2020');
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