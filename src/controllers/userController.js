const User = require("../models/user");

module.exports = {
signUp(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let newUser = new User();
    newUser.username = username;
    newUser.password = password;

    newUser.save((err, savedUser)=> { 
         if(err) {
            req.flash("message", `Sign up failed, Please make sure all input meets requirements`);
            console.log(err);
            res.redirect("/");
        } else {
            req.flash("message", `You have successfully signed up! Welcome, ${savedUser.username}`);
            res.redirect("/list");
            }
        })
    },
signIn(req, res, next) {
        res.render("signIn");
    },
userSignIn(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({
            username: username,
            password: password 
        }, (err, user) => {
            if(err) {
                req.flash("message", "Something went wrong.");
                console.log(err);
            }
            if(!user) {
                req.flash("message", "User not found")
            } else {
                req.flash("message", `Welcome back, ${username}`);
                console.log(`successfully signed in ${username}`);
                res.redirect("/list");
            }

        })
    }
}