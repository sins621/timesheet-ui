'use strict'

import express from "express";
import ejs from "ejs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

app.get('/', (_, res) => {
  res.render('home');
});

app.listen(3000, () => console.log('Server running on port 3000'));
