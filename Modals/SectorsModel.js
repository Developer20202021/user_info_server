const mongoose = require('mongoose');
const SectorsScheema = require('./SectorsSchema');

const SectorsModel = mongoose.model('sector', SectorsScheema);


module.exports = SectorsModel;