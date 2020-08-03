const fs = require('fs');
const readline = require('readline');
var lineReader = require('line-reader');

var linesTotal = 0;

var rl = readline.createInterface({
    input: fs.createReadStream('./moondata.in'),
    output: process.stdout,
    terminal: false,
});
rl.on('line', function (line) {
    linesTotal++; // on each linebreak, add +1 to 'linesCount'
});
rl.on('close', function () {
    // console.log(linesCount); // print the result when the 'close' event is called
    // return linesCount;
    writeData();
});

function writeData() {
    let lineNumber = 0;
    const fileout = fs.createWriteStream('./moondata.json', {
        flags: 'w',
    });
    fileout.write('[ \n');

    const readFile = readline.createInterface({
        input: fs.createReadStream('./moondata.in'),
        output: fileout,
        terminal: false,
    });

    readFile
        .on('line', (line) => {
            lineNumber++;
            let lineout = transform(line, lineNumber);
            fileout.write(lineout);
        })
        .on('close', () => {
            fileout.write('] \n');
            fileout.end();
            // console.log(`Created "${this.output.path}"`);
        });
}

function transform(line, lineNumber) {
    // this.output.write(`modified ${line}\n`);
    let props = line.split(',');
    let lineout = '    {';
    lineout += '"year": ' + props[0] + ', ';
    lineout += '"newMoonMonth": ' + props[1] + ', ';
    lineout += '"newMoonDay": ' + props[2] + ', ';
    lineout += '"newMoonEclipseEvent": ' + props[3].replace(/'/g, '"') + ', ';
    lineout += '"fullMoonMonth": ' + props[4] + ', ';
    lineout += '"fullMoonDay": ' + props[5] + ', ';
    lineout += '"fullMoonEclipseEvent": ' + props[6].replace(/'/g, '"');
    if (lineNumber < linesTotal) {
        lineout += '},\n';
    } else {
        lineout += '}\n';
    }
    return lineout;
}
