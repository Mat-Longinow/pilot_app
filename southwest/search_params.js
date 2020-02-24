let search_params = {};

exports.search_params = (date, dept_time, arr_time, dept_station, arr_station, legs) => {
    search_params = {
        date: date,
        dept_time: dept_time,
        arr_time: arr_time,
        dept_station: dept_station,
        arr_station: arr_station,
        legs: legs
    }
};