const connection = require("../config/connection.js");

const printQuestionMarks = (input)=> {
    const array = [];

    for (const i = 0; i < input; i++) {
        array.push("?");
    }

    return array.toString()
}

const objToSql = (obj)=> {
    const arr = [];

    for (const key in obj) {
        const value = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);

        }
            return arr.toString();
    }
}
const orm = {
    selectAll: (tableInput, cb)=> {
        const queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString,(err, results)=> {
            if (err) {
                console.log(err);
                throw err;
            }
            cb(results);
        });
    },
    createOne: function(table, cols, vals, cb) {
        const queryString = "INSERT INTO " + table;
        queryString += " (" + cols.toString() + ") VALUES (";
        queryString += printQuestionMarks(vals.length) + ") ";
        console.log("insertOne queryString: ", queryString);

        connection.query(queryString, vals, function(err, results) {
            if (err) {
                console.log("insertOne err", err)
                throw err;
            }
            cb(results);
        })

    },
    updateOne: (table, objColVals, condition, cb)=> {
        const queryString = "UPDATE " + table + " SET ";
        queryString += objToSql(objColVals) + " WHERE " + condition;
        console.log("updateOne queryString", queryString);

        connection.query(queryString,(err, results)=> {
            if (err) {
                console.log("updateOne err", err);
                throw err
            }

            cb(results);
        })
    }
}

module.exports = orm;