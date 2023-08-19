import axios from "axios";
import api from "../utils/api";
import { setAlert } from "./alert";
import { 
   ACCOUNT_DELETED, 
   CLEAR_PROFILE, 
   GET_PROFILE, 
   GET_PROFILES, 
   GET_REPOS,
   NO_REPOS, 
   PROFILE_ERROR, 
   UPDATE_PROFILE 
} from "./types";


// Get current user's profile
export const getCurrentProfile = () => async dispatch => {

   try {
      const responseData = await axios.get('/api/profile/me');

      dispatch({
         type: GET_PROFILE,
         payload: responseData.data
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Get all profiles
export const getProfiles = () => async dispatch => {

   dispatch({ type: CLEAR_PROFILE });
   try {
      const responseData = await api.get('/profile');

      dispatch({
         type: GET_PROFILES,
         payload: responseData.data
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Get profile by ID
export const getProfileById = user_id => async dispatch => {

   try {
      const responseData = await api.get(`/profile/user/${user_id}`);

      dispatch({
         type: GET_PROFILE,
         payload: responseData.data
      });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Get GitHub repos
export const getGithubRepos = username => async dispatch => {

   try {
      const responseData = await api.get(`/profile/github/${username}`);

      dispatch({
         type: GET_REPOS,
         payload: responseData.data
      });
   } catch (err) {
      dispatch({
         type: NO_REPOS
      });
   }
};


// Create or update profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
  
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }

      const responseData = await axios.post('/api/profile', formData, config);

      // const responseData = await api.post('/profile', formData);

      dispatch({
         type: GET_PROFILE,
         payload: responseData.data
      });

      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

      if (!edit) {
         navigate('/dashboard');
      }
   } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Add Experience
export const addExperience = (formData, navigate) => async dispatch => {

   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const responseData = await axios.put('/api/profile/experience', formData, config);

      dispatch({
         type: UPDATE_PROFILE,
         payload: responseData.data
      });

      dispatch(setAlert('Experience Added', 'success'));

      navigate('/dashboard');
   } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Add Education
export const addEducation = (formData, navigate) => async dispatch => {

   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      
      const responseData = await axios.put('/api/profile/education', formData, config);

      dispatch({
         type: UPDATE_PROFILE,
         payload: responseData.data
      });

      dispatch(setAlert('Education Added', 'success'));
      
      navigate('/dashboard');
   } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Delete Experience
export const deleteExperience = id => async dispatch => {

   try {
      const responseData = await api.delete(`/profile/experience/${id}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: responseData.data
      });

      dispatch(setAlert('Experience Deleted', 'success'));
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Delete Education
export const deleteEducation = id => async dispatch => {

   try {
      const responseData = await api.delete(`/profile/education/${id}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: responseData.data
      });

      dispatch(setAlert('Education Deleted', 'success'));
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Delete account and profile
export const deleteAccount = () => async dispatch => {

   if (window.confirm('Are you sure? This cannot be undone')) {

      try {
         await api.delete('/profile');
   
         dispatch({ type: CLEAR_PROFILE });
         dispatch({ type: ACCOUNT_DELETED });
         dispatch(setAlert('Your account has been permanently deleted'));
      } catch (err) {
         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
         });
      }
   }

};