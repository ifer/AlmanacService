const fixedNameMap = require('../data/namedays').fixedNameMap;
const mobileNameMap = require('../data/namedays').mobileNameMap;
const mobileHolMap = require('../data/holidays').mobileHolMap;
const fixedHolMap = require('../data/holidays').fixedHolMap;

const calendarService = require('./calendarService');

function getFixedHolidayByDate(date) {
    const daymon = date.format('DDMM');
    let fh = fixedHolMap.get(daymon);

    const stGeorge = calendarService.getStGeorgeByYear(date.year());
    if (daymon === '2304') {
        if (!date.isSame(stGeorge)) {
            fh = '';
        }
    } else {
        if (date.isSame(stGeorge)) {
            fh = fixedHolMap.get('2304') + ', ' + fh;
        }
    }

    return fh || '';
}

function getMobileHolidayByDate(date) {
    let easter = calendarService.getEasterByYear(date.year());
    let offset = date.diff(easter, 'days');
    // console.log(`easter=${easter.format()} date=${date.format()}, offset=${offset}`);

    return mobileHolMap.get(offset) || '';
}

module.exports = {
    getFixedHolidayByDate,
    getMobileHolidayByDate,
};
