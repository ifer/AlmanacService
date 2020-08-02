const getDayInfo = require('./dayinfo').getDayInfo;
const moonPhases = require('./MoonPhases');
var moment = require('moment');

moonPhases.populateMoonPhases();

let testDate = moment('03/08/2020 12:00', 'DD/MM/YYYY HH:mm');
let mp = moonPhases.getMoonPhaseEvent(testDate);

console.log(mp);

// console.log(getDayInfo("01/10/2020"));
