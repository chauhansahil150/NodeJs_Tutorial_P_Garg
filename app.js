const fs = require('fs');
const express = require("express");
const status= require('express-status-monitor')
const app = express();
const port = 8000;
const zlib = require('zlib');



const filePath = './ajit.pdf';


app.use(status());


fs.createReadStream(filePath).pipe(zlib.createGzip().pipe(fs.createWriteStream('./ajit.zip')));
app.get('/', async (req, res) => {
    // const data= await fs.readFile(filePath, 'utf-8', (err, data) => {
    //     if (err) {
    //         console.error('Error occured', err);
    //         return;
    //     }
    // });
    const stream = fs.createReadStream('./ajit.pdf');
    stream.on("data", (chunk) => res.write(chunk));
    stream.on("end", () => res.end);
})



app.listen(port, () => console.log("server started"));