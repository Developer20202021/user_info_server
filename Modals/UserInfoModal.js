const mongoose = require('mongoose');
const UserInfoScheema = require('./UserInfoSchema');

const UserInfoModal = mongoose.model('userInfo', UserInfoScheema);


module.exports = UserInfoModal;