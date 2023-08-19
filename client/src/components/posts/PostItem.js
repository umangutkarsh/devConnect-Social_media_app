import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, deletePost, removeLike } from '../../actions/post';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';


const PostItem = ({ addLike, removeLike, deletePost, auth, post: { 
   _id, 
   text, 
   name, 
   avatar, 
   user, 
   likes, 
   comments, 
   date 
}, showActions }) => {
  return (
      <div className="post bg-white p-1 my-1">
         <div>
            <Link to={`/profile/${user}`}>
               <img className="round-img" src={avatar} alt="" />
               <h4>{name}</h4>
            </Link>
         </div>
         <div>
            <p className="my-1">{text}</p>
            <p className="post-date">Posted on: {formatDate(date)}</p>

            {showActions && (
               <>
                  <button 
                     type="button" 
                     className="btn btn-light" 
                     onClick={() => addLike(_id)}
                  >
                     <i className="fas fa-thumbs-up" />{' '}
                     <span>{likes.length && (<span>{likes.length}</span>)}</span>
                  </button>
                  <button 
                     type="button" 
                     className="btn btn-light" 
                     onClick={() => removeLike(_id)}
                  >
                     <i className="fas fa-thumbs-down" />
                  </button>
                  <Link to={`/posts/${_id}`} className="btn btn-primary">
                     Discussion{' '} {comments.length && (
                        <span className='comment-counts'>{comments.length}</span>
                     )}
                  </Link>
                  {!auth.loading && user === auth.user._id && (
                     <button 
                        type="button" 
                        className="btn btn-danger" 
                        onClick={() => deletePost(_id)}
                     >
                        <i className="fas fa-times" /> Delete Post
                     </button>
                  )}
               </>
            )}
         </div>
      </div>
  );
};


PostItem.defaultProps = {
   showActions: true
};

PostItem.propTypes = {
   addLike: PropTypes.func.isRequired,
   removeLike: PropTypes.func.isRequired,
   deletePost: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);