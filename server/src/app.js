import express from 'express';
import route from './routes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello world!' });
});

app.use(route);

export default app;
