const fs = require('fs');
const path = require("path")
const http = require('http');
const url  = require('url');
const querystring = require('querystring')
const sass = require('node-sass')
const Render=require('./render')
const CONFIG = require('./config');

const hostname = '127.0.0.1';
const port = 3000;

class Generate {

    generatePost(){
      var arr = [];
      var mdArr = [];
      this.traversalDir('./post',arr,mdArr,'md');

      let list = [];
      for(let i = 0 ;i < mdArr.length ; i++ ){
          let md = fs.readFileSync(mdArr[i].filePath ,"utf8");
          let obj = this.extractDataFromFile(md)      
          let newObj = {...mdArr[i],...obj}
          newObj.index = i;
          
      }

      let obj = {
          total:list.length,
          cache:list,
      }

      fs.writeFileSync(CONFIG.CACHE, JSON.stringify(obj));
    }
    generateCategory(){
      fs.readFile( CONFIG.CACHE, 'utf8',
                  function (err, data) {
                      if(err) return console.log(err);

                      const { cache, total } = JSON.parse(data);//从cache.json里取值
                      const categories = 'Reading'

                      let list = [];
                      //分类
                      if(categories){
                          for(let i = 0 ;i < total ; i++ ){
                              if(cache[i].categories && cache[i].categories.indexOf(categories)>=0) list.push(cache[i]);                        
                          }
                      }
                      else{
                          list = cache;
                      }
                      
                      ejs.renderFile('./ejs/list.ejs', 
                      {   
                          list, 
                          nav:CONFIG.NAV ,
                          categories:categories||'All'
                      }, 
                      function(err,data){
                          if(err){
                              console.log(err);
                          }else{
                             fs.writeFileSync('./public/categories/', JSON.stringify(obj));
                              res.end(data);
                          
                          }
                      }) 
      })
    }
    generateImg(){

    }
    generateCss(){
        //使用node-sass模块进行转换，后保存至css/all.css  
        var arr = [];
        var scssArr = [];
        this.traversalDir('./static/scss', arr, scssArr, 'scss');
        let outputName = path.resolve('./public/css/', 'all.css');
        let allResult = '';
    
        for(let j = 0;j < scssArr.length;j++){
            let result = sass.renderSync({
              file: scssArr[j].filePath,
              outFile: outputName,
              outputStyle: 'compressed',
              sourceMap: false
            });
            allResult += result.css;
        }
               
        fs.writeFileSync(outputName, allResult, function(err){
          if (err) {
            console.log('write file err -> ', err)
          } else {
            console.log('save css success -> ', outputName)
          }
        });
  
    
    }
}