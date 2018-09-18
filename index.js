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
    response.send("GET Information")
    console.log(getUri + " sending response")
})

const postUri = '/sendPost'
app.post(postUri, (request, response) => {
    console.log(postUri + " request received")
    postCount++
    console.log(getRequestCountStr(getCount, postCount))
    response.send(request.body)
    console.log(postUri + " sending response")
})

function getRequestCountStr(getCount, postCount) {
    return `Processed Request Count --> sendGet:${getCount}, sendPost:${postCount}`
}

app.listen(port, (err) => {
    if (err) {
        return console.log("Something bad have occurred", err)
    }

    console.log("server is listening to http://127.0.0.1:" + port)
})