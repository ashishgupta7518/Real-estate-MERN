import express from 'express';
import { createListing, deleteListing ,updateListing ,getListing , getListings} from '../controllers/listing.controller.js';





const router = express.Router();

router.post('/create',  createListing);
router.delete('/delete/:id', deleteListing);
router.post('/update/:id', updateListing); // Assuming updateListing is similar to createListing
router.get('/get/:id' , getListing)
router.get('/get', getListings); // Assuming getListing is similar to createListing

export default router;

