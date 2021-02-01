import { Constants } from "../../constants/constants";
import Axios from "axios";
import { toast } from "react-toastify";

export const fetchStudentsStart = () => {
  return {
    type: Constants.FETCH_DATA_START,
  };
};

export const fetchStudentsSuccess = (students) => {
  return {
    type: Constants.FETCH_DATA_SUCCESS,
    payload: students,
  };
};

export const fetchStudentsFailure = (error) => {
  return {
    type: Constants.FETCH_DATA_FAILURE,
    payload: error,
  };
};

export const insertUser = (student) => {
  return {
    type: Constants.INSERT_STUDENT,
    payload: student,
  };
};

export const updateUser = (student) => {
  return {
    type: Constants.UPDATE_STUDENT,
    payload: student,
  };
};

export const ideleteUser = (student) => {
  return {
    type: Constants.DELETE_STUDENT,
    payload: student,
  };
};

export const exportRootStudentsAction = () => {
  return (dispatch) => {
    dispatch(fetchStudentsStart());
    const response = Axios.get("http://127.0.0.1:8080/api/students");
    response
      .then((students) => {
        dispatch(fetchStudentsSuccess(students));
      })
      .catch((error) => {
        dispatch(fetchStudentsFailure(error));
      });
  };
};

export const insertStudentDispatcher = (studentToInsert) => {
  return (dispatch) => {
    const config = {
      "Content-Type": "application/json",
    };
    console.log(config);
    const response = Axios.post(
      "http://127.0.0.1:8080/api/students/post",
      studentToInsert,
      config
    );

    response
      .then((data) => {
        if (data) console.log("Student Inserted Successfully...");
        toast.success("Student Inserted Successfully...!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        if (err) console.log("Error in Insert : " + err);
      });
  };
};

export const updateStudentDispatcher = (studentToUpdate) => {
  return (dispatch) => {
    const config = {
      "Content-Type": "application/json",
    };
    const response = Axios.put(
      "http://127.0.0.1:8080/api/students/update",
      studentToUpdate,
      config
    );

    response
      .then((data) => {
        if (data) console.log("Student Updated Successfully...");
        dispatch(exportRootStudentsAction());
        toast.info("Student Updated Successfully...!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        if (err) console.log("Error in Update : " + err);
      });
  };
};

export const deleteStudentDispatcher = (studentToDelete) => {
  return (dispatch) => {
    const config = {
      "Content-Type": "application/json",
    };
    const reqObj = {
      data: studentToDelete,
      headers: config,
    };
    const response = Axios.delete(
      "http://127.0.0.1:8080/api/students/delete",
      reqObj
    );

    response
      .then((data) => {
        if (data) console.log("Student Deleted Successfully...");
        dispatch(exportRootStudentsAction());
        // toast("User deleted Successfully...!!!")
        toast.error("Student Deleted Successfully...!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        if (err) console.log("Error in Delete : " + err);
      });
  };
};
