// part 5 practice express

const express = require('express')

const practiceExpress = express()

practiceExpress.use('/users', (req, res, next) => {
    console.log('/users')
    res.send("<h1>Users</h1>")
})

practiceExpress.use('/', (req, res, next) => {
    console.log('/')
    res.send("<h1>middleware</h1>")
})

practiceExpress.listen(3001)