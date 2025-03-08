import express, { Router } from 'express';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';
import { createItem, getAllItems, updateItem } from '../controllers/item';

const router: Router = express.Router();

router.post('/create', isAuthenticate, isAuthorize({
    hasRole:['user'],
    allowSameUser: true
}), createItem)

router.post('/:id/review', isAuthenticate, isAuthorize({
    hasRole:['officer'],
    allowSameUser: true
}), updateItem)
router.post('/:id/approve', isAuthenticate, isAuthorize({
    hasRole:['manager'],
    allowSameUser: true
}), updateItem)
router.get('/', isAuthenticate, isAuthorize({
    hasRole:['manager', 'officer'],
    allowSameUser: true
}), getAllItems)
export default router