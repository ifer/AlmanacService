// const getDayInfo = require('./dayinfo').getDayInfo;

// testMobileHolidays();
// testFixedHolidays();
// testMobileNamedays();
testFixedNamedays();

function testFixedNamedays() {
    fixedNameMap = require('./namedays').fixedNameMap;

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
    mobileNameMap = require('./namedays').mobileNameMap;

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
    mobileHolMap = require('./holidays').mobileHolMap;

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
    fixedHolMap = require('./holidays').fixedHolMap;

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

function testMoonPhases() {
    var moment = require('moment');
    const moonPhases = require('./MoonPhases');

    let testDate = moment('04/08/2020', 'DD/MM/YYYY');
    let mp = moonPhases.getMoonPhaseEvent(testDate);

    console.log(mp);

    console.log(getDayInfo('01/10/2020'));
}
