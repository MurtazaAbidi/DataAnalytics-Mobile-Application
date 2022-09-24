const { adminsignup } = require('../services/admin_signup');
const { adminlogin } = require('../services/admin_login');
const { homepage } = require('../services/homepage');
const { dataAnalytics } = require('../services/dataanalytics');
const { profile } = require('../services/profile');
const { changePassword } = require('../services/changePassword');

module.exports.admin_signup = async (req, res) => {
  try {
    const signupDetails = {
      fullname: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    await adminsignup(signupDetails);
    return res.status(200).send('Admin Inserted.');
  } catch (error) {
    return res.status(500).json({ msg: `Unable to register user, due to error ${error.message}` });
  }
};

module.exports.admin_login = async (req, res) => {
  console.log(req.body);
  // console.log(req.body.email);
  // console.log(req.body.password);
  try {
    const loginDetails = {
      email: req.body.email,
      password: req.body.password,
    };

    const token = await adminlogin(loginDetails);
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Expose-Headers', 'date,etag,access-control-allow-origin,access-control-allow-credentials');
    res.cookie('auth', token, { httpOnly: true, sameSite: true });

    return res.header('auth', token).status(200).send('Welcome :)');
  } catch (error) {
    return res.status(500).json({ msg: `Unable to login user, due to error ${error.message}` });
  }
};

module.exports.homepage = async (req, res) => {
  try {
    const data = await homepage();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(`Unable to fetch data due to error: ${error.message}`);
  }
};

module.exports.dataAnalytics = async (req, res) => {
  try {
    const data = await dataAnalytics();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(`Unable to fetch data due to error: ${error.message}`);
  }
};

module.exports.profile = async (req, res) => {
  console.log(req.body);
  try {
    const details = await profile(req.body.uid);
    return res.status(200).json(details);
  } catch (error) {
    return res.status(400).json(`Unable to fetch data due to error: ${error.message}`);
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const changePasswordDetails = {
      uid: req.body.uid,
      password: req.body.password,
      newPassword: req.body.newPassword,
    };

    const uid = await changePassword(changePasswordDetails);
    return res.status(200).json(`Password Change Successful For UID: ${uid}`);
  } catch (error) {
    return res.status(400).json(`Unable to fetch data due to error: ${error.message}`);
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie('auth');
    return res.status(200).json({ msg: 'User succesfully logged out' });
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
};
