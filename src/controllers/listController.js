let list = [
    "get eggs",
    "get 1 gallon of milk"
]
module.exports = {
    index(req, res, next) {
        // res.send("This is the list page")
        res.render("list", {list : list});
    },
    list(req, res, next) {
        const item = req.body.item
        list.push(item);
        res.redirect("/list")
    }
  }