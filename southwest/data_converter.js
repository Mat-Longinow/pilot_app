
exports.timeConvert = (time) => {
    let newTime = time;

    if(newTime.includes(' ')) {
        newTime = newTime.replace(' ', '');
    }

    if(newTime == '12AM') {
        newTime = '0.0';
    }

    if(newTime.includes(':00')) {
        newTime = newTime.replace(':00', '')
    }

    if(newTime.includes(':30')) {
        newTime = newTime.replace(':30', '.5');
    }

    if(newTime.includes('PM')) {
        newTime = newTime.replace('PM', '');

        newTime = Number(newTime);

        newTime += 12;

        newTime = newTime.toString();
    }

    if(newTime.includes('AM')) {
        newTime = newTime.replace('AM', '');
    }

    console.log(newTime);
};

exports.dateConvert = (date) => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    let month = currentDate.getMonth();  //Be careful! January is 0 not 1
    month = (Number(month) + 1).toString();
    const year = currentDate.getFullYear();

    const addZero = (num) => {
        let newNum = num;
        
        if(Number(num) < 10) {
            newNum = "0" + num;
        }

        return newNum;
    }

    const today = addZero(month) + "/" + addZero(day) + "/" + year;

    const dateBreakdown = date.split("/");

    if(dateBreakdown.length ==3) {
        // Make sure that the year is in 20xx format
        if(Number(dateBreakdown[2]) > 19 && Number(dateBreakdown[2]) < 100) {
            dateBreakdown[2] = "20" + dateBreakdown[2];
        }
    }else if(dateBreakdown.length == 2) {
        dateBreakdown.push(year);
    }

    const passedInMonth = dateBreakdown[0];
    const passedInDay = dateBreakdown[1];
    const passedInYear = dateBreakdown[2];

    const passedInDate = addZero(passedInMonth) + "/" + addZero(passedInDay) + "/" + passedInYear;
}