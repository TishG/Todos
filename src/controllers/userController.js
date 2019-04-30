const User = require("../models/user");

module.exports = {
signUp(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    req.check("username", "username must be atleast 4 characters long.").isLength({min: 4})
    req.check("password", "password must be atleast 8 characters long" ).isLength({min: 8})
    req.check("passwordConfirmation", "Password Confirmation must match Password.").optional().equals(req.body.password)
    let errors = req.validationErrors();

    let newUser = new User();
    newUser.username = username;
    newUser.password = password;

    newUser.save((err, savedUser)=> { 
        if(errors) {
            let loggedErrors = errors.map(error => error.msg);
            req.flash("message", loggedErrors);
            res.redirect("/");
            console.log(errors);
            console.log("logged errors", loggedErrors);
            next();
        }       
        //  if(err) { 
        //     req.flash("message", err.message);
        //     res.redirect("/");
        //     console.log(err);
        //     console.log('err.message:', err.message)
        // } 
        else {
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
        
        if(username == "" || password == "") {
            req.flash("message", "Please enter username and password.");
            res.redirect("/users/sign_in");
            return next();
        } 
        if(req.session.user) {
            req.flash("message", "You are already signed in.");
            res.redirect("/list");
            return next(); 
        }
        User.findOne({
            username: username
        }, (err, user) => {
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
                        req.session.user.username = username;
                        req.flash("message", `Welcome, ${username}`);
                        res.redirect("/list");
                    } else {
                        req.flash("message", "User not found");
                        console.log(err); 
                    }
                })
                //Signed in user attempting to sign in again.
            })
    },
    signOut(req, res, next) {
        if(!req.session.user) {
            res.render("signOutNotice.ejs");
            res.redirect("/");
        }
        if(req.session.user) {
        res.render("signOut");   
        req.session.destroy()
        .catch((err) => {
            if(err) {
                console.log(err);
                }
            })
        }
    }
}