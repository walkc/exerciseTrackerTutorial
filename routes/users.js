const router = require('express').Router();
let User = require('../models/user.model');

//route for /users/
router.route('/').get((req,res) => {
    //gets all the users and returns them in json format, or returns an error
    User.find()
        .then(users => res.json(users))
        .catch(err=> res.status(400).json('Error: ' + err));
});

//route for /users/add, this is a post request!
router.route('/add').post((req,res) => {
    //get the username from the request
    const username = req.body.username;
    //create a new User object using this username
    const newUser = new User({username});
    //save the User object to the database
    newUser.save()
        //return user added, or error message upon saving
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error ' + err));
});

//this is standard. just have to export the router
module.exports = router;