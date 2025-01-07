import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const a = 20;
  res.send(a);
  // Promise.reject();
};

// app.get('/', (req: Request, res: Response) => {
//   res.send('hello world');
// });
app.get('/', test);

//global error handler
app.use(globalErrorHandler);

//Not found route
app.use(notFound);

export default app;
