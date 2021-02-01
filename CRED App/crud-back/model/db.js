const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/CRUD_NODE", {useNewUrlParser: true, useUnifiedTopology: true} , error => {
    if(error)
    console.log("Error in connecting to DB : " + error);
    else
    console.log("DB connected Successfully...")
});
require('./student.model');