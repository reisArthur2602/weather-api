import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { router } from './routes';
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json"
const app = express();

app.use(express.json());
app.use(cors());
app.use(router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server rodando na porta ${process.env.PORT}`)
);


