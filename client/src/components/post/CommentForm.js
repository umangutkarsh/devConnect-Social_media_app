import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import PropTypes from 'prop-types';


const CommentForm = ({ post_id, addComment }) => {

   const [text, setText] = useState('');

   const formSubmitHandler = event => {
      event.preventDefault();
      addComment(post_id, { text });
      setText('');
   };

   return (
      <div class="post-form">
         <div class="bg-primary p">
            <h3>Leave a Comment...</h3>
         </div>
         <form class="form my-1" onSubmit={event => formSubmitHandler(event)}>
            <textarea
               name="text"
               cols="30"
               rows="5"
               placeholder="Add a comment"
               value={text}
               onChange={event => setText(event.target.value)}
               required
            />
            <input 
               type="submit" 
               class="btn btn-dark my-1" 
               value="Submit" 
            />
         </form>
      </div>
   )
};

CommentForm.propTypes = {
   addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);