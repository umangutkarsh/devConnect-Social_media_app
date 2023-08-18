import api from "../utils/api";
import { setAlert } from "./alert";
import { 
   ADD_COMMENT, 
   ADD_POST, 
   DELETE_POST, 
   GET_POST, 
   GET_POSTS, 
   POST_ERROR, 
   REMOVE_COMMENT, 
   UPDATE_LIKES 
} from "./types";


// Get posts
export const getPosts = () => async dispatch => {

   try {
      const responseData = await api.get('/posts');

      dispatch({
         type: GET_POSTS,
         payload: responseData.data
      });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Add like
export const addLike = id => async dispatch => {

   try {
      const responseData = await api.put(`/posts/like/${id}`);

      dispatch({
         type: UPDATE_LIKES,
         payload: { id, likes: responseData.data }
      });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Remove like
export const removeLike = id => async dispatch => {

   try {
      const responseData = await api.put(`/posts/unlike/${id}`);

      dispatch({
         type: UPDATE_LIKES,
         payload: { id, likes: responseData.data }
      });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Delete post
export const deletePost = id => async dispatch => {

   try {
      await api.delete(`/posts/${id}`);

      dispatch({
         type: DELETE_POST,
         payload: id
      });

      dispatch(setAlert('Post Removed', 'success'));
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Add post
export const addPost = formData => async dispatch => {

   try {
      const responseData = await api.post(`/posts`, formData);

      dispatch({
         type: ADD_POST,
         payload: responseData.data
      });

      dispatch(setAlert('Post Added', 'success'));
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Get post
export const getPost = id => async dispatch => {

   try {
      const responseData = await api.get(`/posts/${id}`);

      dispatch({
         type: GET_POST,
         payload: responseData.data
      });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Add comment
export const addComment = (post_id, formData) => async dispatch => {

   try {
      const responseData = await api.post(`/posts/comment/${post_id}`, formData);

      dispatch({
         type: ADD_COMMENT,
         payload: responseData.data
      });

      dispatch(setAlert('Comment Added', 'success'));
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};


// Delete comment
export const deleteComment = (post_id, comment_id) => async dispatch => {

   try {
      await api.delete(`/posts/comment/${post_id}/${comment_id}`);

      dispatch({
         type: REMOVE_COMMENT,
         payload: comment_id
      });

      dispatch(setAlert('Comment Deleted', 'success'));
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
};