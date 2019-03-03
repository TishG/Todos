module.exports = {
    init(app){
      const homeRoute = require("../routes/home");
      app.use(homeRoute);
    }
  }