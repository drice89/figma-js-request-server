const http = require('http');
const url = require('url');
const config = require('./config/config.js')
const figma = require('figma-js')
const componentProcessor = require('./lib/component-processor.js').componentProcessor
const file = 'SxVUDbkV2O49lpsgyyF7Cm'

const parseQuery = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  let q = url.parse(req.url, true).query
  let fileLocation = q.file
  const client = figma.Client({
    personalAccessToken: config.apiKey
  })

  client.file(fileLocation)
    .then(( { data }) => {
      const rectangle = data.document.children[0].children[0]
      componentProcessor(rectangle)
      //console.log(rectangle)
      //res.end(JSON.stringify(data.document))
    })
    .catch(console.log)
    
}

http.createServer(parseQuery).listen(8080, () => { console.log("listening on 8080")})