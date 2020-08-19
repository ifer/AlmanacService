const calendarService = require('../services/calendarService');
var moment = require('moment');
moment.locale('el');

testMoveInTime();

function testMoveInTime() {
    const today = moment();
    today.hour(0);
    today.minute(0);
    console.log(`today: ${today.format('dddd DD/MM/YYYY HH:mm')}`);

    // Use today.clone() because moment() is mutable and changes after each call
    let yesterday = calendarService.prevDay(today.clone());
    console.log(`yesterday: ${yesterday.format('dddd DD/MM/YYYY HH:mm')}`);

    let tomorrow = calendarService.nextDay(today.clone());
    console.log(`tomorrow: ${tomorrow.format('dddd DD/MM/YYYY HH:mm')}`);

    let prevweek = calendarService.prevWeek(today.clone());
    console.log(`prev week: ${prevweek.format('dddd DD/MM/YYYY HH:mm')}`);

    let nextvweek = calendarService.nextWeek(today.clone());
    console.log(`next week: ${nextvweek.format('dddd DD/MM/YYYY HH:mm')}`);

    let prevmonth = calendarService.prevMonth(today.clone());
    console.log(`prev month: ${prevmonth.format('dddd DD/MM/YYYY HH:mm')}`);

    let nextmonth = calendarService.nextMonth(today.clone());
    console.log(`next month: ${nextmonth.format('dddd DD/MM/YYYY HH:mm')}`);

    let prevyear = calendarService.prevYear(today.clone());
    console.log(`prev year: ${prevyear.format('dddd DD/MM/YYYY HH:mm')}`);

    let nextyear = calendarService.nextYear(today.clone());
    console.log(`next year: ${nextyear.format('dddd DD/MM/YYYY HH:mm')}`);

    let gotoDate = calendarService.gotoDate('07/01/2021');
    console.log(`gotoDate: ${gotoDate.format('dddd DD/MM/YYYY HH:mm')}`);
}
