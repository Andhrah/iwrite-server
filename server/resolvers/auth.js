import bcrypt from 'bcryptjs';
import models from '../models';
import { generateToken } from '../helpers/utils';

const { User, Profile } = models;

/*
* Creates a new user resource
*/
const register = async (root, { email, password }) => {
  try {
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      throw new Error('The email address already exists. If you are registered, proceed to login instead');
    }
    const user = await User.create({
      email,
      password
    });

    const token = await generateToken({ user });
    user.firstname = '';
    user.lastname = '';
    user.bio = '';
    user.username = '';
    user.userId = user.id;

    // Creates user profile
    const userProfile = await Profile.create(user);

    return {
      token,
      message: 'Account was successfully created'
    };
  } catch (error) {
    throw new Error(error);
  }
};

/*
 * Authenticate a user
*/
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
      user,
      message: 'Login was successfully'
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
