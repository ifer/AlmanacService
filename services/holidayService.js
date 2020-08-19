var moment = require('moment');
moment.locale('el');

const fixedNameMap = require('../data/namedays').fixedNameMap;
const mobileNameMap = require('../data/namedays').mobileNameMap;
const mobileHolMap = require('../data/holidays').mobileHolMap;
const fixedHolMap = require('../data/holidays').fixedHolMap;

const calendarService = require('./calendarService');

function getFixedHolidayByDate(date) {
    let holidays = [];
    // let fh;

    const daymon = date.format('DDMM');
    // let fh = fixedHolMap.get(daymon);
    // if (fh){
    //     holidays.push(fh);
    // }

    const stGeorge = calendarService.getStGeorgeByYear(date.year());
    if (daymon === '2304') {
        if (date.isSame(stGeorge)) {
            holidays.push(fixedHolMap.get(daymon));
        }
    } else {
        if (date.isSame(stGeorge)) {
            holidays.push(fixedHolMap.get('2304'));
        }
        holidays.push(fixedHolMap.get(daymon));
    }

    return holidays || [];
}

function getMobileHolidayByDate(date) {
    let holidays = [];
    let easter = calendarService.getEasterByYear(date.year());
    let offset = date.diff(easter, 'days');
    // console.log(`easter=${easter.format()} date=${date.format()}, offset=${offset}`);
    let mh = mobileHolMap.get(offset);
    if (mh) {
        holidays.push(mh);
    }

    return holidays;
}

function getAllHolidaysByDate(date) {
    const fixed = getFixedHolidayByDate(date);
    const mobile = getMobileHolidayByDate(date);
    return mobile.concat(fixed);
}

function getDateOfFixedHoliday(holidayName, year) {
    if (!year) {
        year = moment().year();
    }
    // special handling for St George
    if (holidayName === fixedHolMap.get('2304')) {
        return calendarService.getStGeorgeByYear(year);
    }
    for (let item of fixedHolMap) {
        if (holidayName === item[1]) {
            const day = item[0].substring(0, 2);
            const month = item[0].substring(2);
            let date = moment(day + '/' + month + '/' + year, 'DD/MM/YYYY');
            return date;
        }
    }
    return undefined;
}

function getDateOfMobileHoliday(holidayName, year) {
    if (!year) {
        year = moment().year();
    }
    // special handling for St George
    if (holidayName === fixedHolMap.get('2304')) {
        return calendarService.getStGeorgeByYear(year);
    }
    for (let item of mobileHolMap) {
        if (holidayName === item[1]) {
            const offset = item[0];
            const easter = calendarService.getEasterByYear(year);
            const date = easter.add(offset, 'days');
            return date;
        }
    }
    return undefined;
}

// Returns a Map with the results of search
// where key is the holiday name and value the daymon or the offset
function searchHolidayByName(holidayName, year) {
    if (!year) {
        year = moment().year();
    }
    // special handling for St George
    // if (holidayName === fixedHolMap.get('2304')) {
    //     return calendarService.getStGeorgeByYear(year);
    //
    const resultsMap = new Map();
    for (let item of fixedHolMap) {
        if (item[1].includes(holidayName)) {
            resultsMap.set(item[1], item[0]);
        }
    }
    for (let item of mobileHolMap) {
        if (item[1].includes(holidayName)) {
            resultsMap.set(item[1], item[0]);
        }
    }

    // console.log(resultsMap);
    return resultsMap;
}

// After search, user picks a specific holiday name from the
// results list. This function returns the date of the selection
function selectFromSearchResults(holidayname, year, resultsMap) {
    let key = resultsMap.get(holidayname);
    // console.log(key);
    if (typeof key == 'number' && isFinite(key)) {
        // mobile holiday
        return getDateOfMobileHoliday(holidayname, year);
    } else {
        //fixed holiday
        return getDateOfFixedHoliday(holidayname, year);
    }
}

// St.George names are handled by this function only
function getFixedNamesByDate(date) {
    console.log('Date: ' + date.format('DD/MM/YYYY'));
    // console.log(`day=${date.date()}, month=${date.month() + 1}`);
    // special handling for St George
    const stGeorge = calendarService.getStGeorgeByYear(date.year());
    // If is StGeorge day, return name list
    if (date.isSame(stGeorge)) {
        return fixedNameMap.get('2304');
    }
    // If date is 23/04/YYYY, check whether tho holiday has moved
    if (date.date() == 23 && date.month() + 1 == 4) {
        // If St.George has moved, return empty list
        if (!date.isSame(stGeorge)) {
            return [];
        }
    }

    const daymon = date.format('DDMM');
    let nameList = fixedNameMap.get(daymon);
    if (!nameList) {
        nameList = [];
    }
    return nameList;
}

function getMobileNamesByDate(date) {
    let easter = calendarService.getEasterByYear(date.year());
    let offset = date.diff(easter, 'days');

    let nameList = mobileNameMap.get(offset);
    if (!nameList) {
        nameList = [];
    }
    return nameList;
}

function getAllNamesByDate(date) {
    const fixed = getFixedNamesByDate(date);
    const mobile = getMobileNamesByDate(date);
    return fixed.concat(mobile);
}

module.exports = {
    getFixedHolidayByDate,
    getMobileHolidayByDate,
    getDateOfFixedHoliday,
    getDateOfMobileHoliday,
    getFixedNamesByDate,
    getMobileNamesByDate,
    getAllNamesByDate,
    getAllHolidaysByDate,
    searchHolidayByName,
    selectFromSearchResults,
};
