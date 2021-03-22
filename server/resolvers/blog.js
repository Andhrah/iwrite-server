/* eslint-disable import/prefer-default-export */
import models from '../models';
import blogHelper from '../helpers/blogHelpers';
import authenticate from '../middlewares/authenticate';

const { Blog } = models;

const createBlog = async (root, { title, body, image }, { req, res }) => {
  authenticate(req, res);

  try {
    const authorId = req.user.id;
    const readTime = blogHelper.blogReadTime;
    const content = {
      title, body, authorId, readTime, image: '',
    };
    const result = await Blog.create(content);
    const blog = JSON.parse(JSON.stringify(result)); // clone result
    return {
      blog,
      title,
      body,
      message: 'Blog was successfully created',
    };
  } catch (err) {
    throw Error(err);
  }
};

export { createBlog };
