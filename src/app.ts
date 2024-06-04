import express, { Application, Request, Response } from "express"
import cors from 'cors'
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express()

app.use(
    cors({
      origin: ['https://lost-and-found-system-frontend.vercel.app'],
      credentials: true,
    }),
  );
  
app.use(express.json());
app.use('/api',router)

app.get('/',(req:Request, res: Response) => {
    res.send({
        message: "server is running"
    })
})
app.use(globalErrorHandler)
app.use(notFound)

export default app;