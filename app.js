require('dotenv').config({debug: true});
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const textConvo1 = require('./southwest/sms_convo/search_1.js');
const sce_scrape = require('./sce/scrape.js');
const root = require('./app.js');
const searchParams = require('./southwest/search_params');

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

    const search2Count = '';
    const upSearch2Counter = () => {
        req.session.search1Counter = search1Count + 1;
    };

    const search3Count = '';
    const upSearch3Counter = () => {
        req.session.search1Counter = search1Count + 1;
    };

    const search4Count = '';
    const upSearch4Counter = () => {
        req.session.search1Counter = search1Count + 1;
    };

    const search5Count = '';
    const upSearch5Counter = () => {
        req.session.search1Counter = search1Count + 1;
    };

    // Get the incoming number and export it to be used in send_message.js
    let incomingNumber = req.body.From;
    exports.incomingNumber = incomingNumber;

    if (req.body.Body == 'SCE' || req.body.Body == 'sce' || req.body.Body == 'Sce') {
        sce_scrape.scrapeInit();

        twiml.message('SUPER POWERS ACTIVATED! Just give me one second to just... do this... one thing...');

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    } else if (req.body.Body == 'southwest' || req.body.Body == 'Southwest' || req.body.Body == 'South west' || req.body.Body == 'south west') {
        console.log(root.newTime(), 'You entered Southwest');

        upSearch1Counter();
        console.log(req.session);

        textConvo1.textConvo1(req, res, search1Count);
    }else if(search1Count > 0 && search1Count < 8) {
        textConvo1.textConvo1(req, res, search1Count);
    }else if(search1Count === 8) {
        if(req.body.Body == 'yes' || req.body.Body == 'Yes') {

        }else if(req.body.Body == 'no' || req.body.Body == 'No') {
            twiml.message('Sounds good, let me grab your results real fast.');

            console.log(searchParams.search_params);

            clearSearch1Counter();

            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }else{
            twiml.message('Hmm... looks like you need to try again. Let me know either Yes or No.');

            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
    }else if(search2Count > 0) {
        textConvo1.textConvo1(req, res, search2Count);
    }else if(search3Count > 0) {
        textConvo1.textConvo1(req, res, search3Count);
    }else if(search4Count > 0) {
        textConvo1.textConvo1(req, res, search4Count);
    }else if(search5Count > 0) {
        textConvo1.textConvo1(req, res, search5Count);
    }else{
        twiml.message('Hmmm... I would love to help you, but it looks like I am not understanding you...');

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
});

app.listen(port, () => console.log(root.newTime(), `Mat's app listening on port ${port}!`));