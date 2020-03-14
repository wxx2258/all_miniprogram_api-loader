const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname, './src/index_request.js'),
    loaders: [
        {
            loader: path.join(__dirname, './lib/all_miniprogram_api-loader.js'),
            options: {
                globalName: 'my'
            }
        }
    ],
    context: {},
    readResource: fs.readFile.bind(fs)
}, function(err, res) {
    if (err) {
        console.error('err: ', err);
    }
    console.log('res.result[0: ', typeof res.result[0]);

    fs.writeFile(path.join(__dirname, './dist/index_request.js'), res.result[0], (err) => {
        console.error('err: ', err);
    });
});