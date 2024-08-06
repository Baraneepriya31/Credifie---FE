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

  // await admin.save();
  // console.log('Admin user created successfully');
  // mongoose.connection.close();
  


  const groupSchema = new mongoose.Schema({
    groupID: String,
    groupName: String,
    groupLeader: {
      name: String,
      contactNumber: String,
      panNumber: String,
    },
    subLeader: {
      name: String,
      contactNumber: String,
      panNumber: String,
    },
    members: [
      {
        name: String,
        contactNumber: String,
        panNumber: String,
      },
    ],
      isDisabled:{
        type: Boolean,
        default: false
      }
  });

   const Group = mongoose.model('Group', groupSchema);

  const counterSchema = new mongoose.Schema({
    name: String,
    seq: Number,
  });

  const Counter = mongoose.model('Counter', counterSchema);

  async function getNextSequence(name) {
    const counter = await Counter.findOneAndUpdate(
      { name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return counter.seq;
  }

  try {
    const grpid = await getNextSequence('groupID');
    const newGroup = new Group({
      groupID: `CRDG${grpid.toString().padStart(3, '100')}`, 
      groupName: 'Example Group',
      groupLeader: {
        name: 'John Doe',
        contactNumber: '1234567890',
        panNumber: 'ABCDE1234F',
      },
      subLeader: {
        name: 'Jane Doe',
        contactNumber: '0987654321',
        panNumber: 'FGHIJ5678K',
      },
      members: [
        {
          name: 'Member 1',
          contactNumber: '1111111111',
          panNumber: 'LMNOP9012Q',
        },
        {
          name: 'Member 2',
          contactNumber: '2222222222',
          panNumber: 'RSTUV3456W',
        },
      ],
    });

    await newGroup.save();
    console.log('Group added successfully');
  } catch (error) {
    console.error('Error adding group:', error);
  } finally {
    mongoose.connection.close();
  }

// // Counter Schema and Model
// const counterSchema = new mongoose.Schema({
//   name: String,
//   seq: Number,
// });

// const Counter = mongoose.model('Counter', counterSchema);

// Function to get the next sequence value
async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

// // Agent Schema and Model
// const agentSchema = new mongoose.Schema({
//   agentID: String,
//   firstName: String,
//   lastName: String,
//   contactnumber: String,
//   pannumber: String,
//   dateofbirth: String,
//   gender: String,
//   emailid: String,
//   maritalstatus: String,
//   totalexperience: String,
//   highesteducation: String,
// });

// const Agent = mongoose.model('Agent', agentSchema);

// try {
//   const id = await getNextSequence('agentId');
//   const newAgent = new Agent({
//     agentID: `CRDE${id.toString().padStart(3, '100')}`,
//     firstName: 'abcde',
//     lastName: 'Doe',
//     contactnumber: '9087654321',
//     pannumber: 'QTVS234560',
//     dateofbirth: '29/07/2002',
//     gender: 'Male',
//     emailid: 'johndoe@gmail.com',
//     maritalstatus: 'Single',
//     totalexperience: '2 years',
//     highesteducation: 'M.Com',
//   });

//   await newAgent.save();
//   console.log('Agent added successfully');
// } catch (error) {
//   console.error('Error adding agent:', error);
// } finally {
//   mongoose.connection.close();
// }


// add loan application

  //  const applicationSchema = new mongoose.Schema({
  //   applicationID: String, 
  //   location:String,
  //   loanamount : String,
  //   loanaccountnumber: String,
  //   tenure:String,
  //   interest:String,
  //   duedate:String,
  // });
  // const Application = mongoose.model('Application', applicationSchema);
  // async function getNextSequence(name) {
  //     const counter = await Counter.findOneAndUpdate(
  //       { name },
  //       { $inc: { seq: 1 } },
  //       { new: true, upsert: true }
  //     );
  //     return counter.seq;
  //   }
  // try {
  //   const appid = await getNextSequence('applicationId');
  //   const newApplication = new Application({
  //   applicationID: `CRDA${appid.toString().padStart(3, '100')}`, 
  //   location:'India',
  //   loanamount:'3,50,000',
  //   loanaccountnumber:'IBFC12345',
  //   tenure:'6 months',
  //   interest:'25%',
  //   duedate:'10-09-2024',
  // });
  //   await newApplication.save();
  //   console.log('Application added successfully');
  // } catch (error) {
  //  console.error('Error adding Application:', error);
  // } finally {
  //  mongoose.connection.close();
  // }


// Define the Profile schema and model
// const profileSchema = new mongoose.Schema({
//   name: String,
//   empid: String,
//   emailid: String,
//   contactnumber: String,
//   baselocation: String,
// });

// const Profile = mongoose.model('Profile', profileSchema);

// Create a new profile instance
// const newProfile = new Profile({
//   name: 'Sandhiya',
//   empid: 'CRDE010',
//   emailid: 'sandhiya@gmail.com',
//   contactnumber: '7890123456',
//   baselocation: 'India',
// });

// // Save the new profile to the database
// try {
//   await newProfile.save();
//   console.log('Profile added successfully');
// } catch (error) {
//  console.error('Error adding Profile:', error);
// } finally {
//  mongoose.connection.close();
// }
});
