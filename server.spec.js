const { expect } = require('chai')
const server = require('./server')

describe('The server module', function () {
    it('parses response', function () {
        const data = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                <rss version="2.0">
                    <channel>
                        <title>A</title>
                        <description>Google News</description>
                        <item>
                            <title>B</title>
                            <description>B - description</description>
                        </item>
                        <item>
                            <title>C</title>
                            <description>C - description</description>
                        </item>
                    </channel>
                </rss>`
        const result = server.parseResponse(data)
        expect(result).to.be.a('object')
        expect(result).to.have.property('title')
        expect(result).to.have.property('news')
    })
    it('formats response', function () {
        const result = server.formatResponse({ title: 'A', news: [ 'B', 'C' ] })
        expect(result).to.eql('<h1>A</h1><ul><li>B</li><li>C</li></ul>')
    })
})