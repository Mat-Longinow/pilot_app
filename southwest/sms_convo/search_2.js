const MessagingResponse = require('twilio').twiml.MessagingResponse;
const root = require('./../../app.js');
const searchParams = require('./../search_params.js');

exports.textConvo1 = (req, res, count) => {
    const twiml = new MessagingResponse();
    const search2Count = count;
    const upsearch2Counter = () => {
        req.session.search1Counter = search2Count + 1;
    };

    const clearsearch2Counter = () => {
        req.session.search1Counter = 0;
    };

    console.log(root.newTime(), 'You are now in search_2.js');

    let message = '';

    if(search2Count === 1) {
        message = 'What date are you looking for?';

        twiml.message(message);

        upsearch2Counter();

    }else if(search2Count === 2) {
        searchParams.search_params.date = req.body.Body;

        message = searchParams.search_params.date + '. Got it.';

        twiml.message(message);

        message = 'What departure time are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 3) {
        searchParams.search_params.dept_time = req.body.Body;

        message = 'Flying out at ' + searchParams.search_params.dept_time + '? Cool!';

        twiml.message(message);

        message = 'What arrival time are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 4) {
        searchParams.search_params.arr_time = req.body.Body;

        message = 'Arriving at ' + searchParams.search_params.arr_time + '. Noted.';

        twiml.message(message);

        message = 'What departure station are you looking for?';

        twiml.message(message);

        clearsearch2Counter();
    }else if(search2Count === 5) {
        searchParams.search_params.dept_station = req.body.Body;

        message = 'Flying out of ' + searchParams.search_params.dept_station + "? Great choice, I've heard the burgers are fabulous there.";

        twiml.message(message);

        message = 'What arrival station are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 6) {
        searchParams.search_params.dept_station = req.body.Body;

        message = 'Flying into ' + searchParams.search_params.dept_station + "? Stay away from the shrimp. Just... trust me...";

        twiml.message(message);

        message = 'Final question. What max number of legs are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 7) {
        searchParams.search_params.dept_station = req.body.Body;

        message = "Yeah, you're right, any more than " + searchParams.search_params.legs + ' legs would be just weird.';

        twiml.message(message);

        message =  'Alright! Would you like to search again? (Maximum of 5 searches before this plane crashes... see what I did there?)';

        twiml.message(message);

        upsearch2Counter();
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
};