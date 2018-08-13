const app = require('./app.js');

const port = (process.env.PORT | 3002);

app.listen(port);
console.log('');
console.log('Listening on port ' + port);
console.log('');
