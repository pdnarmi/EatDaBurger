var express = require("express");
var router = express.Router();
var burgerModel = require("../models/burgers.js");

router.get("/", function(req, res) {
    burgerModel.selectAll(function(data) {
        var allObject = {
            burgers: data
        };
        console.log(allObject);
        res.render("index", allObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burgerModel.createOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], 
        function(result) {
            res.json({id: result.insertID});
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    console.log(req.body);
    console.log(req.body.devoured);

    burgerModel.updateOne(
        {devoured: req.body.devoured}, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
    
module.exports = router;