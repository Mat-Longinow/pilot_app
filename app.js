require('dotenv').config({debug: true});
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const textConvo = require('./southwest/sms_convo.js');
const sce_scrape = require('./sce/scrape.js');
const root = require('./app.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'milk-is-heaven'}));

exports.newTime = () => new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});

console.log(root.newTime(), 'You have entered the app!');

app.get('/', (req, res) => {
    res.send('Welcome to Mats app!');
});

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    const smsCount = req.session.counter || 0;
    const upSmsCounter = () => {
        req.session.counter = smsCount + 1;
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
        sce_scrape.scrapeInit();

        twiml.message('SUPER POWERS ACTIVATED! Just give me one second to just... do this... one thing...');

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    } else if (req.body.Body == 'test' || req.body.Body == 'Test') {
        console.log(root.newTime(), 'You entered test');

        let message = 'Hello, thanks for the new message.';

        twiml.message(message);

        upSmsCounter();

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }else if(smsCount > 0) {
        textConvo.textConvo(req, res, smsCount);
    }else if(req.body.Body == 'reset' || req.body.Body == 'Reset') {
        req.session.counter = 0;

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }else if(req.body.Body == 'counter' || req.body.Body == 'Counter') {
        twiml.message('Your conversation counter is currently ' + smsCount);

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }else{
        twiml.message('Hmmm... I would love to help you, but it looks like I am not understanding you...')

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
});

app.listen(port, () => console.log(root.newTime(), `Mat's app listening on port ${port}!`));