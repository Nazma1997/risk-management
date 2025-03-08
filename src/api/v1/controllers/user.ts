import { Request, Response, NextFunction } from 'express'
import { UserRecord } from 'firebase-admin/auth';
import { auth } from "../../../../config/firebaseConfig";
import { clientAuth } from '../../../../config/firebaseClient';
import { signInWithEmailAndPassword } from 'firebase/auth';



export const userDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'User id is required' });
        return;
    }

    try {
        const user: UserRecord = await auth.getUser(id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error)
    }
}
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Sign in the user using Firebase Client SDK
        const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
        if (userCredential.user) {
            // Get the ID token
            const idToken = await userCredential.user.getIdToken();
            res.status(200).json({ idToken });
        } else {
            throw new Error("User is null");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to sign in" });
    }
};