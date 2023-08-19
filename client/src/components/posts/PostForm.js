import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import PropTypes from 'prop-types';

const PostForm = ({ addPost }) => {

   const [text, setText] = useState('');

   const formSubmitHandler = event => {
      event.preventDefault();
      addPost({ text });
      setText('');
   };

   return (
      <div className="post-form">
         <div className="bg-primary p">
            <h3>Add a Post...</h3>
         </div>
         <form className="form my-1" onSubmit={event => formSubmitHandler(event)}>
            <textarea
               name="text"
               cols="30"
               rows="5"
               placeholder="Create a post"
               value={text}
               onChange={event => setText(event.target.value)}
               required
            />
            <input 
               type="submit" 
               className="btn btn-dark my-1" 
               value="Submit" 
            />
         </form>
      </div>
   );
};

PostForm.propTypes = {
   addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);