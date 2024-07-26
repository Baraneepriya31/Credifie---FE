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
  


  const groupcounterSchema = new mongoose.Schema({
    name: String,
    seq: Number,
  });

  const GroupCounter = mongoose.model('GroupCounter', groupcounterSchema);

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
      groupID: `G.${grpid.toString().padStart(3, '100')}`, 
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

// Counter Schema and Model
// const counterSchema = new mongoose.Schema({
//   name: String,
//   seq: Number,
// });

// const Counter = mongoose.model('Counter', counterSchema);

// // Function to get the next sequence value
// async function getNextSequence(name) {
//   const counter = await Counter.findOneAndUpdate(
//     { name },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );
//   return counter.seq;
// }

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


  
});
