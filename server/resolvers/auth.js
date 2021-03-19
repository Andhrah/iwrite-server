import bcrypt from 'bcryptjs';
import models from '../models';
import { generateToken } from '../helpers/utils';

const { User } = models;

const register = async (root, { email, password }) => {
  try {
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      return {
        message: 'The email address already exists. If you are registered, proceed to login instead',
        token: '',
      };
    }
    const user = await User.create({
      email,
      password
    });
    const token = await generateToken({ user });
    return {
      user,
      token,
      message: 'Authentication succesfull'
    };
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('No user with that email');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Incorrect password');
    }
    const token = await generateToken({ user });
    return {
      id: user.id,
      token,
      user
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const me = async (root, { id, email }) => {
  if (!email) throw new Error('You are not authenticated');
  return models.User.findByPk(id);
};

const getUser = async (root, { id }, { user }) => {
  try {
    if (!user) throw new Error('You are not authenticated!');
    return models.User.findByPk(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async (root, args, { user }) => {
  try {
    if (!user) throw new Error('You are not authenticated!');
    return models.User.findAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  register, login, me, getUser, getAllUsers
};
