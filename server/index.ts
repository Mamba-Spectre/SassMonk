import express, { Router } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors(
    {
        credentials: true
    }
));

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
const MONGO_URI:any = process.env.MONGO_URI;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI)
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
}
);
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

app.use('/', router());

