var moment = require('moment')
var SunCalc = require('suncalc')

moment.locale('el')

// Location loc = new Location("37.9794500", "23.7162200");
const latitude = 37.97945
const longitude = 23.71622

function getDayInfo(datestr) {
    let date
    if (datestr === undefined) {
        date = moment()
    } else {
        date = moment(datestr + ' 12:00', 'DD/MM/YYYY HH:mm')
    }

    // get today's sunlight times for Athens
    const times = SunCalc.getTimes(date, latitude, longitude)
    // format sunrise time from the Date object
    const sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes()
    const sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes()

    // moonPhase(date);
    let testDate = moment('01/08/2020 12:00', 'DD/MM/YYYY HH:mm')
    let mondays = testDate.daysInMonth()

    for (let i = 1; i <= mondays; i++) {
        let moon = SunCalc.getMoonIllumination(testDate)
        console.log(
            `${testDate.format('DD/MM/YYYY')} fraction = ${moon.fraction}, phase = ${moon.phase} angle = ${moon.angle}`
        )
        testDate.add(1, 'days')
    }

    return {
        nDay: date.date(),
        nMonth: date.month() + 1,
        nYear: date.year(),
        dayOfWeek: date.format('dddd'),
        dayOfMonth: date.format('D'),
        month: date.format('DD/MMMM').split('/')[1],
        year: date.format('YYYY'),
        dayHolidays: null,
        dayFixedHoliday: null,
        dayMobileHoliday: null,
        moonPhase: getMoonPhase(date),
        sunRiseSet: `Ανατολή: ${sunriseStr}  Δύση: ${sunsetStr}`,
        datestr: date.format('DD/MM/YYYY'),
    }
}

function Trig2(date) {
    let year = date.year()
    let month = date.month() + 1
    let day = date.date()

    n = Math.floor(12.37 * (year - 1900 + (1.0 * month - 0.5) / 12.0))
    RAD = 3.14159265 / 180.0
    t = n / 1236.85
    t2 = t * t
    as = 359.2242 + 29.105356 * n
    am = 306.0253 + 385.816918 * n + 0.01073 * t2
    xtra = 0.75933 + 1.53058868 * n + (1.178e-4 - 1.55e-7 * t) * t2
    xtra += (0.1734 - 3.93e-4 * t) * Math.sin(RAD * as) - 0.4068 * Math.sin(RAD * am)
    i = xtra > 0.0 ? Math.floor(xtra) : Math.ceil(xtra - 1.0)
    j1 = julday(year, month, day)
    jd = 2415020 + 28 * n + i
    return (j1 - jd + 30) % 30
}

function julday(year, month, day) {
    if (year < 0) {
        year++
    }
    var jy = parseInt(year)
    var jm = parseInt(month) + 1
    if (month <= 2) {
        jy--
        jm += 12
    }
    var jul = Math.floor(365.25 * jy) + Math.floor(30.6001 * jm) + parseInt(day) + 1720995
    if (day + 31 * (month + 12 * year) >= 15 + 31 * (10 + 12 * 1582)) {
        ja = Math.floor(0.01 * jy)
        jul = jul + 2 - ja + Math.floor(0.25 * ja)
    }
    return jul
}

class MoonPhases {
    constructor() {
        this.table = [
            { label: 'new', from: 0, to: 1 },
            { label: 'waxing crescent', from: 1.0001, to: 6.38264692644 },
            { label: 'first quarter', from: 6.38264692645, to: 8.38264692644 },
            { label: 'waxing gibbous', from: 8.38264692645, to: 13.76529385288 },
            { label: 'full', from: 13.76529385289, to: 15.76529385288 },
            { label: 'waning gibbous', from: 15.76529385289, to: 21.14794077932 },
            { label: 'last quarter', from: 21.14794077933, to: 23.14794077932 },
            { label: 'waning crescent', from: 23.14794077933, to: 28.53058770576 },
            { label: 'new', from: 28.53058770577, to: 29.53058770576 },
        ]
    }

    getPhaseLabel(daysnum) {
        // console.log(`daysmum=${daysnum}`);
        let phase
        // phase = this.table.find((obj) => {
        //   console.log(`daysmum=${daysnum} from=${obj.from} to=${obj.to}`);
        //   return daysnum >= obj.from && daysnum <= obj.to;
        // });
        // this.table.forEach((obj) => {
        //   if (daysnum >= obj.from && daysnum <= obj.to) {
        //     phase = obj;
        //   }
        // });
        for (let i = 0; i < this.table.length; i++) {
            console.log(`daysmum=${daysnum} from=${this.table[i].from} to=${this.table[i].to}`)
            if (daysnum >= this.table[i].from && daysnum <= this.table[i].to) {
                return this.table[i].label
            }
        }

        return undefined
    }
}

const moonPhases = new MoonPhases()

function moonPhase(date) {
    let lunardays = 29.53058770576
    let lunarsecs = lunardays * (24 * 60 * 60)

    // console.log(`date=${date}`);

    let dateUtcOffset = date.utcOffset()
    // console.log(`zone=${date.utcOffset()}`);

    let fullMoon2000 = moment('06/01/2000 18:14', 'DD/MM/YYYY HH:mm').utcOffset(dateUtcOffset)
    // console.log(`fullMoon2000=${fullMoon2000}`);

    let diffsecs = date.diff(fullMoon2000, 'seconds')
    // console.log(`diffsecs=${diffsecs}`);

    let currentsecs = diffsecs % lunarsecs
    // If negative number (date before new moon 2000) add $lunarsecs
    if (currentsecs < 0) {
        currentsecs += lunarsecs
    }
    // console.log(`currentsecs=${currentsecs}`);

    // Calculate the fraction of the moon cycle
    let currentfrac = currentsecs / lunarsecs
    // console.log(`currentfrac=${currentfrac}`);

    // Calculate days in current cycle (moon age)
    currentdays = currentfrac * lunardays
    // console.log(`currentdays=${currentdays}`);

    return moonPhases.getPhaseLabel(currentdays)
    // return Math.floor(currentdays);
}

function getMoonPhaseString(date) {
    //29.53058770576
    const mooninfo = SunCalc.getMoonIllumination(date)
    // console.log(mooninfo);

    // let daysFromNewmoon = Math.round(mooninfo.phase * 29);

    return mf
}

function getMoonPhase(date) {
    let year = date.year()
    let month = date.month() + 1
    let day = date.date()

    var c = (e = jd = b = 0)

    if (month < 3) {
        year--
        month += 12
    }

    ++month

    c = 365.25 * year

    e = 30.6 * month

    jd = c + e + day - 694039.09 //jd is total days elapsed

    jd /= 29.5305882 //divide by the moon cycle

    // console.log(`jd(1) = ${jd}`);
    b = parseInt(jd) //int(jd) -> b, take integer part of jd

    jd -= b //subtract integer part to leave fractional part of original jd
    // console.log(`jd(2) = ${jd}`);

    b = jd //scale fraction from 0-8 and round

    // console.log(`b = ${b}`);

    // if (b >= 29) {
    //   b = 0; //0 and 8 are the same so turn 8 into 0
    //   console.log("returning b=0");
    // }

    return b
}

module.exports = { getDayInfo }
