
import express from "express";
import cors from "cors";

import routes from "./api/routes";
import connect from "./db/connection";
import { ToDo } from "./db/models";

const app = express();
const port = process.env.PORT || 9000;
connect();

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
