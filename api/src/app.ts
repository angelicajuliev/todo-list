import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';

import routes from './api/routes';

const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use('/', routes);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
