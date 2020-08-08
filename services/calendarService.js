var moment = require('moment');
moment.locale('el');

function getEasterByYear(year) {
    let v, v1, v2, v3, v4, v5;

    //Initialize easter calendar to the (spring) vernal equinox (at noon)
    let easter = moment({ day: 22, month: 2, year: year });

    v1 = year % 4;
    v2 = year % 7;
    v3 = year % 19;
    v4 = (v3 * 19 + 15) % 30;
    v5 = (2 * v1 + 4 * v2 + 6 * (v4 + 1)) % 7;
    v = v4 + v5 + 13;

    easter.add(v, 'days');

    return easter;
}

function getStGeorgeByYear(year) {
    let easter = getEasterByYear(year);
    let StGeorge = moment('23/04/' + year, 'DD/MM/YYYY');
    if (StGeorge.isSameOrBefore(easter)) {
        StGeorge = easter.add(1, 'days');
    }

    return StGeorge;
}

module.exports = {
    getEasterByYear,
    getStGeorgeByYear,
};
