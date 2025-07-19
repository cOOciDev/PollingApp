const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/auth");
const adminCtrl = require("../controllers/admin.controller");

router.use(adminAuth);

router.post("/groups", adminCtrl.createGroup);
router.post("/polls", adminCtrl.createPoll);
router.get("/polls/:groupName", adminCtrl.getPolls);

module.exports = router;
