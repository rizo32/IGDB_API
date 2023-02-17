const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    CLIENT_ID: process.env.client_id,
    CLIENT_SECRET: process.env.client_secret
}