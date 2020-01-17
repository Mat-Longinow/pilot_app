const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const incomingNumber = require('./app.js');
require('dotenv').config();

exports.sendMessage = function(body1, body2) {
    client.messages
        .create({
            body: 'Hello Mat! This is your friendly reminder. Your current bill is ' + body1 + '. And here is your ' + body2,
            from: '+17143404784',
            to: incomingNumber.incomingNumber
        })
        .then(
            message => console.log(new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}), message.sid)
        );
};

exports.errorMessage = function() {
    client.messages
        .create({
            body: 'Oops, something went wrong! You should probably take a look.',
            from: '+17143404784',
            to: incomingNumber.incomingNumber
        })
        .then(
            message => console.log(new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}), message.sid)
        );
};