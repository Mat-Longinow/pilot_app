const MessagingResponse = require('twilio').twiml.MessagingResponse;
const root = require('./../app.js');
const searchParams = require('./search_params.js');

exports.textConvo = (req, res, count) => {
    const twiml = new MessagingResponse();
    const smsCount = count;
    const request = req;
    const upSmsCounter = () => {
        req.session.counter = smsCount + 1;
    };

    const clearSmsCounter = () => {
        req.session.counter = 0;
    };

    console.log(root.newTime(), 'You are now in sms_convo.js');

    let message = '';

    if(smsCount === 1) {
        message = 'What is the date?';

        twiml.message(message);

        upSmsCounter();
    } else if(smsCount === 2) {
        searchParams.search_params.date = req.body.Body;

        message = searchParams.search_params.date + ' huh? Well, then what is the airport?';

        twiml.message(message);

        upSmsCounter();
    } else if(smsCount === 3) {
        searchParams.search_params.dept_station = req.body.Body;

        message = 'Flying out of ' + searchParams.search_params.dept_station + '? Cool!'

        twiml.message(message);

        clearSmsCounter();

        console.log(searchParams.search_params);
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
};