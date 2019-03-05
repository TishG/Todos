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
            req.flash("message", `Sign up failed: Username is already taken or requirements have not been met.`);
            res.redirect("/");
            console.log(err);
        } else {
            req.flash("message", `You have successfully signed up! Sign in to view listing.`);
            res.redirect("/users/sign_in");
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
            username: username
        }, (err, user) => {
            if(req.session.user) {
                req.flash("message", "You are already signed in.");
                res.redirect("/list");
            }
            if(err) {
                req.flash("message", "Something went wrong. Please try again");
                res.redirect("/users/sign_in");
                console.log(err);
            }
            if(!user) {
                req.flash("message", "User not found");
                res.redirect("/users/sign_in");
            } 
                user.comparePassword(password, (err, isMatch) => {
                    if(isMatch && isMatch == true) {
                        req.session.user = user;
                        req.flash("message", `Welcome, ${username}`);
                        console.log(`successfully signed in ${username}`);
                        res.redirect("/list");
                    } else {
                        req.flash("message", "User not found");
                        console.log(err); 
                    }
                })
            })
    },
    signOut(req, res, next) {
        res.render("signOut");   
        req.session.destroy()
        .catch((err) => {
            if(err) {
                console.log(err);
            }
        })
    }
}