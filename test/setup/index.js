'use strict';

require('./chai');

const fs = require('fs');
const dirs = fs.readdirSync(__dirname); // eslint-disable-line no-sync

dirs.forEach((file) => {
  if (file.indexOf('.spec.js') > -1) {
    require(`./${file}`); // eslint-disable-line global-require
  }
});
