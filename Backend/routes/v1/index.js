const express = require("express");
const indexcontroller = require("../../controllers/index");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post('/v1/admin/signup', indexcontroller.admin_signup);
router.post('/v1/admin/login', indexcontroller.admin_login);
router.post('/v1/homepage', auth, indexcontroller.homepage);
router.post('/v1/data_analytics', auth, indexcontroller.dataAnalytics);
router.post('/v1/profile', auth, indexcontroller.profile);
router.post('/v1/changePassword', auth, indexcontroller.changePassword);
router.post('/v1/logout', auth, indexcontroller.logoutUser);

module.exports = router;
