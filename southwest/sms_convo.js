const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.textConvo = (req, count) => {
    const twiml = new MessagingResponse();
    const smsCount = count;
    const request = req;
    const upSmsCounter = () => {
        req.session.counter = smsCount + 1;
    };

    console.log('You are now in sms_convo.js');

    let message = 'you got to the next page!';

    twiml.message(message);

    if(smsCount === 1) {
        message = 'Hello, thanks for message number ' + (smsCount + 1);

        console.log('You made your way to smsCount 1: ' + request.body.Body);

        upSmsCounter();
    } else if(smsCount === 2) {
        console.log('You made your way to smsCount 2: ' + request.body.Body);

        message = 'Wow, you really like responding, huh? That is message number ' + (smsCount + 1);

        twiml.message(message);
    } else if(smsCount === 3) {

        console.log('You made your way to smsCount 3: ' + request.body.Body);

        message = "Wow, that is a bit much, don't you think? " + smsCount + '... really?';

        twiml.message(message);

        upSmsCounter();
    }
};