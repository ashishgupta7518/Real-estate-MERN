import express from 'express';
import { test, updateUser, deleteUser, getUserListings, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const Router = express.Router();


Router.get('/test', test);
Router.put('/update/:id', verifyToken, updateUser);
Router.delete('/delete/:id', verifyToken, deleteUser);
Router.get('/listings/:id', verifyToken, getUserListings);
Router.get('/:id', verifyToken, getUser);


export default Router;