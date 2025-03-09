import express, { Router } from 'express';

import customClaimes from '../controllers/admin';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';

const router: Router = express.Router();

router.post('/custom-claims/:uid',isAuthenticate, isAuthorize({
    hasRole: ['admin'],
    allowSameUser: true
}), customClaimes);

export default router