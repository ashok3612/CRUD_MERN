import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from 'react-redux'
import { insertStudentDispatcher, updateStudentDispatcher } from "../redux/Action_Creators/actionCreator";
import { useHistory } from "react-router-dom";

export function Addorupdate(props) {

    let [fullName, setFullName] = useState("");
    let [Age, setAge] = useState('');
    let [DOB, setDOB] = useState('');
    let [Mobile, setMobile] = useState('');
    let [Comment, setComment] = useState("");
    const dispatch = useDispatch();
    const Students = useSelector((store) => {
      return store.students;
    });
    let history = useHistory();

   useEffect(() => {
    if(props.id){
      let singleStudent = Students.find(stu => stu._id === props.id);
      setFullName(singleStudent.fullName);
      setAge(singleStudent.Age);
      setDOB(dateConverterFromTimestamp(singleStudent.DOB))
      setMobile(singleStudent.Mobile)
      setComment(singleStudent.Comment)
    }
   }, [])

    let nameChangeHandler = cfullName => {
        setFullName(cfullName)
    }

    let ageChangeHandler = age => {
        setAge(age)
        console.log(typeof(age))
    }

    let dobChangeHandler = dob => {
        setDOB(dob)
    }

    let mobileChangeHandler = mobile => {
        setMobile(mobile)
    }

    let commentChangeHandler = comment => {
        setComment(comment)
    }

    let submitForm = e => {
        e.preventDefault();
        if(props.id){
          let studentObject =  {
            _id : props.id,
            fullName: fullName,
            Age: Age,
            DOB: dateConverterFromDate(DOB),
            Mobile: Mobile,
            Comment: Comment
        }
          dispatch(updateStudentDispatcher(studentObject));
        }
        else{
          let studentObject =  {
            fullName: fullName,
            Age: Age,
            DOB: dateConverterFromDate(DOB),
            Mobile: Mobile,
            Comment: Comment
        }
          dispatch(insertStudentDispatcher(studentObject));
        }
        history.push('/list');
    }

    let dateConverterFromDate = Dob => {
      const date = new Date(Dob).getTime();
      return date;
    }

    let dateConverterFromTimestamp = timestamp => {
      return new Date(timestamp).toISOString().slice(0,10);
    }

  return (
    <React.Fragment>
      <h3>{ props.id ? "Update Student" : "Add Student" }</h3>
      <Button style={{}} onClick={() => history.push('/list')}>List Students</Button>
      <hr />
      <div style={{ padding: "1% 25%" }}>
        <Card>
          <Card.Body>
            <Form onSubmit={e=> submitForm(e)} autoComplete='off'>
              <Form.Group controlId="formBasicName">
                <Form.Label style={{fontSize:'20px', color:'green', fontWeight:'bold'}}>Full Name</Form.Label>
                <Form.Control 
                    onChange={(e) => nameChangeHandler(e.target.value)} 
                    required 
                    type="text" 
                    placeholder="Enter Name"
                    value = { fullName } />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicAge">
                <Form.Label style={{fontSize:'20px', color:'green', fontWeight:'bold'}}>Age</Form.Label>
                <Form.Control 
                    onChange={(e) => ageChangeHandler(e.target.value)} 
                    required 
                    type="number" 
                    placeholder="Enter Age" 
                    value={Age}/>
              </Form.Group>

              <Form.Group controlId="formBasicDOB">
                <Form.Label style={{fontSize:'20px', color:'green', fontWeight:'bold'}}>DOB</Form.Label>
                <Form.Control
                onChange={(e) => dobChangeHandler(e.target.value)}  
                required 
                type="date" 
                value={DOB}/>
              </Form.Group>

              <Form.Group controlId="formBasicMobile">
                <Form.Label style={{fontSize:'20px', color:'green', fontWeight:'bold'}}>Mobile</Form.Label>
                <Form.Control 
                    onChange={(e) => mobileChangeHandler(e.target.value)} 
                    required 
                    type="number" 
                    placeholder="Enter Your Mobile Number" 
                    value={Mobile}/>
              </Form.Group>

              <Form.Group controlId="formBasicComment">
                <Form.Label style={{fontSize:'20px', color:'green', fontWeight:'bold'}}>Comment</Form.Label>
                <Form.Control 
                    onChange={(e) => commentChangeHandler(e.target.value)} 
                    type="textbox" 
                    placeholder="Enter Comment (If Any)" 
                    value ={Comment}/>
              </Form.Group>

              <Button variant="primary" type="submit" size='lg'>
                { props.id ? "Update Student" : "Add Student" }
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
}
