import express from 'express';
import cors from 'cors';

import route from './routes';

const app = express();
app.use(express.json());

const origins = {
  development: 'http://localhost:8080',
  production: 'https://poongdeong.com',
};

app.use(cors({
  origin: origins[process.env.NODE_ENV] || 'http://localhost:8080',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello world!' });
});

app.use(route);

export default app;
