const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 8090
var getCount = 0
var postCount = 0

app.use(bodyParser.json());

const getUri = '/sendGet'
app.get(getUri, (request, response) => {
    console.log(getUri + " request received")
    getCount++
    console.log(getRequestCountStr(getCount, postCount))
    if (storage.length > 0) {
        response.send(storage[0])
    } else {
        response.send("GET Information")
    }
    console.log(getUri + " sending response")
})

var storage = []
const postUri = '/sendPost'
app.post(postUri, (request, response) => {
    console.log(postUri + " request received")
    postCount++
    console.log(getRequestCountStr(getCount, postCount))
    response.send(request.body)
    storage.push(request.body)
    console.log(postUri + " sending response")
})

function getRequestCountStr(getCount, postCount) {
    return `Processed Request Count --> ${getUri}:${getCount}, ${postUri}:${postCount}`
}

app.listen(port, (err) => {
    if (err) {
        return console.error("Something bad have occurred", err)
    }

    console.info("server is listening to http://127.0.0.1:" + port)
    console.info("server is listening to http://127.0.0.1:" + port + getUri)
    console.info("server is listening to http://127.0.0.1:" + port + postUri)
})