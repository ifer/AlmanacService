var moment = require('moment');
var SunCalc = require('suncalc');

const moonPhases = require('./MoonPhases');
const holidayService = require('./holidayService');

moment.locale('el');

// Location loc = new Location("37.9794500", "23.7162200");
const latitude = 37.97945;
const longitude = 23.71622;

// moonPhases.populateMoonPhases();

function getDayInfo(datestr) {
    let date;
    if (datestr === undefined) {
        date = moment();
    } else {
        date = moment(datestr + ' 00:00', 'DD/MM/YYYY HH:mm');
    }
    // console.log(date.format());

    // get today's sunlight times for Athens
    const times = SunCalc.getTimes(date, latitude, longitude);
    // format sunrise time from the Date object
    const sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
    const sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();

    // moonPhase(date);
    // let testDate = moment('01/03/2025 00:00', 'DD/MM/YYYY HH:mm');
    // let mondays = testDate.daysInMonth();
    //
    // for (let i = 1; i <= mondays; i++) {
    //     let moon = SunCalc.getMoonIllumination(testDate);
    //     console.log(`${testDate.format('DD/MM/YYYY')} ${moonPhases.getMoonPhaseEvent(testDate)}`);
    //     testDate.add(1, 'days');
    // }

    return {
        nDay: date.date(),
        nMonth: date.month() + 1,
        nYear: date.year(),
        dayOfWeek: date.format('dddd'),
        dayOfMonth: date.format('D'),
        month: date.format('DD/MMMM').split('/')[1],
        year: date.format('YYYY'),
        dayHolidays: holidayService.getAllHolidaysByDate(date),
        dayFixedHoliday: holidayService.getFixedHolidayByDate(date),
        dayMobileHoliday: holidayService.getMobileHolidayByDate(date),
        dayNames: holidayService.getAllNamesByDate(date),
        moonPhase: moonPhases.getMoonPhaseEvent(date),
        sunRiseSet: `Ανατολή: ${sunriseStr}  Δύση: ${sunsetStr}`,
        datestr: date.format('DDMMYYYY'),
    };
}

module.exports = { getDayInfo };
