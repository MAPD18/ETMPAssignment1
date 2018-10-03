const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 8090
var getCount = 0
var postCount = 0
var deleteCount = 0

var storage = []
const devUrl = 'http://127.0.0.1'
const getUri = '/sendGet'
const postUri = '/sendPost'
const deleteUri = '/sendDelete'

app.use(bodyParser.json());

app.get(getUri, (request, response) => {
    logRequests(getUri)
    response.send(getStorageContentAsJsonString())
    logResponses(getUri)
})

app.post(postUri, (request, response) => {
    logRequests(postUri)
    storage.push(request.body)
    response.send(200)
    logResponses(postUri)
})

app.delete(deleteUri, (request, response) => {
    logRequests(deleteUri)
    storage = []
    response.send(200)
    logResponses(deleteUri)
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
    } else if (requestMethod == deleteUri) {
        deleteCount++
    }
    console.log(`${requestMethod} request received`)
    console.log(`Processed Request Count --> ${getUri}:${getCount}, ${postUri}:${postCount}, ${deleteUri}:${deleteCount}`)
}

function logResponses(responseMethod) {
    console.log(`${responseMethod} sending response`)
}

app.listen(process.env.PORT || port, (err) => {
    console.info("server starting...")
    if (err) {
        return console.error("Something bad have occurred", err)
    }


    console.info(`server is listening to ${process.env.PROD_URL || devUrl}:${process.env.PORT || port}${getUri}`)
    console.info(`server is listening to ${process.env.PROD_URL || devUrl}:${process.env.PORT || port}${postUri}`)
    console.info(`server is listening to ${process.env.PROD_URL || devUrl}:${process.env.PORT || port}${deleteUri}`)
})