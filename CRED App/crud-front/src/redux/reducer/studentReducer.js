import { Constants } from "../../constants/constants";

const initialStudent = {
    error : "",
    inprogress : false,
    students : []
}

export const studentReducer = (prevState = initialStudent, action) => {
    switch(action.type){
        case Constants.FETCH_DATA_START :
            return {
                ...prevState,
                inprogress : true
            }
        case Constants.FETCH_DATA_SUCCESS:
            console.log(action.payload.data)
            return {
                ...prevState,
                inprogress : false,
                students : action.payload.data
            }
        case Constants.FETCH_DATA_FAILURE:
                return {
                    ...prevState,
                    inprogress : false,
                    error : action.payload.data
                }
        default : 
            return prevState;
    }
}