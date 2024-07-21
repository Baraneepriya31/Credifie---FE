const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/admindb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', async function() {
  console.log('MongoDB connected successfully');

  const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

  const Admin = mongoose.model('Admin', adminSchema);

  const email = 'sandhiyasundharesan29@gmail.com'; 
  const plainPassword = 'Password@123'; 

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  const admin = new Admin({
    email: email,
    password: hashedPassword,
  });

  await admin.save();
  console.log('Admin user created successfully');
  mongoose.connection.close();
});