module.exports = {
    init(app){
      const homeRoute = require("../routes/home");
      app.use(homeRoute);
      const catchAllRoute = require("../routes/catchAll");
      app.use(catchAllRoute);
    }
  }