const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //only has one field
    username: {
        //these are all validations to the username
        type: String,
        required: true,
        unique: true,
        //trims white space off the end
        trim: true,
        minlength: 3
    },
},{
    //automatically creates fields for when created and modified
    timestamps: true,
});

//'User' is name we'll use
const User = mongoose.model('User', userSchema);

module.exports = User;