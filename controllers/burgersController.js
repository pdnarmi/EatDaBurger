const express = require("express");
const router = express.Router();
const burgerModel = require("../models/burgers.js");

router.get("/", (req, res)=> {
    burgerModel.selectAll((data)=> {
        const allObject = {
            burgers: data
        };
        console.log(allObject);
        res.render("index", allObject);
    });
});

router.post("/api/burgers", (req, res)=> {
    burgerModel.createOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], 
        (result)=> {
            res.json({id: result.insertID});
    });
});

router.put("/api/burgers/:id", (req, res)=> {
    const condition = "id = " + req.params.id;
    console.log("condition", condition);
    console.log(req.body);
    console.log(req.body.devoured);

    burgerModel.updateOne(
        {devoured: req.body.devoured}, condition, (result)=> {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
    
module.exports = router;