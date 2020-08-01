var moment = require("moment");
var SunCalc = require("suncalc");

moment.locale("el");

// Location loc = new Location("37.9794500", "23.7162200");
const latitude = 37.97945;
const longitude = 23.71622;

function getDayInfo(datestr) {
  let date;
  if (datestr === undefined) {
    date = moment();
  } else {
    date = moment(datestr + "00:01", "DD/MM/YYYY HH:mm");
  }

  // get today's sunlight times for Athens
  const times = SunCalc.getTimes(date, latitude, longitude);
  // format sunrise time from the Date object
  const sunriseStr =
    times.sunrise.getHours() + ":" + times.sunrise.getMinutes();
  const sunsetStr = times.sunset.getHours() + ":" + times.sunset.getMinutes();

  getMoonPhaseString(date);

  return {
    nDay: date.date(),
    nMonth: date.month() + 1,
    nYear: date.year(),
    dayOfWeek: date.format("dddd"),
    dayOfMonth: date.format("D"),
    month: date.format("DD/MMMM").split("/")[1],
    year: date.format("YYYY"),
    dayHolidays: null,
    dayFixedHoliday: null,
    dayMobileHoliday: null,
    moonPhase: getMoonPhase(date.year(), date.month() + 1, date.date()),
    sunRiseSet: `Ανατολή: ${sunriseStr}  Δύση: ${sunsetStr}`,
    datestr: date.format("DD/MM/YYYY"),
  };
}

function getMoonPhaseString(date) {
  //29.53058770576
  const mooninfo = SunCalc.getMoonIllumination(date);
  console.log(mooninfo);

  let daysFromNewmoon = Math.floor(29 * mooninfo.phase);

  return `${daysFromNewmoon} ημερών`;
}

function getMoonPhase(year, month, day) {
  var c = (e = jd = b = 0);

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;

  c = 365.25 * year;

  e = 30.6 * month;

  jd = c + e + day - 694039.09; //jd is total days elapsed

  jd /= 29.5305882; //divide by the moon cycle

  console.log(`jd(1) = ${jd}`);
  b = parseInt(jd); //int(jd) -> b, take integer part of jd

  jd -= b; //subtract integer part to leave fractional part of original jd
  console.log(`jd(2) = ${jd}`);

  b = Math.round(jd * 29); //scale fraction from 0-8 and round

  console.log(`b = ${b}`);

  if (b >= 8) {
    b = 0; //0 and 8 are the same so turn 8 into 0
  }
  switch (b) {
    case 0:
      return "new-moon";
      break;
    case 1:
      return "waxing-crescent-moon";
      break;
    case 2:
      return "quarter-moon";
      break;
    case 3:
      return "waxing-gibbous-moon";
      break;
    case 4:
      return "full-moon";
      break;
    case 5:
      return "waning-gibbous-moon";
      break;
    case 6:
      return "last-quarter-moon";
      break;
    case 7:
      return "waning-crescent-moon";
      break;
  }
  // 0 => New Moon
  // 1 => Waxing Crescent Moon
  // 2 => Quarter Moon
  // 3 => Waxing Gibbous Moon
  // 4 => Full Moon
  // 5 => Waning Gibbous Moon
  // 6 => Last Quarter Moon
  // 7 => Waning Crescent Moon

  return b;
}

module.exports = { getDayInfo };
