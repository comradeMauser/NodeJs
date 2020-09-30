//fourth with Promise
const fs = require('fs')
console.log("open your mind, Quade!")

fs.readFile('file.md', 'utf-8', function (err, content) {
    if (err) {
        console.log("something wrong")
        return console.log(err)
    }
    console.log(content)
})
console.log("end of all")

function stats(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file,  (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data)
        })
    })
}

Promise.all([
    stats('file1.txt'),
    stats('file2.txt'),
    stats('file3.txt', "utf-8"),
]).then(data => console.log(data))
    .catch(err => console.log(err))