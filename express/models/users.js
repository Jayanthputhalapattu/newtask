const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    email: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
  
    verified:   {
        type: Boolean,
        default: false
    }
},{timestamps :true});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User)
