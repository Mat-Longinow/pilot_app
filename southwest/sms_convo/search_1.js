const MessagingResponse = require('twilio').twiml.MessagingResponse;
const root = require('./../../app.js');
const searchParams = require('./../search_params.js');

exports.textConvo1 = (req, res, count) => {
    const twiml = new MessagingResponse();
    const search1Count = count;
    const upSearch1Counter = () => {
        req.session.counter = search1Count + 1;
    };

    const clearsearch1Counter = () => {
        req.session.counter = 0;
    };

    console.log(root.newTime(), 'You are now in search_1.js');

    let message = '';

    if(search1Count === 1) {
        message = 'What date are you looking for?';

        twiml.message(message);

        upSearch1Counter();

    }else if(search1Count === 2) {
        searchParams.search_params.date = req.body.Body;

        message = searchParams.search_params.date + '. Got it.';

        twiml.message(message);

        message = 'What departure time are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 3) {
        searchParams.search_params.dept_time = req.body.Body;

        message = 'Flying out at ' + searchParams.search_params.dept_time + '? Cool!';

        twiml.message(message);

        message = 'What arrival time are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 4) {
        searchParams.search_params.arr_time = req.body.Body;

        message = 'Arriving at ' + searchParams.search_params.arr_time + '. Noted.';

        twiml.message(message);

        message = 'What departure station are you looking for?';

        twiml.message(message);

        clearsearch1Counter();
    }else if(search1Count === 5) {
        searchParams.search_params.dept_station = req.body.Body;

        message = 'Flying out of ' + searchParams.search_params.dept_station + "? Great choice, I've heard the burgers are fabulous there.";

        twiml.message(message);

        message = 'What arrival station are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 6) {
        searchParams.search_params.dept_station = req.body.Body;

        message = 'Flying into ' + searchParams.search_params.dept_station + "? Stay away from the shrimp. Just... trust me...";

        twiml.message(message);

        message = 'Final question. What max number of legs are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 7) {
        searchParams.search_params.dept_station = req.body.Body;

        message = "Yeah, you're right, any more than " + searchParams.search_params.legs + ' legs would be just weird.';

        twiml.message(message);

        message =  'Alright! Would you like to search again? (Maximum of 5 searches before this plane crashes... see what I did there?)';

        twiml.message(message);

        upSearch1Counter();
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
};