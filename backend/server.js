const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');


app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
// Getting all the products for a given user
userRoutes.route('/show-products').post(function(req, res) {
    console.log('printing req');
    console.log(req.data);
    let pro = new Product(req.body);

    Product.find({vendor_name: req.body.vendor_name})
        .then(pro => {
            res.status(200).json({pro});
        })
        .catch(err => {
            res.status(400).send('Error');
        })
       
});
// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    
    console.log(user)
    
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).json('Error');
        });
});

// Adding a new product
userRoutes.route('/add-product').post(function(req, res) {
    let pro = new Product(req.body);
    
    console.log(pro)
    
    pro.save()
        .then(pro => {
            res.status(200).json({pro});
        })
        .catch(err => {
            res.status(400).json('Error');
        });
});
// login a user
userRoutes.route('/login').post(function(req, res) {
    let user = new User(req.body);
    
    // console.log(user);
    console.log("hey checking username");
    User.findOne({username: req.body.username, password: req.body.password})
        .then(user => {
            res.status(200).json({user});
        })
        .catch(err => {
            res.status(400).send('Error');
        })
}); 
// removing a user
userRoutes.route('/remove').post(function(req, res) {
    let user = new User(req.body);
    
    console.log(user)
    user.remove({ _id: req.body.id }, function(err) {
        if (!err) {
                message.type = 'notification!';
        }
        else {
                message.type = 'error';
        }
    });
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});


//user.find()//res.data.length
//localStorage.setItem("x",JSON.stringify(user)) 
//y=JSON.parse(localStorage.getItem("x"))