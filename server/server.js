const Render=require('./render')
const http = require('http');
const fs = require('fs');
const ejs=require('ejs');
const path = require("path")
const marked = require("marked")

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // var urlObj = url.parse(req.url);
    // var query = urlObj.query;
    // var queryObj = querystring.parse(query);
    if (req.url == "/") {  Render.renderList(res); }

    // Render.renderPost('../post/2017/2017.md',res);
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});