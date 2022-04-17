import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import RouterConfig from './routes/index'

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet());
RouterConfig(app)
//handle Error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 401).json(err)
})
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
