const fs = require('fs');

// const writableStream = fs.createWriteStream('log.txt');
// process.stdin.pipe(writableStream);
const readableSteam = fs.createReadStream('log.txt');

readableSteam.pipe(process.stdout)