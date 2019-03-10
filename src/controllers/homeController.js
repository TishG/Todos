module.exports = {
    index(req, res, next) {
        res.render("static/home", {errors: req.session.errors});
        req.session.errors = null;
    }
  }