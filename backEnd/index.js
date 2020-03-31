const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user.js'); //this refers to the structure for user ojects
const Conference = require('./models/conference.js'); //this refers to the structure for product ojects

const port = 5000; //set server port

//connect to db
const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/conference-app?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // connect to above
.then(()=> console.log('DB connected!')) //success message
.catch(err =>{ //error catch
  console.log(`DBConnectionError: ${err.message}`); //error message
});

//test the connectivity
const db = mongoose.connection; // checks for connection
db.on('error', console.error.bind(console, 'connection error:')); //error message
db.once('open', function() { // on open do this once
  console.log('We are connected to mongo db'); // success message
});

//sets request format??
app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`); //missed this bit but keep it
  next();//include this to go to the next middleware
});

//including body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); // for creating encrypted passwords
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!')) //prints message on load

//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))

//Roys requests

// display users
app.get('/displayUsers', (req,res)=>{ //create request to show all products within Product
  User.find().then(result =>{ // finds User db
  res.send(result); //print result
  })
});

// display user by Id
app.get('/viewUser/:id', (req,res)=>{ //create request to delete a product
  const idParam = req.params.id; //set new reference idParam from last forward slash in request
  const user = req.params.userId;
    User.findOne({_id:idParam},(err, productResult)=>{ //search Product db for id
    if (productResult) { //do this if present
		 res.send(productResult);
	} else { //if not found do this
      res.send('not found') //no match message
    }
  }).catch(err => res.send(err)); //error e=message
});

// edit/update item
app.patch('/updateUser/:id',(req,res)=> {
  const idParam = req.params.id;
  User.findById(idParam,(err,item)=> {
    const updatedUser = {
      username : req.body.username,
  	  email : req.body.email,
  	  password : req.body.password,
  	  imageUrl : req.body.imgUrl
    };
    User.updateOne({_id:idParam}, updatedUser).then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  }).catch(err => res.send('not found'));
});