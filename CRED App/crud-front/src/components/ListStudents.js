import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentDispatcher, exportRootStudentsAction } from "../redux/Action_Creators/actionCreator";
import { useHistory } from 'react-router-dom';

export function Liststudents(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  const Students = useSelector((store) => {
    return store.students;
  });
  let sNo = 1;

  useEffect(() => {
    dispatch(exportRootStudentsAction());
  }, [Students]);

  let convertDate  = date => {
    return new Date(date).toISOString().slice(0,10);
  }

  let deleteStudenthandler = (id) => {
    let deleteObj = {
      "_id" : id
    }

    dispatch(deleteStudentDispatcher(deleteObj));
    history.push('/list');
  }


  return (
    <React.Fragment>
      <h3>List Students</h3>
      <hr />
      <div style={{ padding: "0% 15%" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Full Name</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Mobile</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Students.map((student) => {
              return (
                <tr key={student._id}>
                  <td>{sNo++}</td>
                  <td>{student.fullName}</td>
                  <td>{student.Age}</td>
                  <td>{convertDate(student.DOB)}</td>
                  <td>{student.Mobile}</td>
                  <td>{student.Comment}</td>
                  <td>
                    <Button variant="success" size="sm" onClick={() => history.push(`/update/${student._id}`)}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => window.confirm("Really wants to delete this Student ?") ? deleteStudenthandler(student._id) : ''}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <Button variant="primary" size="lg" onClick={() => history.push('/add')}>
          + Add Student
        </Button>
      </div>
    </React.Fragment>
  );
}
