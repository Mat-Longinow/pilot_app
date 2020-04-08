require('dotenv').config({debug: true});
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const textConvo1 = require('./southwest/sms_convo/search_1.js');
const textConvo2 = require('./southwest/sms_convo/search_2.js');
const textConvo3 = require('./southwest/sms_convo/search_3.js');
const sce_scrape = require('./sce/scrape.js');
const southwest_scrape = require('./southwest/scrape.js');
const root = require('./app.js');
const params = require('./southwest/search_params');

const convert = require('./southwest/data_converter.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session(
    {
                secret: 'milk-is-heaven'
            }
        )
);

exports.newTime = () => new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});

console.log(root.newTime(), 'You have entered the app!');

app.get('/', (req, res) => {
    res.send('Welcome to Mats app!');
});

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    let search1Count = req.session.search1Counter || 0;

    const upSearch1Counter = () => {
        req.session.search1Counter = search1Count + 1;

        search1Count = req.session.search1Counter;
    };

    const clearSearch1Counter = () => {
        req.session.search1Counter = 0;

        search1Count = req.session.search1Counter;
    };

    let search2Count = req.session.search2Counter || 0;
    const upSearch2Counter = () => {
        req.session.search2Counter = search2Count + 1;

        search2Count = req.session.search2Counter;
    };

    const clearSearch2Counter = () => {
        req.session.search2Counter = 0;

        search2Count = req.session.search2Counter;
    };

    let search3Count = req.session.search3Counter || 0;
    const upSearch3Counter = () => {
        req.session.search3Counter = search3Count + 1;

        search3Count = req.session.search3Counter;
    };

    const clearSearch3Counter = () => {
        req.session.search3Counter = 0;

        search3Count = req.session.search3Counter;
    };

    // Get the incoming number and export it to be used in send_message.js
    let incomingNumber = req.body.From;
    exports.incomingNumber = incomingNumber;

    if(req.body.Body == 'SCE' || req.body.Body == 'sce' || req.body.Body == 'Sce') {
        sce_scrape.scrapeInit();

        twiml.message('SUPER POWERS ACTIVATED! Just give me one second to just... do this... one thing...');

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }else if (req.body.Body == 'southwest' || req.body.Body == 'Southwest' || req.body.Body == 'South west' || req.body.Body == 'south west') {
        console.log(root.newTime(), 'You entered Southwest');

        upSearch1Counter();
        
        textConvo1.textConvo1(req, res, search1Count);
    }else if(search1Count > 0 && search1Count < 8) {
        textConvo1.textConvo1(req, res, search1Count);
    }else if(search1Count === 8) {
        if(req.body.Body == 'yes' || req.body.Body == 'Yes') {
            clearSearch1Counter();

            upSearch2Counter();

            textConvo2.textConvo2(req, res, search2Count);
        }else if(req.body.Body == 'no' || req.body.Body == 'No') {
            twiml.message('Sounds good, let me grab your results real fast.');

            clearSearch1Counter();

            southwest_scrape.scrapeInit();

            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }else{
            twiml.message('Hmm... looks like you need to try again. Let me know either Yes or No.');

            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
    }else if(search2Count > 0 && search2Count < 8) {
        textConvo2.textConvo2(req, res, search2Count);
    }else if(search2Count === 8) {

        if(req.body.Body == 'yes' || req.body.Body == 'Yes') {

            clearSearch2Counter();

            upSearch3Counter();

            textConvo3.textConvo3(req, res, search3Count);
        }else if(req.body.Body == 'no' || req.body.Body == 'No') {
            twiml.message('Sounds good, let me grab your results real fast.');

            clearSearch2Counter();

            southwest_scrape.scrapeInit();

            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }else{
            twiml.message('Hmm... looks like you need to try again. Let me know either Yes or No.');

            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
    }else if(search3Count > 0) {
        textConvo3.textConvo3(req, res, search3Count);
    }else if(req.body.Body.includes('convert')) {
        let testConvert = req.body.Body;
        testConvert = testConvert.replace('convert', '');

        if(testConvert.includes(' ')) {
            testConvert = testConvert.replace(' ', '');
        }
        
        convert.dateConvert(testConvert);
    }else if(req.body.Body === 'test') {
        params.search_params = {
            date: ['1/5','3/6'],
            dept_time: ['1','4'],
            arr_time: ['3', '7'],
            dept_station: ['LAX'],
            arr_station: ['SNA'],
            legs: ['3']
        }


        southwest_scrape.scrapeInit();

    }else{
        twiml.message('Hmmm... I would love to help you, but it looks like I am not understanding you...');

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
});

app.listen(port, () => console.log(root.newTime(), `Mat's app listening on port ${port}!`));