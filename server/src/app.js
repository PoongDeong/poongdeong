import express from 'express';
import cors from 'cors';
import route from './routes';

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello world!' });
});

app.use(route);

export default app;
