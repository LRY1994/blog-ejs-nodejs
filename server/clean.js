const fs = require('fs');
const CONFIG = require('./config');
const Utils = require('./utils')


Utils.deleteFolder('./public');
fs.unlinkSync(CONFIG.CACHE_PATH);