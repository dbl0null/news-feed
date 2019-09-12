const http = require('http')
const https = require('https')
const URL = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en'

function parseResponse(body) {
    const [title, ...news] = body
        .split('</title>')
        .map(part => part.split('<title>')[1])
        .filter(e => !!e)

    return { title, news }
}

function formatResponse(data) {
    return `<h1>${data.title || ''}</h1><ul>${data.news.map(e => `<li>${e}</li>`).join('')}</ul>`
}

function clientHandler(request, response) {
        https.get(URL, resp => {
            let data = ''
            resp.on('data', part => data += part)
            resp.on('end', () => response.end(formatResponse(parseResponse(data))))
        })
        .on("error", err => console.log(err))
}

function startServer(port=8080) {
    http
        .createServer(clientHandler)
        .listen(port, err => console.log(err || `listening on ${port}`))
}

module.exports = { formatResponse, parseResponse }

if (require.main === module) startServer()
