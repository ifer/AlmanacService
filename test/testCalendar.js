const calendarService = require('../services/calendarService');
var moment = require('moment');
moment.locale('el');

testMoveInTime();

function testMoveInTime() {
    const today = moment();
    // today.hour(0);
    // today.minute(0);
    const datestr = today.format('DDMMYYYY');
    // console.log(`today: ${today.format('dddd DD/MM/YYYY HH:mm')}`);

    // Use datestr because moment() is mutable and changes after each call
    let yesterday = calendarService.prevDay(datestr);
    console.log(`yesterday: ${yesterday.format('dddd DD/MM/YYYY HH:mm')}`);

    let tomorrow = calendarService.nextDay(datestr);
    console.log(`tomorrow: ${tomorrow.format('dddd DD/MM/YYYY HH:mm')}`);

    let prevweek = calendarService.prevWeek(datestr);
    console.log(`prev week: ${prevweek.format('dddd DD/MM/YYYY HH:mm')}`);

    let nextvweek = calendarService.nextWeek(datestr);
    console.log(`next week: ${nextvweek.format('dddd DD/MM/YYYY HH:mm')}`);

    let prevmonth = calendarService.prevMonth(datestr);
    console.log(`prev month: ${prevmonth.format('dddd DD/MM/YYYY HH:mm')}`);

    let nextmonth = calendarService.nextMonth(datestr);
    console.log(`next month: ${nextmonth.format('dddd DD/MM/YYYY HH:mm')}`);

    let prevyear = calendarService.prevYear(datestr);
    console.log(`prev year: ${prevyear.format('dddd DD/MM/YYYY HH:mm')}`);

    let nextyear = calendarService.nextYear(datestr);
    console.log(`next year: ${nextyear.format('dddd DD/MM/YYYY HH:mm')}`);

    let gotoDate = calendarService.gotoDate('07/01/2021');
    console.log(`gotoDate: ${gotoDate.format('dddd DD/MM/YYYY HH:mm')}`);
}
