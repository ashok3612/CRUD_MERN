import { applyMiddleware, createStore } from 'redux';
import { studentReducer } from '../reducer/studentReducer';
import Thunk from 'redux-thunk';

export const Store = createStore(studentReducer, applyMiddleware(Thunk));