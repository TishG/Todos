const Item = require("../models/item");

module.exports = {
    index(req, res, next) {
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
        const item = new Item({
            name: req.body.name,
            purchased: req.body.purchased
        })
        item.save()
        .then(()=> {
            req.flash("message", "item successfully added!");
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