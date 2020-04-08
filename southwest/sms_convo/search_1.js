const MessagingResponse = require('twilio').twiml.MessagingResponse;
const root = require('./../../app.js');
const searchParams = require('./../search_params.js');

exports.textConvo1 = (req, res, count) => {
    const twiml = new MessagingResponse();
    const search1Count = count;
    const upSearch1Counter = () => {
        req.session.search1Counter = search1Count + 1;
    };

    console.log(root.newTime(), 'You are now in search_1.js', count);

    let message = '';

    if(search1Count === 1) {
        message = 'Hello Will! Let me get this search started for you...';

        twiml.message(message);

        message = 'What date are you looking for?';

        twiml.message(message);

        upSearch1Counter();

    }else if(search1Count === 2) {
        searchParams.search_params.date.push(req.body.Body);

        message = searchParams.search_params.date + '. Got it.';

        twiml.message(message);

        message = 'What departure time are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 3) {
        searchParams.search_params.dept_time.push(req.body.Body);

        message = 'Flying out at ' + searchParams.search_params.dept_time + '? Cool!';

        twiml.message(message);

        message = 'What arrival time are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 4) {
        searchParams.search_params.arr_time.push(req.body.Body);

        message = 'Arriving at ' + searchParams.search_params.arr_time + '. Noted.';

        twiml.message(message);

        message = 'What departure station are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 5) {
        searchParams.search_params.dept_station.push(req.body.Body);

        message = 'Flying out of ' + searchParams.search_params.dept_station + "? Great choice.";

        twiml.message(message);

        message = 'What arrival station are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 6) {
        searchParams.search_params.arr_station.push(req.body.Body);

        message = 'Flying into ' + searchParams.search_params.arr_station + "? Perfect.";

        twiml.message(message);

        message = 'Final question. What max number of legs are you looking for?';

        twiml.message(message);

        upSearch1Counter();
    }else if(search1Count === 7) {
        searchParams.search_params.legs.push(req.body.Body);

        message = searchParams.search_params.legs + ' legs. Got it.';

        twiml.message(message);

        message =  'Alright! Would you like another search? (Maximum of 3 searches)';

        twiml.message(message);

        upSearch1Counter();
    }

    console.log(searchParams.search_params);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
};