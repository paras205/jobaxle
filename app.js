const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const userRoutes = require('./routes/user');
const employerRoutes = require('./routes/empolyer');
const seekerRoutes = require('./routes/seeker');
const jobController = require('./routes/jobs');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/employer', employerRoutes);
app.use('/api/v1/seeker', seekerRoutes);
app.use('/api/v1/jobs', jobController);

module.exports = app;
