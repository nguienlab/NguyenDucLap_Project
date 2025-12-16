const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

// Load env vars
dotenv.config({ path: `${__dirname}/.env` });

const createAdmin = async () => {
  console.log('Connecting to database...');
  await connectDB();
  console.log('Database connected.');

  const adminEmail = 'admin@example.com';
  const adminPassword = 'password123';

  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`Admin user with email ${adminEmail} already exists.`);
      // Optionally, update the password
      // existingAdmin.password = adminPassword;
      // await existingAdmin.save();
      // console.log('Admin password has been updated.');
    } else {
      console.log('Creating admin user...');
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('Admin user created successfully!');
      console.log(`- Email: ${adminEmail}`);
      console.log(`- Password: ${adminPassword}`);
    }

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    console.log('Disconnecting from database...');
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
};

createAdmin();
