import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { envVars } from './app/config/env';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}));
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Smart Task Manager!!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;