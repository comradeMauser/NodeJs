const Sequelize = require('sequelize')

const sequelize = new Sequelize("node_js", "root", "%w%rs1jW2}XZ5dC?",
    {
        dialect: "mysql",
        host: "localhost"
    })

module.exports = sequelize