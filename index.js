const express = require('express')
const app = express()
const port = 8090

app.get('/sendGet', (request, response) => {
    console.log("GET request received")
    response.send("GET: Hello world")
})

app.post('/sendPost', (request, response) => {
    console.log("POST request received")
    response.send("POST: Hello world")
})

app.listen(port, (err) => {
    if (err) {
        return console.log("Something bad have occurred", err)
    }

    console.log("server is listening to " + port)
})