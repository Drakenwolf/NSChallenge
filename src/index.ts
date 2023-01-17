import express from 'express';
import { dbConfig } from './config/db'; 
import swaggerDocs from './utils/swagger';
const router = require("./routes/index");


const app = express();
const port = parseInt(process.env.NODE_DOCKER_PORT) || 3000;

app.use(express.json());
router(app);
app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log('%cindex.ts line:18 dbConfig', 'color: white; background-color: #007acc;', dbConfig);
  swaggerDocs(app, port)
  return console.log(`Express is listening at http://localhost:${port}`);
});
