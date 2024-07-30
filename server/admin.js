const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/admindb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', async function() {
  console.log('MongoDB connected successfully');

  // const adminSchema = new mongoose.Schema({
  //   email: String,
  //   password: String,
  // });

  // const Admin = mongoose.model('Admin', adminSchema);

  // const email = 'karthika8849@gmail.com'; 
  // const plainPassword = 'Password@123'; 

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(plainPassword, salt);

  // const admin = new Admin({
  //   email: email,
  //   password: hashedPassword,
  // });

  // await group.save();
  // console.log('Admin user created successfully');
  // mongoose.connection.close();
  


// Group Schema and Model
// const groupSchema = new mongoose.Schema({
//   groupName: String,
//   groupLeader: {
//       name: String,
//       contactNumber: String,
//       panNumber: String,
//   },
//   subLeader: {
//       name: String,
//       contactNumber: String,
//       panNumber: String,
//   },
//   members: [
//       {
//           name: String,
//           contactNumber: String,
//           panNumber: String,
//       },
//   ],
// });

// const Group = mongoose.model('Group', groupSchema);

// // Create a new group instance
// const newGroup = new Group({
//   groupName: 'Example Group',
//   groupLeader: {
//       name: 'John Doe',
//       contactNumber: '1234567890',
//       panNumber: 'ABCDE1234F',
//   },
//   subLeader: {
//       name: 'Jane Doe',
//       contactNumber: '0987654321',
//       panNumber: 'FGHIJ5678K',
//   },
//   members: [
//       {
//           name: 'Member 1',
//           contactNumber: '1111111111',
//           panNumber: 'LMNOP9012Q',
//       },
//       {
//           name: 'Member 2',
//           contactNumber: '2222222222',
//           panNumber: 'RSTUV3456W',
//       },
//   ],
// });

// // Save the group to the database
// try {
//   await newGroup.save();
//   console.log('Group created successfully');
// } catch (error) {
//   console.error('Error creating group:', error);
// } finally {
//   mongoose.connection.close();
// }


//add agentschema//

// const agentSchema = new mongoose.Schema({
//   firstName : String,
//   lastName : String,
//   contactnumber : String,
//   pannumber : String,
//   dateofbirth : String,
//   gender : String,
//   emailid : String,
//   maritalstatus : String,
//   totalexperience: String,
//   highesteducation: String,

// });

// const Agent = mongoose.model('Agent', agentSchema);

// const newAgent = new Agent({
//   firstName: 'John',
//   lastName : 'Doe',
//   contactnumber : '9087654321',
//   pannumber : 'QTVS234560',
//   dateofbirth : '29/07/2002',
//   gender : 'Male',
//   emailid : 'johndoe@gmail.com',
//   maritalstatus : 'Single',
//   totalexperience : '2 years',
//   highesteducation : 'M.Com',
// });
// try {
//      await newAgent.save();
//      console.log('Agent added successfully');
//    } catch (error) {
//     console.error('Error adding agent:', error);
//    } finally {
//     mongoose.connection.close();
//    }

   //add loan application//

  //  const loanSchema = new mongoose.Schema({
  //   location:String,
  //   loanamount : String,
  //   loanaccountnumber: String,
  //   tenure:String,
  //   interest:String,
  //   duedate:String,
  // });
  // const Loan = mongoose.model('Agent', loanSchema);

  // const newLoan = new Loan({
  //   location:'India',
  //   loanamount:'2,50,000',
  //   loanaccountnumber:'IBFC12345',
  //   tenure:'15%',
  //   interest:'15%',
  //   duedate:'15-09-2024',
  // });
  // try {
  //   await newLoan.save();
  //   console.log('Loan added successfully');
  // } catch (error) {
  //  console.error('Error adding Loan:', error);
  // } finally {
  //  mongoose.connection.close();
  // }
     //add profile//

     const profileSchema = new mongoose.Schema({
      name:String,
      empid:String,
      emailid:String,
      contactnumber:String,
      baselocation:String,
    });
    const Profile = mongoose.model('Profile', profileSchema);
  
    const newProfile = new Profile({
      name:'Sandhiya',
      empid:'CRDE010',
      emailid:'sandhiya@gmail.com',
      contactnumber:'7890123456',
      baselocation:'India',
    });
    try {
      await newProfile.save();
      console.log('profile added successfully');
    } catch (error) {
     console.error('Error adding profile:', error);
    } finally {
     mongoose.connection.close();
    }

});