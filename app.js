const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers)
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body>' +
            '<form action="/message" method="POST">' +
            '<input type="text" name="inputMessage"><button type="submit">Send</button></form></body>')
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = []

        req.on('data', (chunk) => {
            // console.log('chunk:', chunk)
            body.push(chunk)
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            // console.log('parsedBody:', parsedBody)
            const messageFromInput = parsedBody.split('=')[1]
            // console.log('messageFromInput:', messageFromInput)
            fs.writeFile('message.txt', messageFromInput, () => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<head><title>Page</title></head>')
    res.write('<body><h1>Test Server Page</h1></body>')
    res.end()

    // process.exit()
})

server.listen(3000)