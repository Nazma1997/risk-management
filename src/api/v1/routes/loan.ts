import express, { Router } from 'express';
import { isAuthenticate } from '../middleware/authenticate';
import { isAuthorize } from '../middleware/authorize';
import { approveItem, createItem, getAllItems, reviewItem, updateItem } from '../controllers/loan';
import { deleteItem } from '../services/item';

const router: Router = express.Router();

router.post('/create', isAuthenticate, isAuthorize({
    hasRole:['user'],
    allowSameUser: true
}), createItem)

router.put('/:id/review', isAuthenticate, isAuthorize({
    hasRole:['officer', 'admin'],
    allowSameUser: true
}), reviewItem)
router.put('/:id/approve', isAuthenticate, isAuthorize({
    hasRole:['manager', 'admin'],
    allowSameUser: true
}), approveItem)
router.get('/', isAuthenticate, isAuthorize({
    hasRole:['manager', 'officer', 'admin'],
    allowSameUser: true
}), getAllItems)
router.delete(
    "/:id",
    isAuthenticate,
    isAuthorize({ hasRole: ["admin", "manager"] }),
    deleteItem
);
export default router