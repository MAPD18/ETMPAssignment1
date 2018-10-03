const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 8090
var getCount = 0
var postCount = 0

var storage = []
const getUri = '/sendGet'
const postUri = '/sendPost'

app.use(bodyParser.json());

app.get(getUri, (request, response) => {
    logRequests(getUri)
    response.send(getStorageContentAsJsonString())
    logResponses(getUri)
})

app.post(postUri, (request, response) => {
    logRequests(postUri)
    storage.push(request.body)
    logResponses(postUri)
})

function getStorageContentAsJsonString() {
    var arrayStr = "{\"storage\": ["
    for (var i = 0; i < storage.length; i++) {
        var jsonObj = storage[i]
        arrayStr = arrayStr + JSON.stringify(jsonObj)
        if (i != storage.length - 1) {
            arrayStr = arrayStr + ","
        }
    }
    arrayStr = arrayStr + "]}"
    return arrayStr
}

function logRequests(requestMethod) {
    if (requestMethod == getUri) {
        getCount++
    } else if (requestMethod == postUri) {
        postCount++
    }
    console.log(`${requestMethod} request received`)
    console.log(`Processed Request Count --> ${getUri}:${getCount}, ${postUri}:${postCount}`)
}

function logResponses(responseMethod) {
    console.log(`${responseMethod} sending response`)
}

app.listen(port, (err) => {
    if (err) {
        return console.error("Something bad have occurred", err)
    }

    console.info("server is listening to http://127.0.0.1:" + port)
    console.info("server is listening to http://127.0.0.1:" + port + getUri)
    console.info("server is listening to http://127.0.0.1:" + port + postUri)
})