const { Transform } = require('stream');

const uppercaseWordProcessing = new Transform({
    transform(chunk, encoding, callback) {
        // callback(err, data)
        callback(null, chunk.toString().toUpperCase());
    }
});

module.exports = uppercaseWordProcessing;