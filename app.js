require('dotenv').config({debug: true});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;
const scrape = require('./scrape.js');
const root = require('./app.js');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: false }));

exports.newTime = () => new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});

console.log(root.newTime(), 'You have entered the app!');

app.get('/', (req, res) => {
    res.send('Welcome to Mats app!');
});

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    // Get the incoming number and export it to be used in send_message.js
    let incomingNumber = req.body.From;
    exports.incomingNumber = incomingNumber;

    if(req.body.Body == 'SCE') {
        scrape.scrapeInit();

        twiml.message('SUPER POWERS ACTIVATED! Just give me one second to just... do this... one thing...');
    }else{
        twiml.message('Hmmm... I would love to help you, but it looks like I am not understanding you...')
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.listen(port, () => console.log(root.newTime(), `Mat's app listening on port ${port}!`));