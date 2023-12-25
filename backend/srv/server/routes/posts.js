const express = require('express');

const router = express.Router();
const PostService = require('../service/PostService');

const PostServiceInstance = new PostService();

// GET all posts
router.get('/', async (_req, res) => {
  try {
    const posts = await PostServiceInstance.readPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// SUBMIT A Post
router.post('/', async (req, res) => {
  try {
    const createdPost = await PostServiceInstance.createPost(req.body);
    res.json(createdPost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Delete Post
router.delete('/:postId', async (req, res) => {
  try {
    const deletedPost = await PostServiceInstance.deletePost(req.params.postId);
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
