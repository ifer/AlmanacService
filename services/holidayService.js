const fixedNameMap = require('../data/namedays').fixedNameMap;
const mobileNameMap = require('../data/namedays').mobileNameMap;
const mobileHolMap = require('../data/holidays').mobileHolMap;
const fixedHolMap = require('../data/holidays').fixedHolMap;

const calendarService = require('./calendarService');

function getFixedHolidayByDate(date) {
    let daymon = date.format('DDMM');

    return fixedHolMap.get(daymon);
}

function getMobileHolidayByDate(date) {
    let easter = calendarService.getEasterByYear(date.year());
    let offset = date.diff(easter, 'days');
    console.log(`easter=${easter.format()} date=${date.format()}, offset=${offset}`);

    return mobileHolMap.get(offset);
}

module.exports = {
    getFixedHolidayByDate,
    getMobileHolidayByDate,
};
