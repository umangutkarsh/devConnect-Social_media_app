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
      const responseData = await api.get('/profile/me');

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
export const createProfile = (formData, edit = false) => async dispatch => {
  
   try {
      const responseData = await api.post('/profile', formData);

      dispatch({
         type: GET_PROFILE,
         payload: responseData.data
      });

      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
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
export const addExperience = formData => async dispatch => {

   try {
      const responseData = await api.put('/profile/experience', formData);

      dispatch({
         type: UPDATE_PROFILE,
         payload: responseData.data
      });

      dispatch(setAlert('Experience Added', 'success'));
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
export const addEducation = formData => async dispatch => {

   try {
      const responseData = await api.put('/profile/education', formData);

      dispatch({
         type: UPDATE_PROFILE,
         payload: responseData.data
      });

      dispatch(setAlert('Education Added', 'success'));
      return responseData.data;
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