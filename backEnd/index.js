const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user'); //this refers to the structure for user ojects
const Post = require('./models/post');
const Comment = require('./models/comment');
const port = 5000; //set server port

//connect to db

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/conference-app?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // connect to above
  .then(() => console.log('DB connected!')) //success message
  .catch(err => { //error catch
    console.log(`DBConnectionError: ${err.message}`); //error message
  });

//test the connectivity
const db = mongoose.connection; // checks for connection
db.on('error', console.error.bind(console, 'connection error:')); //error message
db.once('open', function () { // on open do this once
  console.log('We are connected to mongo db'); // success message
});

//sets request format??
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`); //missed this bit but keep it
  next();//include this to go to the next middleware
});

//including body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // for creating encrypted passwords
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!')) //prints message on load

//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))


//-------------------------------------USERS section-------------------------------------//
//Roys requests

// display users

app.get('/displayUsers', (req, res) => { //create request to show all products within Product
  User.find().then(result => { // finds User db
    res.send(result); //print result
  })
});

// display user by Id
app.get('/viewUser/:id', (req, res) => { //create request to delete a product
  const idParam = req.params.id; //set new reference idParam from last forward slash in request
  const user = req.params.userId;
  User.findOne({ _id: idParam }, (err, productResult) => { //search Product db for id
    if (productResult) { //do this if present
      res.send(productResult);
    } else { //if not found do this
      res.send('not found') //no match message
    }
  }).catch(err => res.send(err)); //error e=message
});

// edit/update user
app.patch('/updateUser/:id', (req, res) => {
  const idParam = req.params.id;
  console.log(idParam);
  User.findById(idParam, (err, item) => {
    const hash = bcryptjs.hashSync(req.body.password);
    const updatedUser = {
      username : req.body.username,
      email : req.body.email,
      password : hash,
      photoUrl : req.body.photoUrl
    };
    User.updateOne({ _id: idParam }, updatedUser).then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  }).catch(err => res.send('not found'));
});

// Roy end

// Bella start
//register user
app.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }, (err, result) => {
    if (result) {
      res.send("This email is already taken. Please try another one")
    } else {
      const hash = bcryptjs.hashSync(req.body.password);
      const user = new User({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      if (req.body.photoUrl) {
        user.photoUrl = req.body.photoUrl;
      }

      user.save().then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    }
  });
}); // register user

//login user
app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, result) => {
    if (result) {
      if (bcryptjs.compareSync(req.body.password, result.password)) {
        res.send(result);
      }
      else {
        res.send("Not authorised. Incorrect password")
      }
    }
    else {
      res.send("User not found")
    }
  })
}); // login user

// Bella end

//------------------------------^User Section^----------------------------------------//

//-----------------------------QUESTIONS & ANSWERS (VALE, BELLA)-----------------------------//

//Create a Post (C)RUD
app.post('/writePost', (req, res) => {
  User.findOne({ _id: req.body.userId }, (err, userResult) => {
    if (userResult) {
      const post = new Post({
        _id: new mongoose.Types.ObjectId,
        userId: req.body.userId,
        userName: userResult.username,
        userImage: userResult.photoUrl,
        conferenceId: req.body.conferenceId,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
      });
      post.save().then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    }
  });
});
//Retrieve all POSTS C(R)UD
app.get('/allPost/:conferenceId', (req, res) => {
  Post.find({ conferenceId: req.params.conferenceId }).then(result => {
    res.send(result);
  });
});

//Update post CR(U)D
app.patch('/updatePost/:id', (req, res) => {
  const idParam = req.params.id;
  Post.findById(idParam, (err, post) => {
    post.text = req.body.text;
    post.imageUrl = req.body.imageUrl;

    post.save().then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  }).catch(err => res.send('Not Found'));
});

//Delete post CRU(D)
app.delete('/deletePost/:id', (req, res) => {
  const idParam = req.params.id;
  Post.deleteOne({ _id: idParam }, err => {
    res.send('Post deleted');
  }).catch(err => res.send(err));
});
//----------------------------^POSTS Section^-----------------------------------------//

//-----------------------------COMMENTS (VALE)---------------------------------------//

//Create a COMMENT (C)RUD
app.post('/writeComment', (req, res)=>{
  User.findOne({ _id: req.body.userId }, (err, userResult) => {
    if (userResult){
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId,
        userId: req.body.userId,
        conferenceId: req.body.conferenceId,
        postId: req.body.postId,
        userName: userResult.username,
        userImage: userResult.photoUrl,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
      });
      
      comment.save().then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    }
  });
});


//Retrieve all COMMENTS C(R)UD
app.get('/allComment/:conferenceId/:postId', (req, res) => {
  Comment.find({ postId: req.params.postId }).then(result => {
    res.send(result);
  });
});


//Update COMMENT CR(U)D
app.patch('/updateComment/:id', (req, res)=>{
  const idParam = req.params.id;
  Comment.findById(idParam,(err, comment)=>{
    comment.text= req.body.text;
    comment.imageUrl= req.body.imageUrl;
    post.save().then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  }).catch(err => res.send('Not Found'));
});

//Delete COMMENT CRU(D)
app.delete('/deleteComment/:id', (req, res)=>{
  const idParam = req.params.id;
  Comment.findOne({_id:idParam}, err=>{
    res.send('Comment deleted')
  }).catch(err => res.send(err));
});

//----------------------------^COMMENTS Section^-----------------------------------------//



//note there are no actual users logged this is just a request to test connectivity
