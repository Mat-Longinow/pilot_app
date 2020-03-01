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

    const search1Count = req.session.counter || 0;

    const upSearch1Counter = () => {
        req.session.counter = search1Count + 1;
    };

    const search2Count = req.session.counter || 0;
    const upSearch2Counter = () => {
        req.session.counter = search1Count + 1;
    };

    const search3Count = req.session.counter || 0;
    const upSearch3Counter = () => {
        req.session.counter = search1Count + 1;
    };

    const search4Count = req.session.counter || 0;
    const upSearch4Counter = () => {
        req.session.counter = search1Count + 1;
    };

    const search5Count = req.session.counter || 0;
    const upSearch5Counter = () => {
        req.session.counter = search1Count + 1;
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

        let message = 'Hello Will! Let me get this search started for you... Might feel like 20 questions, but lets get started.';

        twiml.message(message);

        upSearch1Counter();

        textConvo1.textConvo1(req, res, search1Count);

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }else if(search1Count > 0) {
        textConvo1.textConvo1(req, res, search1Count);
    }else if(search1Count === 8) {
        if(req.body.Body == 'yes' || req.body.Body == 'Yes') {

        }else if(req.body.Body == 'no' || req.body.Body == 'No') {
            twiml.message('Sounds good, let me grab your results real fast.');
        }

        textConvo1.textConvo1(req, res, search2Count);
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