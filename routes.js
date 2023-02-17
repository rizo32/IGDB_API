const express = require("express");
const { getAccessToken } = require("./controllers/twitchController");

const router = express.Router();

router.post("/get_access_token", getAccessToken);

module.exports = {
  router,
};