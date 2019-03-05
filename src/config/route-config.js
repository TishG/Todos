module.exports = {
    init(app){
      const homeRoute = require("../routes/home");
      app.use(homeRoute);
      const listRoute = require("../routes/list");
      app.use(listRoute);
      const usersRoute = require("../routes/users");
      app.use(usersRoute);
    }
  }