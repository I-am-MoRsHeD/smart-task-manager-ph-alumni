import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.set("trust proxy", 1); // external proxy/livelink gulo support/trust korar jonno
app.use(express.urlencoded({ extended: true }));


// app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Smart Task Manager!!');
});


export default app;