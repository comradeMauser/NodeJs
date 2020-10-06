const express = require("express")
const app = express()
const port = 3001

app.get('/', (request, response) => {
    response.send("It's slill alive")
})

app.listen(port, (error => {
    if (error) {
        return console.log("something wrong", error)
    }
    console.log("we hear you on port", port)
}))