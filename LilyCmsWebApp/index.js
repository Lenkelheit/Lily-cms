var child_process = require('child_process');
child_process.execSync('npm install connect -g');
child_process.execSync('npm install connect-gzip-static -g');

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
