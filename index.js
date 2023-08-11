import express from 'express';
import configRoutesFunction from './routes/index.js';

import {fileURLToPath} from 'url';
import {dirname} from 'path';

//set up how to serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const staticDir = __dirname + "/public";
app.use(express.static(staticDir));
app.use('/edit', express.static(staticDir));

//Set views
app.set('views','./views');
app.set('view engine', 'ejs');

//middlewares


  //middleware to log out details for every request made
const  loggingMiddleware = (req, res, next)=>{
    console.log(" ");
    console.log(`Current Timestamp: ${new Date().toUTCString()}`);
    console.log(`Request Method: ${req.method} : ${req.originalUrl}`);
    next();
}

app.use(loggingMiddleware);

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
    // let the next middleware run:
    next();
  };

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

configRoutesFunction(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});