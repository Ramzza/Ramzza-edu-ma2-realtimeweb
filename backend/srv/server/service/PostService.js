const logger = require('../logger/logger');
const Post = require('../models/entity/Post');
const { mapCompleteToEntity } = require('../util/PostMapper');
const Chats = require('../sockets/chats');

class PostService {
  async readPosts() {
    try {
      logger.info('Post GET-all called', 'crud~post~get-all');
      const posts = await Post.find();
      logger.info(
        `Post GET-all successful: ${posts.length}`,
        'crud~post~get-all',
      );
      return posts;
    } catch (err) {
      logger.error(
        `Post GET-all failed: ${err.toString()}`,
        'crud~post~get-all',
      );
      throw new Error('Posts read failed!');
    }
  }

  async createPost(post) {
    try {
      logger.info('Post POST called', 'crud~post~post');
      const postEntity = new Post(mapCompleteToEntity(post));

      const savedPost = await postEntity.save();
      logger.info('Post POST successful', 'crud~post~post');
      await Chats.getInstance().notifyPostsChange(this);

      return savedPost;
    } catch (err) {
      logger.error('Post POST failed', 'crud~post~post');
      throw new Error('Post creation failed!');
    }
  }

  async deletePost(postId) {
    try {
      logger.info('Post DELETE called', 'crud~post~delete');
      const deletedPost = await Post.deleteOne({ _id: postId });
      logger.info('Post DELETE successful', 'crud~post~delete');
      await Chats.getInstance().notifyPostsChange(this);

      return deletedPost;
    } catch (err) {
      logger.error('Post DELETE failed', 'crud~post~delete');
      throw new Error('Post deletion failed!');
    }
  }
}

module.exports = PostService;
