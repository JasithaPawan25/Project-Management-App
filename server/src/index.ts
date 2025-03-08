import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// ROUTE IMPORTS
import projectRoute from './routes/projectRoute';
import taskRoute from './routes/taskRoute';
import searchRoute from './routes/searchRoutes';
import userRoute  from './routes/userRoutes';
import teamRoute  from './routes/teamRoutes';


// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended: false}));

//ROUTES
app.get('/', (req, res) => {
    res.send('This is Home');
});
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);
app.use('/search', searchRoute);
app.use('/users', userRoute);
app.use('/teams', teamRoute);

//SEVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    (`Server is running on port ${port}`);
});
