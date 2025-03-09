

import { clientAuth } from '../../../../config/firebaseClient';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const signToken = async ({ email, password }: { email: string; password: string }): Promise<string> => {

  
  
    try {
        // Sign in the user using Firebase Client SDK
        const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
        if (userCredential.user) {
            // Get the ID token
            return await userCredential.user.getIdToken();
       
   
        } else {
            throw new Error("User is null");
        }
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to sign in");
    }
};