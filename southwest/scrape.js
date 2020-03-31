const puppeteer = require('puppeteer');
const twil = require('./send_message.js');
const root = require('./../app.js');
const params = require('./search_params.js');

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

            // search #1

            console.log('search #1');

            await solutionFrame.select('#dateSelection', dates.todayPlusOne);

            await solutionFrame.select('#departureTimeSelection', '6.5');

            await solutionFrame.select('#arrivalTimeSelection', '12.5');

            await solutionFrame.select('select[name="departureStation"]', 'SNA');

            await solutionFrame.select('select[name="arrivalStation"]', 'LAX');

            await solutionFrame.select('select[name="legs"]', '3');

            await solutionFrame.click('#submitDiv .buttonFace');

            await page.waitFor(15000);

            // search #2

            console.log('search #2');

            await menuFrame.click('div#input');

            await page.waitFor(5000);

            await solutionFrame.select('#dateSelection', dates.todayPlusTwo);

            await solutionFrame.select('#departureTimeSelection', '8.5');

            await solutionFrame.select('#arrivalTimeSelection', '11.5');

            await solutionFrame.select('select[name="departureStation"]', 'SNA');

            await solutionFrame.select('select[name="arrivalStation"]', 'LAX');

            await solutionFrame.select('select[name="legs"]', '2');

            await solutionFrame.click('#submitDiv .buttonFace');

            // search #3

            console.log('search #3');

            await menuFrame.click('div#input');

            await page.waitFor(5000);

            await solutionFrame.select('#dateSelection', dates.todayPlusTwo);

            await solutionFrame.select('#departureTimeSelection', '6.5');

            await solutionFrame.select('#arrivalTimeSelection', '10.5');

            await solutionFrame.select('select[name="departureStation"]', 'SNA');

            await solutionFrame.select('select[name="arrivalStation"]', 'LAX');

            await solutionFrame.select('select[name="legs"]', '4');

            await solutionFrame.click('#submitDiv .buttonFace');

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