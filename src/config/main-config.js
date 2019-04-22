require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const logger = require('morgan');
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const mongoose = require("mongoose");
mongoose.connect(`mongodb://dbUser:${process.env.dbUserPassword}@list-app-shard-00-00-c9msa.mongodb.net:27017,list-app-shard-00-01-c9msa.mongodb.net:27017,list-app-shard-00-02-c9msa.mongodb.net:27017/test?ssl=true&replicaSet=list-app-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true }, (err) => {
  if(err) console.log(err);
  else console.log("Connected to the database!");
});
const bodyParser = require("body-parser");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;

module.exports = {
  init(app, express){
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(logger('dev'));
    app.use(expressValidator());
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 } //set cookie to expire in 14 days
    }));
    app.use(flash());
  }
};