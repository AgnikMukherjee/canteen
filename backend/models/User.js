const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength : [5 , 'username must be minimum 5 letters'],
    },
    address: {
        type: String,
        required: true,
        minlength : [10 , 'address must contain streat no, area , city , pincode'],
    },
    email: {
        type: String,
        required: true,
        unique : true,
        minlength : [10 , 'email must be minimum 10 letters'],
    },
    password: {
        type: String,
        required: true,
        minlength : [5 , 'password must be minimum 5 letters'],
    }
});




module.exports = mongoose.model('User', UserSchema);