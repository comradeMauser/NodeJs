/*
const Sequelize = require('sequelize')
const sequelize = new Sequelize("node_js", "root", "%w%rs1jW2}XZ5dC?",
    {
        dialect: "mysql",
        host: "localhost"
    })

module.exports = sequelize*/

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
    MongoClient
        .connect("mongodb+srv://JohnDoe:nIiMOHbOi16uVwou@nodecluster.qflh4.mongodb.net/<dbname>?retryWrites=true&w=majority")
        .then(client => {
            callback(client)
            console.log("connection success".brightGreen)
        })
        .catch(err => console.log("MongoClient".bold.bgRed, `${err}`.brightRed))
}

module.exports = mongoConnect