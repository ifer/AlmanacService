const getDayInfo = require('../services/dayinfo').getDayInfo;
const util = require('../util/util.js');

// testMoonPhases();

// testMobileHolidays();
// testFixedHolidays();
// testMobileNamedays();
// testFixedNamedays();

// testHolidayService();
// testCalendarService();

// testDayInfo();

// testGetDayMonthOfHoliday();

// testGetNamesByDate();

// testSearchHolidayByName();
testSelectFromSearchResults();

function testGetNamesByDate() {
    var moment = require('moment');

    let holidayService = require('../services/holidayService');

    console.log('fixed holiday names:');
    console.log(holidayService.getFixedNamesByDate(moment('01/07/2020', 'DD/MM/YYYY'))); //['ΑΝΑΡΓΥΡΟΣ', 'ΑΡΓΥΡ', 'ΚΟΣΜΑΣ', ...]
    console.log(holidayService.getFixedNamesByDate(moment('06/12/2020', 'DD/MM/YYYY'))); //['ΝΙΚ', 'NIK']
    console.log(holidayService.getFixedNamesByDate(moment('07/01/2020', 'DD/MM/YYYY'))); //['ΙΩΑΝ', 'ΓΙΑΝ', 'ΠΡΟΔΡ' ... ]

    console.log(holidayService.getFixedNamesByDate(moment('23/04/2020', 'DD/MM/YYYY'))); //['ΓΕΩΡΓ', 'ΓΙΩΡΓ', 'ΓΩΓΩ', ... ]
    console.log(holidayService.getFixedNamesByDate(moment('23/04/2021', 'DD/MM/YYYY'))); //[]
    console.log(holidayService.getFixedNamesByDate(moment('03/05/2021', 'DD/MM/YYYY'))); //['ΓΕΩΡΓ', 'ΓΙΩΡΓ', 'ΓΩΓΩ', ... ]

    console.log('mobile holiday names:');
    console.log(holidayService.getMobileNamesByDate(moment('19/04/2020', 'DD/MM/YYYY'))); //'ΑΝΑΣΤ', 'ΤΑΣ', 'ΛΑΜΠ', '
    console.log(holidayService.getMobileNamesByDate(moment('07/03/2020', 'DD/MM/YYYY'))); //['ΘΕΟΔ', 'ΘΟΔ', 'THEOD', 'THOD']
    console.log(holidayService.getMobileNamesByDate(moment('24/04/2020', 'DD/MM/YYYY'))); //['ΖΩΗ', 'ZOI', 'ZOH']
    console.log(holidayService.getMobileNamesByDate(moment('23/04/2020', 'DD/MM/YYYY'))); //[]
    console.log(holidayService.getMobileNamesByDate(moment('03/05/2021', 'DD/MM/YYYY'))); //[]

    console.log('all holiday names:');
    console.log(holidayService.getAllNamesByDate(moment('24/04/2020', 'DD/MM/YYYY'))); // ['ΕΛΙΣΑΒΕΤ', 'ΕΛΛΗ', 'ELISAVET', ... , 'ΖΩΗ', 'ZOI', 'ZOH', ..]
}

