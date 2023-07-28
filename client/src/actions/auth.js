import api from '../utils/api';
import { setAlert } from './alert';
import { 
   REGISTER_SUCCESS, 
   REGISTER_FAIL, 
   USER_LOADED, 
   AUTH_ERROR, 
   LOGIN_SUCCESS, 
   LOGIN_FAIL, 
   LOGOUT
} from './types';


// Load User
export const loadUser = () => async dispatch => {

   try {
      const responseData = await api.get('/auth');

      dispatch({
         type: USER_LOADED,
         payload: responseData.data
      });
   } catch (err) {
      dispatch({
         type: AUTH_ERROR
      });
   }
};


// Register User
export const register = (formData) => async dispatch => {
   
   try {
      const responseData = await api.post('/users', formData);

      dispatch({
         type: REGISTER_SUCCESS,
         payload: responseData.data
      });

      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: REGISTER_FAIL
      });
   }

};


// Login User
export const login = (email, password) => async dispatch => {

   const body = { email, password };
   
   try {
      const responseData = await api.post('/auth', body);

      dispatch({
         type: LOGIN_SUCCESS,
         payload: responseData.data
      });

      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: LOGIN_FAIL
      });
   }

};


// Logout User
// export const logout = () => dispatch => {
//    dispatch({ type: LOGOUT })
// };

export const logout = () => ({ type: LOGOUT });