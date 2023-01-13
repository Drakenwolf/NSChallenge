import express from 'express';
import { dbConfig } from './config/db';
const router = require("./routes/index");
require("dotenv").config();

const app = express();
const port = process.env.NODE_DOCKER_PORT || 3000;

app.use(express.json());
router(app);



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
