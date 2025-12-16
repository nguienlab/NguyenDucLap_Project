const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

// Load models
const Vehicle = require('./models/Vehicle');
const User = require('./models/User');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Read JSON files
const vehicles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/vehicles.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Vehicle.create(vehicles);
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Vehicle.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
    console.log('Please use the -i or -d flag');
    process.exit();
}
