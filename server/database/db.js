import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {

    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.h0mbmxt.mongodb.net/wpdb?retryWrites=true&w=majority&appName=Cluster0`;

    try{
        await mongoose.connect(URL, {useUnifiedTopology: true})
        console.log('Database connected successfully');
    }catch(error){
        console.log('error while connenting with the database', error.message);
    }
};

export default Connection;