function testGetDayMonthOfHoliday() {
    let holidayService = require('../services/holidayService');

    console.log('fixed holidays:');
    console.log(
        holidayService
            .getDateOfFixedHoliday('Βαρβάρας μεγαλομάρτυρος, Ιωάννου Δαμασκηνού,  Κασσιανού οσίου κυπρίου')
            .format('DD/MM/YYYY')
    ); // 04/12/YYYY
    console.log(
        holidayService.getDateOfFixedHoliday('Ιωάννου του Ευαγγελιστού, Αρσενίου μεγάλου.').format('DD/MM/YYYY')
    ); // 08/05/YYYY
    console.log(holidayService.getDateOfFixedHoliday('Γεωργίου του Τροπαιοφόρου', 2020).format('DD/MM/YYYY')); // 23/04/2020
    console.log(holidayService.getDateOfFixedHoliday('Γεωργίου του Τροπαιοφόρου', 2021).format('DD/MM/YYYY')); // 03/05/2021
    console.log('mobile holidays:');
    console.log(holidayService.getDateOfMobileHoliday('Γεωργίου του Τροπαιοφόρου', 2020).format('DD/MM/YYYY')); // 23/04/2020
    console.log(holidayService.getDateOfMobileHoliday('Γεωργίου του Τροπαιοφόρου', 2021).format('DD/MM/YYYY')); // 03/05/2020
    console.log(holidayService.getDateOfMobileHoliday('Αγ.Θεοδώρου Τήρωνος', 2020).format('DD/MM/YYYY')); // 07/03/2020

    console.log(holidayService.getDateOfMobileHoliday('Καθαρά Δευτέρα', 2020).format('DD/MM/YYYY')); // 02/03/2020
    console.log(holidayService.getDateOfMobileHoliday('ΤΟ ΑΓΙΟΝ ΠΑΣΧΑ', 2020).format('DD/MM/YYYY')); // 19/04/2020
    console.log(holidayService.getDateOfMobileHoliday('ΑΓΙΟΥ ΠΝΕΥΜΑΤΟΣ', 2020).format('DD/MM/YYYY')); // 08/06/2020
    console.log(holidayService.getDateOfMobileHoliday('ΤΟ ΑΓΙΟΝ ΠΑΣΧΑ', 2021).format('DD/MM/YYYY')); // 02/05/2020
}

function testDayInfo() {
    console.log(getDayInfo('07/01/2020'));
    console.log(getDayInfo('06/12/2020'));
    console.log(getDayInfo('23/02/2020'));
    console.log(getDayInfo('02/03/2020'));
    console.log(getDayInfo('19/04/2020'));
    console.log(getDayInfo('23/04/2020'));
    console.log(getDayInfo('08/06/2020'));
    console.log(getDayInfo('23/04/2021'));
    console.log(getDayInfo('03/05/2021'));

    util.printMemoryUsage();
}

function testCalendarService() {
    var moment = require('moment');
    // moment.locale('el');

    let calendarService = require('./services/calendarService');
    // for (let i = 2020; i < 2099; i += 5) {
    //     console.log(`${i}: ${calendarService.getEasterByYear(i).format('DD/MM/YYYY')}`);
    // }

    console.log('ΑΓ.ΓΕΩΡΓΙΟΥ 2020: ' + calendarService.getStGeorgeByYear(2020).format('DD/MM/YYYY')); //Must be 23/04/2020
    console.log('ΑΓ.ΓΕΩΡΓΙΟΥ 2022: ' + calendarService.getStGeorgeByYear(2022).format('DD/MM/YYYY')); //Must be 25/04/2022
    console.log('ΑΓ.ΓΕΩΡΓΙΟΥ 2024: ' + calendarService.getStGeorgeByYear(2024).format('DD/MM/YYYY')); //Must be 06/05/2024
}

function testHolidayService() {
    var moment = require('moment');
    // moment.locale('el');

    holidayService = require('../services/holidayService');

    let stJohnDay = moment({ day: 7, month: 0, year: 2020 });
    console.log(holidayService.getFixedHolidayByDate(stJohnDay));

    // let easter = moment({ day: 19, month: 3, year: 2020 });
    let date1 = moment('27/03/2020', 'DD/MM/YYYY');
    console.log(holidayService.getMobileHolidayByDate(date1));
    let date0 = moment('19/04/2020', 'DD/MM/YYYY');
    console.log(holidayService.getMobileHolidayByDate(date0));
    let date2 = moment('07/06/2020', 'DD/MM/YYYY');
    console.log(holidayService.getMobileHolidayByDate(date2));
    // console.log(date.format());
}

function testFixedNamedays() {
    fixedNameMap = require('../data/namedays').fixedNameMap;

    console.log('get  St.JOHN holiday: ' + fixedNameMap.get('0701'));
    console.log('get St. EIRINI holiday: ' + fixedNameMap.get('0505'));
    console.log('get fixed holidays number: ' + fixedNameMap.size);
    console.log('check existence of key 7: ' + fixedNameMap.has('0612'));

    // iterate
    fixedNameMap.forEach((value, key) => {
        console.log(`key:${key} value: ${value} names size: ${value.length}`);
    });
}

