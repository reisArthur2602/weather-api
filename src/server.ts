import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router)

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server rodando na porta ${process.env.PORT}`)
);


