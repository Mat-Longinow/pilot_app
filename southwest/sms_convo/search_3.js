const MessagingResponse = require('twilio').twiml.MessagingResponse;
const root = require('./../../app.js');
const searchParams = require('./../search_params.js');
const southwest_scrape = require('./../scrape.js');

exports.textConvo3 = (req, res, count) => {
    const twiml = new MessagingResponse();
    const search3Count = count;
    const upsearch3Counter = () => {
        req.session.search3Counter = search3Count + 1;
    };

    console.log(root.newTime(), 'You are now in search_3.js');

    let message = '';

    if(search3Count === 1) {
        console.log('you made it to 1');

        twiml.message('Sounds good, final round');

        message = 'What date are you looking for?';

        twiml.message(message);

        upsearch3Counter();

    }else if(search3Count === 2) {
        searchParams.search_params.date.push(req.body.Body);

        message = searchParams.search_params.date[2] + '. Got it.';

        twiml.message(message);

        message = 'What departure time are you looking for?';

        twiml.message(message);

        upsearch3Counter();
    }else if(search3Count === 3) {
        searchParams.search_params.dept_time.push(req.body.Body);

        message = 'Flying out at ' + searchParams.search_params.dept_time[2] + '? Cool!';

        twiml.message(message);

        message = 'What arrival time are you looking for?';

        twiml.message(message);

        upsearch3Counter();
    }else if(search3Count === 4) {
        searchParams.search_params.arr_time.push(req.body.Body);

        message = 'Arriving at ' + searchParams.search_params.arr_time[2] + '. Noted.';

        twiml.message(message);

        message = 'What departure station are you looking for?';

        twiml.message(message);

        upsearch3Counter();
    }else if(search3Count === 5) {
        searchParams.search_params.dept_station.push(req.body.Body);

        message = 'Flying out of ' + searchParams.search_params.dept_station[2] + "? Great choice.";

        twiml.message(message);

        message = 'What arrival station are you looking for?';

        twiml.message(message);

        upsearch3Counter();
    }else if(search3Count === 6) {
        searchParams.search_params.arr_station.push(req.body.Body);

        message = 'Flying into ' + searchParams.search_params.arr_station[2] + "? Perfect.";

        twiml.message(message);

        message = 'Final question. What max number of legs are you looking for?';

        twiml.message(message);

        upsearch3Counter();
    }else if(search3Count === 7) {
        searchParams.search_params.legs.push(req.body.Body);

        message = searchParams.search_params.legs[2] + ' legs. Got it.';

        twiml.message(message);

        message =  "Alright! Let's get you those results";

        twiml.message(message);

        upsearch3Counter();

        southwest_scrape.scrapeInit();
    }

    console.log(searchParams.search_params);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
};