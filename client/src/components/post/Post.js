import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';


const Post = ({ getPost, post: { post, loading } }) => {

   const { id } = useParams();

   useEffect(() => {
      getPost(id);
   }, [getPost, id]);

   return (loading || post === null ? (<Spinner />) : (
      <section className='container'>
         <Link to='/posts' className='btn'>
            Back to Posts
         </Link>
         <PostItem post={post} showActions={false} />
         <CommentForm post_id={post._id} />
         <div className="comments">
            {post.comments.map(comment => (
               <CommentItem key={comment._id} post_id={post._id} comment={comment} />
            ))}
         </div>
      </section>
   ));
};

Post.propTypes = {
   getPost: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);