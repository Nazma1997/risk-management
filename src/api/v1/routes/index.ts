import express, { Router } from "express";
import userRoutes from './user'
import adminRoutes from './admin'
import loanRoutes from './items'

const router: Router = express.Router();

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/admin', adminRoutes);
router.use('/api/v1/loans', loanRoutes);


export default router

