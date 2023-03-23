import express from 'express';
import chalk from 'chalk';
import Debug from 'debug';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

const appRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 7968;
const debug = Debug('app');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors());
app.use(express.static(path.join(__dirname, '/public/')));

import votingRouter from './src/routers/votingRouter.js';
import adminRouter from './src/routers/adminRouter.js';
import resultRouter from './src/routers/resultRouter.js';

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/voting', votingRouter);
app.use('/admin', adminRouter);
app.use('/result', resultRouter);
app.use('/js', express.static('public/js'));

app.get('/', (req, res) =>  {
  res.render('index', {title: 'Voting page for Kriis.ID'});
});

appRouter.route('/index').get((req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});