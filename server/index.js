const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();
const PORT = 3008;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/admindb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 const url = 'mongodb://localhost:27017';
 dbName= 'admindb';

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('MongoDB connected successfully');

  const adminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  });

  const Admin = mongoose.model('Admin', adminSchema);


  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'karthika8849@gmail.com',
      pass: 'hubnsjawtqsxcpli',
    },
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({ message: 'Email not found' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error.message);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  });

  app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ success: false, message: 'No account with that email address exists' });
        }

        // Generate a reset token
        const token = crypto.randomBytes(20).toString('hex');
        admin.resetPasswordToken = token;
        admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await admin.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'karthika8849@gmail.com',
                pass: 'hubnsjawtqsxcpli',
            },
        });

        const mailOptions = {
            to: admin.email,
            from: 'karthika8849@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://localhost:3000/reset-password/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error during password reset:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
    }
});


  app.post('/resend-email', async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const expiration = Date.now() + 3600000; 

    try {
      const admin = await Admin.findOneAndUpdate(
        { email },
        { resetPasswordToken: token, resetPasswordExpires: expiration }
      );

      if (!admin) {
        return res.status(400).json({ message: 'No account with that email address exists' });
      }

      const mailOptions = {
        to: email,
        from: 'karthika8849@gmail.com',
        subject: 'Password Reset',
        text: `You are receiving this because you have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3000/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (error, _response) => {
        if (error) {
          console.error('There was an error: ', error);
          res.status(500).json({ message: 'Email could not be sent' });
        } else {
          res.status(200).json({ message: 'Password reset email sent successfully' });
        }
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.' });
    }

    try {
      const admin = await Admin.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!admin) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
      }

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      admin.resetPasswordToken = undefined;
      admin.resetPasswordExpires = undefined;

      await admin.save();

      res.json({ message: 'Password has been reset' });
    } catch (error) {
      console.error('Error during password reset:', error.message);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  });

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
    groupLocation: String,
    isDisabled:{
      type: Boolean,
      default: false
    }
  });

  const Group = mongoose.model('Group', groupSchema);

  async function getNextSequence(name) {
    const grpcount = await Counter.findOneAndUpdate(
      { name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return grpcount.seq;
  }

  app.post('/add-group', async (req, res) => {
    const { groupName, groupLeader, subLeader, members, groupLocation, isDisabled } = req.body;

    try {
      const grpid = await getNextSequence('groupID');
      const newGroup = new Group({
        groupID: `CRDG${grpid.toString().padStart(3, '100')}`,
        groupName,
        groupLeader,
        subLeader,
        members,
        groupLocation,
        isDisabled,
      });

      await newGroup.save();
      res.status(200).json({ message: 'Group added successfully' });
    } catch (error) {
      console.error('Error adding group:', error);
      res.status(500).json({ message: 'Failed to add group' });
    }
  });


app.get('/getagents',async (req,res) => {
  try{
    const agents =await Agent.find();
    res.json(agents);
  } catch(err){
    res.status(500).json({message: err.message});
  }
});

const agentSchema = new mongoose.Schema({
  agentID: String,
  firstName: String,
  lastName: String,
  contactnumber: String,
  pannumber: String,
  dateofbirth: String,
  gender: String,
  emailid: String,
  maritalstatus: String,
  totalexperience: String,
  highesteducation: String,
});

const Agent = mongoose.model('Agent', agentSchema);

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

app.get('/getgroups', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const groups = await db.collection('groups').find({ isDisabled: { $ne: true } }).toArray();
    client.close();
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add-agent', async (req, res) => {
  const {
    firstName,
    lastName,
    contactnumber,
    pannumber,
    dateofbirth,
    gender,
    emailid,
    maritalstatus,
    totalexperience,
    highesteducation,
  } = req.body;

  try {
    const id = await getNextSequence('agentId');
    const newAgent = new Agent({
      agentID: `CRDE${id.toString().padStart(3, '100')}`, // Generate the ID
      firstName,
      lastName,
      contactnumber,
      pannumber,
      dateofbirth,
      gender,
      emailid,
      maritalstatus,
      totalexperience,
      highesteducation,
    });

    await newAgent.save();
    res.status(200).json({ message: 'Agent added successfully' });
  } catch (error) {
    console.error('Error adding agent:', error);
    res.status(500).json({ message: 'Failed to add agent' });
  }
});

// Edit agent
app.put('/update-agent/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedAgent = await Agent.findByIdAndUpdate(id, updateData, { new: true });
    if (updatedAgent) {
      res.status(200).json({ message: 'Agent updated successfully', updatedAgent });
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (error) {
    console.error('Error updating agent:', error);
    res.status(500).json({ message: 'Failed to update agent' });
  }
});

// Delete agent
app.delete('/agents/:id', async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).send();
    }
    res.send(agent);
  } catch (error) {
    res.status(500).send(error);
  }
});

const applicationschema = new mongoose.Schema({
  applicationID:String,
  appStatus: String,
  groupID: String,
  groupName:String,
  groupLeader:{
    name: String,
    contactNumber:String,
  },
  membersCount: Number,
  groupLocation:String,
  panCard: String,
  photos: String,
  CollectionAgent: String,
  location:String,
  loanamount:String,
  loanaccountnumber:String,
  tenure:String,
  interest:String,
  duedate:String,
  groupName: String,

})

const Application = mongoose.model('Application', applicationschema);

async function getNextSequence(name) {
  const appcount = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return appcount.seq;
}

app.post('/add-application', async (req, res) => {
  const {appStatus, groupID, groupName, groupLeader, members, groupLocation, panCard, photos, collectionAgent, loanamount, loanaccountnumber, tenure, interest, duedate, bankPassBook } = req.body;
  try {
    const appid = await getNextSequence('applicationID');
    const newApplication = new Application({
    applicationID: `CRDA${appid.toString().padStart(3, '100')}`, 
    appStatus,
    groupID,
    groupName,
    groupLeader,
    members,
    groupLocation,
    panCard,
    photos,
    collectionAgent,
    loanamount,
    loanaccountnumber,
    tenure,
    interest,
    duedate,
    bankPassBook,
    });
  
    await newApplication.save();
    res.status(200).json({ message: 'Application added successfully' });
  } catch (error) {
    console.error('Error adding Application:', error);
    res.status(500).json({ message: 'Failed to add Application' });
  };
});

app.put('/update-application/:id', async (req, res) => {
  try {
      const { appStatus, collectionAgent, loanaccountnumber, tenure, interest, duedate, bankPassBook } = req.body;

      // Check for missing fields
      if (!appStatus || !collectionAgent || !loanaccountnumber || !tenure || !interest || !duedate || !bankPassBook) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      // Update the application
      const updatedApplication = await Application.findByIdAndUpdate(
          req.params.id,
          {
              $set: {
                  appStatus: appStatus,
                  collectionAgent: collectionAgent,
                  loanaccountnumber: loanaccountnumber,
                  tenure: tenure,
                  interest: interest,
                  duedate: duedate,
                  bankPassBook: bankPassBook,
              }
          },
          { new: true }
      );

      if (!updatedApplication) {
          return res.status(404).json({ message: "Application not found" });
      }

      res.json({
          message: "Application updated successfully",
          updatedApplication
      });
  } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ message: "An error occurred", error });
  }
});





app.get('/getapplication', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const profileschema = new mongoose.Schema({
  name:String,
  empid:String,
  emailid:String,
  contactnumber:String,
  baselocation:String,
});  
      
const Profile = mongoose.model('Profile', profileschema);


app.post('/add-profile', async (req, res) => {
  const {name, empid, emailid, contactnumber, baselocation,} = req.body;

  const newProfile = new Profile({
    name,
    empid,
    emailid,
    contactnumber,
    baselocation,
  });
          
  try {
    await newProfile.save();
    res.status(200).json({ message: 'profile added successfully' });
  } catch (error) {
    console.error('Error adding profile:', error);
    res.status(500).json({ message: 'Failed to add profile' });
  }

  app.get('/getprofile', async (req, res) => {
    try { 
      const profiles = await Profile.find();
      res.json(profiles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    });
  });

  app.get('/getgroups/:id', async (req, res) => {
  const groupId = req.params.id;
  const groupIdPattern = /^[A-Z]{4}\d{3}$/; 

  if (!groupIdPattern.test(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID format' });
  }

    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        
        // Query by the groupID field
        const group = await db.collection('groups').findOne({ groupID: groupId });
        client.close();

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/groups/:id/disable', async (req, res) => {
  const groupId = req.params.id;
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const result = await db.collection('groups').updateOne(
      { groupID: groupId },  // Use groupID for matching
      { $set: { isDisabled: true } }
    );
    client.close();
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json({ message: 'Group disabled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/groups/:id', async (req, res) => {
  try {
    const groupId = await Group.findById(req.params.id);
    if (groupId) {
      res.json(groupId);
    } else {
      res.status(404).json({ error: 'Group not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});