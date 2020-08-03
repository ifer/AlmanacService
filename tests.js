const getDayInfo = require('./dayinfo').getDayInfo;
const moonPhases = require('./MoonPhases');
var moment = require('moment');

// moonPhases.populateMoonPhases();
//
// let testDate = moment('04/08/2020', 'DD/MM/YYYY');
// let mp = moonPhases.getMoonPhaseEvent(testDate);
//
// console.log(mp);

console.log(getDayInfo('01/10/2020'));
