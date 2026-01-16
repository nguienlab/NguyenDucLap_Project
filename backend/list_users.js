const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config({ path: './backend/.env' }); // Adjust path if running from root

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('--- Connected to DB ---');

    const users = await User.find({});
    
    if (users.length === 0) {
      console.log('No users found in database.');
    } else {
      console.log(`Found ${users.length} users:\n`);
      console.log(String('ROLE').padEnd(10) + String('EMAIL').padEnd(30) + String('NAME'));
      console.log('-'.repeat(60));
      
      users.forEach(user => {
        console.log(
          String(user.role).padEnd(10) + 
          String(user.email).padEnd(30) + 
          String(user.name)
        );
      });
    }

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n--- Done ---');
  }
};

listUsers();
