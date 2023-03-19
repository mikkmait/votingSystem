import express from 'express';
import chalk from 'chalk';
import Debug from 'debug';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import votingRouter from './src/routers/votingRouter.js';
import adminRouter from './src/routers/adminRouter.js';
import resultRouter from './src/routers/resultRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 7968;
const debug = Debug('app');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/voting', votingRouter);
app.use('/admin', adminRouter);
app.use('/result', resultRouter);

app.get('/', (req, res) =>  {
  res.render('index', {title: 'Voting page for Kriis.ID', data: ['a', 'b', 'c']});
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});