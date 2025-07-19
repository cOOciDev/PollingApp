const express = require("express");
const router = express.Router();
const pollCtrl = require("../controllers/poll.controller");

router.post("/join", pollCtrl.joinGroup);
router.post("/vote", pollCtrl.vote);

module.exports = router;
