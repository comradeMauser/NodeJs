// part 3 practice
// node "practice basic"

const http = require("http")

const server = http.createServer((req, res) => {
    const url = req.url
    console.log("i see you, little bastard")

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html lang="ru">')
        res.write('<head><title>Practice 1</title></head>')
        res.write('<body><h1>Practice Server Page</h1>' +
            '<form action="/create-user" method="POST">' +
            '<input type="text" name="inputUserMessage">' +
            '<button type="submit">enter user name</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html lang="ru">')
        res.write('<head><title>Practice 1</title></head>')
        res.write('<body><h1>Practice Server Page</h1>' +
            '<ul title="usersList">' +
            '<li>User 1</li>' +
            '<li>User 2</li>' +
            '<li>User 3</li>' +
            '</ul></body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/create-user') {
        const body = []

        req.on("data", (chunk) => {
            body.push(chunk)
        })

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString()
            const inputUserName = parsedBody.split('=')[1]
            console.log(inputUserName)
        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
    }
})

server.listen(3001)