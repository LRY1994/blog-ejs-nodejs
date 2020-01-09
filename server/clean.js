const fs = require('fs');
const CONFIG = require('./config');
const Utils = require('./utils')


Utils.deleteFolder('./public');
if( fs.existsSync(CONFIG.CACHE_PATH) ) {
    fs.unlinkSync(CONFIG.CACHE_PATH);
}
if( fs.existsSync(CONFIG.CSS_PATH_DEV) ) {
    fs.unlinkSync(CONFIG.CSS_PATH_DEV);
}