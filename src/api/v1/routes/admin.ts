import express, { Router } from 'express';

import adminRoutes from '../controllers/admin';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';

const router: Router = express.Router();

router.post('/custom-claims/:uid',isAuthenticate, isAuthorize({
    hasRole: ['admin'],
    allowSameUser: true
}), adminRoutes);

export default router