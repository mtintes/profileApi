var dotenv = require('dotenv');
var cfg = {};

dotenv.config({path: '.env'});

cfg.profileDbPath = process.env.PROFILE_DB_PATH;

module.exports = cfg;
