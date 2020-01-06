const Render=require('./render')
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // var urlObj = url.parse(req.url);
    // var query = urlObj.query;
    // var queryObj = querystring.parse(query);
    console.log(req.url)
    if(req.url.startsWith("/static"))  Render.renderStatic(`./${req.url}`,res);
    else{
      switch (req.url){
        case '/'            : Render.renderList(res);break;
        default             : Render.renderPost(`./${req.url}`,res);break;
      }
    }
    
   
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});