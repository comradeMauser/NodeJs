const http = require("http")
const port = 3002

const requestrHandler = (request, response) => {
    console.log(request.url)
    response.end("It's ALIVE!!!")
}

const server = http.createServer(requestrHandler)

server.listen(port, (error => {
    if (error) {
        return console.log("something wrong", error)
    }
    console.log("server listening on port", port)
}))