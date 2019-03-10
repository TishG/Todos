const Item = require("../models/item");

module.exports = {
    index(req, res, next) {
        if(!req.session.user) {
            req.flash("message", "You are not authorized to do that. Please sign up or sign in.");
            res.redirect("/");
        }
            Item.find({})
            .then(items => {
                res.render("list", { itemList : items });
            })
            .catch(err => {
                console.log(err);
                req.flash('message', 'Something went wrong');
                res.redirect("/list");
                })
        },
    list(req, res, next) {
        let item = new Item({
            name: req.body.name,
            purchased: req.body.purchased
        })

        req.check("name","name cannot exceed 30 characters").isLength({max: 30});
        let errors = req.validationErrors();
        if(errors) {
            let loggedErrors = errors.map(error => error.msg)
            console.log(loggedErrors);
            req.flash("message", loggedErrors);
            return res.redirect("/list");
            
        }


        item.save()
        .then(()=> {
            res.redirect("/list");
        })
        .catch(err => {
            req.flash("message", "You must add an item to the list");
            res.redirect("/list");
            console.log(err);
        })
    },
    update(req, res, next) {
        let itemId = req.params.id;
        Item.findById(itemId)
        .exec()
        .then(result => {
            result.purchased = !result.purchased;
            return result.save();
        })
        .then(()=> {
            res.redirect("/list");
        })
        .catch(err => {
            console.log(err);
            req.flash("message", "Something went wrong.");
        })
    },
    delete(req, res, next) {
        let itemId = req.params.id;
        Item.findByIdAndRemove(itemId)
        .exec()
        .then(result => {
            result.save();
        })
        .then(()=> {
            res.redirect("/list");
        }) 
        .catch(err => {
            console.log(err);
            req.flash("message", "Something went wrong.");
        })
    }

  }