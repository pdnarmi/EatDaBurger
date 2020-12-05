const orm = require("../config/orm.js");

const burgerModel = {
    selectAll: (cb)=> {
        orm.selectAll("burgers", (res)=> {
            cb(res);
        });
    },
    createOne: (cols, vals, cb)=> {
        orm.createOne("burgers", cols, vals, (res)=> {
            cb(res);
        });
    },
    updateOne: (objColVals, condition, cb)=> {
        orm.updateOne("burgers", objColVals, condition, (res)=> {
            cb(res);
        });
    }
}

module.exports = burgerModel;