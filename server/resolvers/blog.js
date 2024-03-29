import { faker } from '@faker-js/faker';

import models from '../models';
import blogHelper from '../helpers/blogHelpers';
import authenticate from '../middlewares/authenticate';

const { Blog } = models;

/*
* Creates a new blog resource
*/
const createBlog = async (root, { title, body, image }, { req, res }) => {
  authenticate(req, res);

  try {
    const authorId = req.user.id;
    const readTime = blogHelper.blogReadTime;
    const content = {
      title, body, authorId, readTime, image: faker.image.imageUrl(),
    };
    const result = await Blog.create(content);
    const blog = JSON.parse(JSON.stringify(result)); // clone result
    return {
      status: 201,
      blog,
      title,
      body,
      image,
      message: 'Blog was successfully created',
    };
  } catch (err) {
    throw Error(err);
  }
};

/*
* Get all created blogs
*/
const getAllBlogs = async (root, args, { req, res }) => {
  authenticate(req, res);
  try {
    const blogs = await Blog.findAll({
      order: [['createdAt']],
    });
    const result = JSON.parse(JSON.stringify(blogs));
    return [{
      status: 200,
      result,
      message: 'Successful'
    }];
  } catch (err) {
    throw Error(err);
  }
};

export { createBlog, getAllBlogs };
