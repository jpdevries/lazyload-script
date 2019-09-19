var fs = require('fs');
var dist = './dist';

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}

console.log('wow man!');
