const mongoose = require('mongoose');

let stuScheme = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    Age : {
        type: Number,
        required : true
    },
    DOB : {
        type: Number,
        required : true
    },
    Mobile : {
        type : Number,
        required : true
    },
    Comment : {
        type : String
    }

});
mongoose.model('Student', stuScheme);