function testMobileNamedays() {
    mobileNameMap = require('../data/namedays').mobileNameMap;

    console.log('get EASTER holiday: ' + mobileNameMap.get(0));
    console.log('get THEODORE holiday: ' + mobileNameMap.get(-43));
    console.log('get mobile holidays number: ' + mobileNameMap.size);
    console.log('check existence of key 7: ' + mobileNameMap.has(7));

    // iterate
    mobileNameMap.forEach((value, key) => {
        console.log(`key:${key} value: ${value} `);
    });
}

function testMobileHolidays() {
    mobileHolMap = require('../data/holidays').mobileHolMap;

    console.log('get EASTER holiday: ' + mobileHolMap.get(0));
    console.log('get CLEAN MONDAY holiday: ' + mobileHolMap.get(-48));
    console.log('get mobile holidays number: ' + mobileHolMap.size);
    console.log('check existence of key 50: ' + mobileHolMap.has(50));

    // iterate
    mobileHolMap.forEach((value, key) => {
        console.log(`key:${key} value: ${value} `);
    });
}

function testFixedHolidays() {
    fixedHolMap = require('../data/holidays').fixedHolMap;

    console.log('get St.JOHN holiday: ' + fixedHolMap.get('0701'));
    console.log('get St NIKOLAS holiday: ' + fixedHolMap.get('0612'));
    console.log('get fixed holidays number: ' + fixedHolMap.size);
    console.log('check existence of key 50: ' + fixedHolMap.has('0601'));

    // iterate
    let n = 0;
    let max = 10;
    for (let item of fixedHolMap) {
        console.log(`key:${item[0]} value: ${item[1]}`);
        n++;
        if (n == 10) break;
    }
}

function testSearchHolidayByName() {
    const holidayService = require('../services/holidayService');
    let resultsMap = holidayService.searchHolidayByName('Θεοδώρου', 2020);

    console.log(resultsMap);
}

function testSelectFromSearchResults() {
    const holidayService = require('../services/holidayService');
    let resultsMap = holidayService.searchHolidayByName('Θεοδώρου', 2020);

    let date = holidayService.selectFromSearchResults('Αγ.Θεοδώρου Τήρωνος', 2020, resultsMap);
    console.log(date.format('dddd DD/MM/YYYY')); // 07/03/2020

    date = holidayService.selectFromSearchResults('Θεοδώρου του Τριχινά, Ζακχαίου αποστόλου', 2020, resultsMap);
    console.log(date.format('dddd DD/MM/YYYY')); //20/04/2020

    resultsMap = holidayService.searchHolidayByName('Θωμά', 2020);

    date = holidayService.selectFromSearchResults('Κυριακή τού Θωμά', 2020, resultsMap);
    console.log(date.format('dddd DD/MM/YYYY')); //26/04/2020

    date = holidayService.selectFromSearchResults('Θωμά αποστόλου, Κενδέου οσίου του θαυματουργού', 2020, resultsMap);
    console.log(date.format('dddd DD/MM/YYYY')); //06/10/2020

    resultsMap = holidayService.searchHolidayByName('Γεωργίου', 2020);
    date = holidayService.selectFromSearchResults('Γεωργίου του Τροπαιοφόρου', 2020, resultsMap);
    console.log(date.format('dddd DD/MM/YYYY')); // 23/04/2020

    resultsMap = holidayService.searchHolidayByName('Γεωργίου', 2021);
    date = holidayService.selectFromSearchResults('Γεωργίου του Τροπαιοφόρου', 2021, resultsMap);
    console.log(date.format('dddd DD/MM/YYYY')); // 03/05/2021
}

function testMoonPhases() {
    var moment = require('moment');
    const moonPhases = require('../services/MoonPhases');

    let testDate = moment('04/08/2020', 'DD/MM/YYYY');
    // console.log(testDate.format());
    let mp = moonPhases.getMoonPhaseEvent(testDate);

    console.log(mp);

    // console.log(getDayInfo('01/10/2020'));
}
