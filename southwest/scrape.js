const puppeteer = require('puppeteer');
const twil = require('./send_message.js');
const root = require('./../app.js');
const params = require('./search_params.js');
const convert = require('./data_converter.js');

exports.scrapeInit = () => {
    (async () => {
        try {
            console.log(root.newTime(), 'You have entered scrape.js');
            console.log(params.search_params);

            let dates = [];
            let dept_time = [];
            let arr_time = [];

            params.search_params.date.forEach((date) => {
                dates.push(convert.dateConvert(date));
            });

            params.search_params.dept_time.forEach((time) => {
                dept_time.push(convert.timeConvert(time));
            });

            params.search_params.arr_time.forEach((time) => {
                arr_time.push(convert.timeConvert(time));
            });


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
            
            let searchDates = {
                today: selectItemOne,
                todayPlusOne: selectItemTwo,
                todayPlusTwo: selectItemThree,
                todayPlusThree: selectItemFour
            };

            // search #1

            console.log(root.newTime(), 'search #1');

            await solutionFrame.select('#dateSelection', searchDates.todayPlusOne);

            await solutionFrame.select('#departureTimeSelection', '6.5');

            await solutionFrame.select('#arrivalTimeSelection', '12.5');

            await solutionFrame.select('select[name="departureStation"]', 'SNA');

            await solutionFrame.select('select[name="arrivalStation"]', 'LAX');

            await solutionFrame.select('select[name="legs"]', '3');

            await solutionFrame.click('#submitDiv .buttonFace');

            await page.waitFor(15000);

            // search #2

            if(params.search_params.date.length == 2 &&
            params.search_params.dept_time.length == 2 &&
            params.search_params.arr_time.length == 2 &&
            params.search_params.dept_station.length == 2 &&
            params.search_params.arr_station.length == 2 &&
            params.search_params.legs.length == 2) {

                console.log(root.newTime(), 'search #2');

                await menuFrame.click('div#input');

                await page.waitFor(5000);

                await solutionFrame.select('#dateSelection', searchDates.todayPlusTwo);

                await solutionFrame.select('#departureTimeSelection', '8.5');

                await solutionFrame.select('#arrivalTimeSelection', '11.5');

                await solutionFrame.select('select[name="departureStation"]', 'SNA');

                await solutionFrame.select('select[name="arrivalStation"]', 'LAX');

                await solutionFrame.select('select[name="legs"]', '2');

                await solutionFrame.click('#submitDiv .buttonFace');

                await page.waitFor(15000);
            }

            // search #3
            if(params.search_params.date.length == 3 &&
            params.search_params.dept_time.length == 3 &&
            params.search_params.arr_time.length == 3 &&
            params.search_params.dept_station.length == 3 &&
            params.search_params.arr_station.length == 3 &&
            params.search_params.legs.length == 3) {
                console.log(root.newTime(), 'search #3');

                await menuFrame.click('div#input');

                await page.waitFor(5000);

                await solutionFrame.select('#dateSelection', searchDates.todayPlusTwo);

                await solutionFrame.select('#departureTimeSelection', '6.5');

                await solutionFrame.select('#arrivalTimeSelection', '10.5');

                await solutionFrame.select('select[name="departureStation"]', 'SNA');

                await solutionFrame.select('select[name="arrivalStation"]', 'LAX');

                await solutionFrame.select('select[name="legs"]', '4');

                await solutionFrame.click('#submitDiv .buttonFace');

                await page.waitFor(15000);
            };

            console.log(root.newTime(), 'All done! Resetting Search Params.');

            params.search_params = {
                date: [],
                dept_time: [],
                arr_time: [],
                dept_station: [],
                arr_station: [],
                legs: []
            };

        } catch (err) {
            console.log(Error(err));
        }

    })();
};