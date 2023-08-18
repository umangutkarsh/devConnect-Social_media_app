const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/check-auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
// const checkObjectId = require('../../middleware/checkObjectId');


// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [ auth, [
  check('text', 'Text is required to create a post').not().isEmpty()
] ], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    });

    const post = await newPost.save();
    res.json(post);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
});


// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});


// @route   GET api/posts/:post_id
// @desc    Get post by ID
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
  
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send('Server Error.');
  }
});


// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
  
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user's authenticity
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized to delete the post" });
    }

    await post.deleteOne();
    res.json({ msg: "Post deleted" });

  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send('Server Error.');
  }
});


// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id);

    // Check if the post has already been liked.
    // if (post.likes.some(like => like.user.toString() === req.user.id))
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: "Post has already been liked." });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:post_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id);

    // Check if the post has already been liked.
    // if (!post.likes.some(like => like.user.toString() === req.user.id))
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: "Post has yet not been liked." });
    }

    // Get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    // post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);
    await post.save();
    res.json(post.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   POST api/posts/comment/:post_id
// @desc    Comment on the post
// @access  Private
router.post('/comment/:post_id', [ auth, 
  [
    check('text', 'Text is required for the comment').not().isEmpty()
  ] 
], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.post_id);

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
});


// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete the comment on the post
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.post_id);

    // Pull out the comment from the post
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    // Make sure the comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Verifying the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized to delete the comment" });
    }

    // Get remove index
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    // post.comments = post.comments.filter(({ id }) => id !== req.params.comment_id)
    await post.save();
    res.json(post.comments);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @toDo - Add update functionality for posts and comments

module.exports = router;