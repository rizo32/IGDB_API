const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    API_KEY: process.env.API_KEY,
    WEB_HOOK: process.env.WEB_HOOK
}