const { Readable, Writable } = require('stream');

const readableStream = new Readable({
    objectMode: true,
    highWaterMark: 2, // threshold value 2 bytes if using ObjectMode then 2 objects
    // read:function() {} or
    read() {}
});

// const writableStream = new Writable({
//     write(s) {
//         // console.log('writing:', s.toString());
//         console.log('writing:', s);
//     }
// });

readableStream.on('data', (chunk) => {
    console.log('data: ', chunk);
    // console.log('data: ', chunk.toString);
    // writableStream.write(chunk);

});

// readableStream.push("hello");// gives Buffer in hexdec
// console.log(readableStream.push("hello")); // gives true if uses less than highWaterMark else false
console.log(
    readableStream.push({
        name: 'Sahil'
    })
);