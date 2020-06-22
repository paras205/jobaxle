const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
