import express from 'express';
const router = require("./routes/index");

const app = express();
const port = 3000;

app.use(express.json());
router(app);



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
