const mongoose = require('mongoose');
const Student = mongoose.model('Student');

const getAllStudents = (req, res) => {
    let data = {};
    Student.find((err, doc) => {
        if(err){
            console.log("Error occured while get students list : " + err);
            data = {"Sorry" : "Onum Illa..."};
        }else{
            data = doc;
        }
        return res.json(data);
    });
}

const postStudent = (req, res) => {
    // req.body = {
    //     fullName : "Ashok Selvaraj",
    //     Age : 25,
    //     DOB : 687646464655464,
    //     Mobile : 9514953223,
    //     Comment : "I am good boy"
    // }
    let studentObj = new Student();
    studentObj.fullName = req.body.fullName;
    studentObj.Age = req.body.Age;
    studentObj.DOB = req.body.DOB;
    studentObj.Mobile = req.body.Mobile;
    studentObj.Comment = req.body.Comment;
    let data = {};
    studentObj.save((err, doc) => {
        if(err){
            console.log("Error occured during Post Student : " + err);
           data =  {
                err : err
            }
        }
        else{
            data = doc
        }
        res.json(data);
    })
}

const deleteStudentById = (req, res) => {
    Student.findByIdAndDelete(req.body._id, (err, doc) => {
        if(err){
            console.log("Error occured during Delete Student : " + err);
            data = {
                err
            }
        }else{
            data = doc;
        }
        return res.json(data);
    });
}

const updateStudentById = (req, res) => {
    Student.findByIdAndUpdate(req.body._id, req.body, { new: true, useFindAndModify:false }, (err, doc) => {
        if(err){
            console.log("Error occured during Delete Student : " + err);
            data = {
                err
            }
        }else{
            data = doc;
        }
        return res.json(data);
    });
}

module.exports = {
    getAllStudents,
    postStudent,
    updateStudentById,
    deleteStudentById
}