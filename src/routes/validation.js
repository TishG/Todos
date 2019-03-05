module.exports = { 
    validateUsers(req, res, next) {
      if(req.method === "POST") {
        req.checkBody("username", "must be atleast 4 characters long").isLength({min: 4})
        req.checkBody("password", "must be at least 6 characters in length").isLength({min: 8})
        req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
      } 
      const errors = req.validationErrors();
      if (errors) {
        req.flash("error", errors);
        res.redirect(req.headers.referer);
      } else {
        return next();
      }
    }

 }