import express, { Router } from 'express';
import { userDetails, login } from '../controllers/user';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';
;

const router: Router = express.Router();

router.get("/:id",isAuthenticate, isAuthorize({
    hasRole: ['admin'],
    allowSameUser: true
}),userDetails)

router.post('/login', login)


export default router