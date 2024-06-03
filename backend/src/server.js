import express from "express"
import { config } from "dotenv";
import connectToDB from "./config/db.js";
import auth from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
config();

const port = process.env.PORT;
const uri = process.env.URI;

app.use(express.json());
app.use(cors());
app.use('/',authRoutes);


app.listen(3000, async () => {
    try {
        await connectToDB(uri);
        console.log("connection is made");
        console.log(`Server is running ${port}`);
    } catch (err) {
        console.log(err);
    }
})