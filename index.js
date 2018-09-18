const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 8090

app.use(bodyParser.json());

app.get('/sendGet', (request, response) => {
    console.log("GET request received")
    response.send("GET: Hello world")
})

app.post('/sendPost', (request, response) => {
    console.log("POST request received")
    response.send(request.body)
})

app.listen(port, (err) => {
    if (err) {
        return console.log("Something bad have occurred", err)
    }

    console.log("server is listening to " + port)
})