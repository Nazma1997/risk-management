import express, {Express} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './api/v1/routes/index'

require('dotenv').config();
import swaggerConfig from '../config/swaggerConfig'


const app : Express = express();

app.use(morgan('combined'))
app.use(express.json());
app.use(cors())
app.use(routes)

swaggerConfig(app)


app.get("/", (req, res) => {
    res.send('You are landed an empty ocean')
})

/* app.post('/user-token', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await auth.signInWithPassword(email, password);
        const idToken = await userCredential.user.getIdToken();
        res.status(200).json({ idToken });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to sign in" });
    }
});
*/

export default app