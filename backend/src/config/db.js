import { connect } from 'mongoose';
import dotenv, { config } from 'dotenv'
config();

const connectDB = async (uri) => {
    try {
        await connect(uri);
    } catch (err) {
        console.log(err)
    }

}
export default connectDB;