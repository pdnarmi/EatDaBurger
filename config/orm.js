var connection = require("../config/connection.js");

function printQuestionMarks(input) {
    var array = [];

    for (var i = 0; i < input; i++) {
        array.push("?");
    }

    return array.toString()
}

function objToSql(obj) {
    var arr = [];

    for (var key in obj) {
        var value = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);

        }
            return arr.toString();
    }
}
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, results) {
            if (err) {
                console.log(err);
                throw err
            }
            cb(results);
        });
    },
    createOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
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
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table + " SET ";
        queryString += objToSql(objColVals) + " WHERE " + condition;
        console.log("updateOne queryString", queryString);

        connection.query(queryString, function(err, results) {
            if (err) {
                console.log("updateOne err", err);
                throw err
            }

            cb(results);
        })
    }
}

module.exports = orm;