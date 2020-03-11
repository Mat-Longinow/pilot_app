const MessagingResponse = require('twilio').twiml.MessagingResponse;
const root = require('./../../app.js');
const searchParams = require('./../search_params.js');

exports.textConvo2 = (req, res, count) => {
    const twiml = new MessagingResponse();
    let search2Count = count;
    const upsearch2Counter = () => {
        req.session.search2Counter = search2Count + 1;

        search2Count = req.session.search2Counter;
    };

    console.log(root.newTime(), 'You are now in search_2.js');

    let message = '';

    if(search2Count === 1) {
        twiml.message('Sounds good, round 2!');

        message = 'What date are you looking for?';

        twiml.message(message);

        upsearch2Counter();

    }else if(search2Count === 2) {
        searchParams.search_params.date.push(req.body.Body);

        message = searchParams.search_params.date[1] + '. Got it.';

        twiml.message(message);

        message = 'What departure time are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 3) {
        searchParams.search_params.dept_time.push(req.body.Body);

        message = 'Flying out at ' + searchParams.search_params.dept_time[1] + '? Cool!';

        twiml.message(message);

        message = 'What arrival time are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 4) {
        searchParams.search_params.arr_time.push(req.body.Body);

        message = 'Arriving at ' + searchParams.search_params.arr_time[1] + '. Noted.';

        twiml.message(message);

        message = 'What departure station are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 5) {
        searchParams.search_params.dept_station.push(req.body.Body);

        message = 'Flying out of ' + searchParams.search_params.dept_station[1] + "? Great choice, I've heard the burgers are fabulous there.";

        twiml.message(message);

        message = 'What arrival station are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 6) {
        searchParams.search_params.arr_station.push(req.body.Body);

        message = 'Flying into ' + searchParams.search_params.arr_station[1] + "? Stay away from the shrimp. Just... trust me...";

        twiml.message(message);

        message = 'Final question. What max number of legs are you looking for?';

        twiml.message(message);

        upsearch2Counter();
    }else if(search2Count === 7) {
        searchParams.search_params.legs.push(req.body.Body);

        message = "Yeah, you're right, any more than " + searchParams.search_params.legs[1] + ' legs would be just weird.';

        twiml.message(message);

        message =  'Alright! Would you like to search again? (Maximum of 3 searches before this plane crashes... see what I did there?)';

        twiml.message(message);

        upsearch2Counter();

        console.log(search2Count);
    }

    console.log(searchParams.search_params);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
};