require('dotenv').config({debug: true});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;
const scrape = require('./scrape.js');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: false }));

console.log('You have entered the app!');

scrape.scrapeInit();

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    // Get the incoming number and export it to be used in send_message.js
    let incomingNumber = req.body.From;
    exports.incomingNumber = incomingNumber;

    if(req.body.Body == 'SCE') {
        scrape.scrapeInit();

        twiml.message('SCE SUPER POWERS ACTIVATED! Just give me one second to just... do this... one thing...');
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));