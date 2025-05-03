import express from 'express';
import { test, updateUser, deleteUser, getUserListings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const Router = express.Router();


Router.get('/test', test);
Router.post('/update/:id', verifyToken, updateUser);
Router.delete('/delete/:id', verifyToken, deleteUser);
Router.get('/listings/:id', verifyToken, getUserListings);


export default Router;