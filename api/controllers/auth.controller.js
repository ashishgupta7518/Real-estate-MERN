import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

// Signup (create user)
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

// Signin (login user)
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json(rest); // No token or cookie sent
  } catch (error) {
    next(error);
  }
};

// Google Auth (simulate login/signup)
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const { password: pass, ...rest } = user._doc;
      res.status(200).json(rest); // No cookie/token
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      res.status(200).json(rest); // No cookie/token
    }
  } catch (error) {
    next(error);
  }
};

// Signout (dummy since there's no session/cookie anymore)
export const signOut = async (req, res, next) => {
  try {
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
