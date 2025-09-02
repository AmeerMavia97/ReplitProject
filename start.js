// start.js — cPanel Node.js startup file
require('dotenv').config();
require('./dist/server/prod.js'); // NOTE: prod.js, not index.js
