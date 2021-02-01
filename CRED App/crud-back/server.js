const express = require('express');
require('./model/db');
var cors = require('cors');

let tempUrl = "/";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/students', require('./students/studentsOp'));

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html'});
    res.write("<h3> Current route \"" + tempUrl + "\" was not available. View documentation for more details...</h3><br>");
    res.write("<a href='/api/doc'>Click here </a> for view Documentation <br>");
    res.end("Thank you...!!!")
})

//For Documentation
app.get('/api/doc', (req, res) => {
    res.write("<h1>Student API Documentation</h1><hr>");
    res.write("<h3><a style='color:green'>/api/students</a> - to get all Student details</h3>");
    res.write("<h3><a style='color:green'>/api/students/post</a> - used to Post student</h3>");
    res.write("<h3><a style='color:green'>/api/students/update/:id</a> - used to update student by Id</h3>");
    res.write("<h3><a style='color:green'>/api/students/delete/:id</a> - used to delete student by Id</h3>");
    res.write("<hr>")
    res.end("Thankyou...!!!")
})
app.get('/*', function(req, res) {
    tempUrl = req.originalUrl;
    res.redirect('/')
});
app.listen(8080);