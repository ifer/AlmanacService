const moment = require('moment');

const moondata = require('./data/moondata.json');

moment.locale('el');

function getMoonPhaseEvent(thisday) {
    let newMoon;
    const dateUtcOffset = thisday.utcOffset();
    const secs_per_day = 86400;

    // console.log(`thisday=${thisday.format('ddd DD/MM/YYYY hh:mm')}`);
    // console.log(`day=${thisday.date()}, month=${thisday.month()}, year=${thisday.year()}`);

    for (let i = 0; i < moondata.length; i++) {
        if (moondata[i].year < thisday.year()) {
            //Keep last new moon of previous year
            if (moondata[i].year == thisday.year() - 1 && moondata[i].newMoonMonth >= 11) {
                newMoon = moment({
                    year: moondata[i].year,
                    month: moondata[i].newMoonMonth - 1,
                    day: moondata[i].newMoonDay,
                }).utcOffset(dateUtcOffset);
                // console.log(`newMoon=${newMoon.format('DD/MM/YYYY HH:mm')}`);
            }
            continue;
        }

        if (thisday.date() == moondata[i].newMoonDay && thisday.month() + 1 == moondata[i].newMoonMonth) {
            sRet = 'Νέα σελήνη';
            if (moondata[i].newMoonEclipseEvent != ' ')
                sRet = sRet + '\n' + getEclipseEvent(moondata[i].newMoonEclipseEvent);
            return sRet;
        } else if (thisday.date() == moondata[i].fullMoonDay && thisday.month() + 1 == moondata[i].fullMoonMonth) {
            sRet = 'Πανσέληνος';
            return sRet;
        } else {
            if (
                is_before(
                    moondata[i].newMoonDay,
                    moondata[i].newMoonMonth,
                    moondata[i].year,
                    thisday.date(),
                    thisday.month() + 1,
                    thisday.year()
                )
            ) {
                if (moondata[i].newMoonMonth > 0 && moondata[i].newMoonDay > 0) {
                    newMoon = moment({
                        year: moondata[i].year,
                        month: moondata[i].newMoonMonth - 1,
                        day: moondata[i].newMoonDay,
                    }).utcOffset(dateUtcOffset);
                    // console.log(`newMoon2=${newMoon.format('DD/MM/YYYY HH:mm')}`);
                }
            } else {
                // console.log('thisday=' + thisday.format());
                let thisDaySecs = thisday.valueOf() / 1000;
                let newMoonSecs = newMoon.valueOf() / 1000;
                let a = thisDaySecs / secs_per_day;
                let b = newMoonSecs / secs_per_day;
                let moonDays = Math.round(a - b);
                // let moonDays = thisDaySecs / secs_per_day - newMoonSecs / secs_per_day;
                // console.log(`thisDaySecs=${thisDaySecs}, newMoonSecs=${newMoonSecs}, moonDays=${moonDays} i=${i}`);
                // moonDays = thisDaySecs / secs_per_day - newMoonSecs / secs_per_day;
                if (moonDays == 1) {
                    return 'Σελήνη ' + moonDays + ' ημέρας';
                } else {
                    return 'Σελήνη ' + moonDays + ' ημερών';
                }
            }
        }
    }
    return '';
}

function getEclipseEvent(eventType) {
    let sRet;

    switch (eventType) {
        case 'T':
            sRet = 'Ολική έκλειψη ηλίου';
            break;
        case 'A':
            sRet = 'Δακτυλιοειδής έκλειψη ηλίου';
            break;
        case 'H':
            sRet = 'Ολική & δακτυλιοειδής έκλειψη ηλίου';
            break;
        case 'P':
            sRet = 'Μερική έκλειψη ηλίου';
            break;
        case 't':
            sRet = 'Ολική έκλειψη σελήνης';
            break;
        case 'p':
            sRet = 'Μερική έκλειψη σελήνης';
            break;
        case 'n':
            sRet = 'Παρασκιώδης έκλειψη σελήνης';
            break;
        default:
            sRet = '';
            break;
    }

    return sRet;
}

function is_before(day1, month1, year1, day2, month2, year2) {
    if (year1 < year2) return true;
    else if (year1 > year2) return false;

    if (month1 < month2) return true;
    else if (month1 > month2) return false;

    if (day1 < day2) return true;

    return false;
}

module.exports = {
    // populateMoonPhases,
    getMoonPhaseEvent,
};
