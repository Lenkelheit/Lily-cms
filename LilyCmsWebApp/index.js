var connect = require('connect');
var gzipStatic = require('connect-gzip-static');
var app = connect();

var options = {
    enableBrotli: true,
    index: "index.html",
    orderPreference: ['br']
};
app.use(gzipStatic("/", options));
app.listen(process.env.PORT);
