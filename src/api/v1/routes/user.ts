import express, { Router } from 'express';
import {  getUserToken, userDetails } from '../controllers/user';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';
import customClaimes from '../controllers/admin';

const router: Router = express.Router();

router.get("/:id",isAuthenticate, isAuthorize({
    hasRole: ['admin'],
    allowSameUser: true
}),userDetails)
router.use('/api/v1/custom-claims', customClaimes );
router.post('/token', getUserToken)


export default router