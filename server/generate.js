const fs = require('fs');
const path = require("path")
const sass = require('node-sass')
const CONFIG = require('./config');
const Utils = require('./utils')
const ejs=require('ejs');

const categories_path = CONFIG.CATEGORIES_PATH;
const css_path = CONFIG.CSS_PATH
const cache_path = CONFIG.CACHE_PATH

class Generate {
     //生成cache.json
    generateCache(){
      var arr = [];
      var mdArr = [];
      Utils.traversalDir('./post',arr,mdArr,'md');

      let list = [];
      for(let i = 0 ;i < mdArr.length ; i++ ){
          let md = fs.readFileSync(mdArr[i].filePath ,"utf8");
          let obj = Utils.extractDataFromFile(md)      
          let newObj = {...mdArr[i],...obj}
          list.push(newObj);  
      }

      list.sort(function(a,b){
        let at = new Date(a.date).getTime();
        let bt = new Date(b.date).getTime();
        return bt - at;
      })

      for(let j=0 ; j < mdArr.length ; j++){
        list[j].index = j;
      }
      let obj = {
          total:list.length,
          cache:list,
      }
     
      fs.writeFileSync( cache_path, JSON.stringify(obj));
     
    }
    //生成文章页面
    generatePost(){
      fs.readFile( cache_path, 'utf8',
          function (err, data) {
            const { cache, total } = JSON.parse(data);//从cache.json里取值   
            for(let i = 0;i < total;i ++){
                  let File = cache[i];
                  ejs.renderFile('./ejs/post.ejs', 
                  { 
                      ...File, 
                      nav:CONFIG.NAV 
                  }, 
                  function(err,data){
                    if(err){
                            console.log(err);
                    }else{
                          let dir_path = path.join('./public/' , File.filePath.substring ( 0, File.filePath.lastIndexOf('\\')));                         
                          let html_path = path.join('./public/', File.filePath.replace('.md','.html'));
                          // console.log(dir_path);
                          // console.log(html_path);
                          if (fs.existsSync(dir_path) == false) {
                              Utils.makeDir(dir_path);
                          }
                          fs.writeFile(html_path, data,function(err){
                            if (err) {
                              console.log('write Post err -> ', err)
                            } 
                          });
                          //如果有图
                          let img_path = File.filePath.replace('.md','');console.log(img_path)
                          if (fs.existsSync(img_path) == true) {
                            let newImgpath = path.join('./public',img_path)
                            Utils.makeDir(newImgpath);
                            Utils.CopyDirectory(img_path, newImgpath)
                        }

                    }
                  }) 
              }
          }
      )
    }
   
    generateCategory(categories,destDir){
      return fs.readFile( cache_path, 'utf8',
                  function (err, data) {
                      if(err) return console.log(err);

                      const { cache, total } = JSON.parse(data);//从cache.json里取值                     

                      let list = [];
                      if(categories=='All') list = cache;                     
                      else{//分类
                          for(let i = 0 ;i < total ; i++ ){
                              if(cache[i].categories && cache[i].categories.indexOf(categories)>=0) list.push(cache[i]);                        
                          }
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
                             fs.writeFile(`${destDir}/${categories}.html`, data,function(err){
                              if (err) {
                                console.log('write categories err -> ', err)
                              } 
                            });
                          }
                      }) 
      })
    }
    //2、生成分类页面
    generateCategories(){
      if (fs.existsSync(categories_path) == false) {
        Utils.makeDir(categories_path);
    }
      for(let i = 0;i < CONFIG.NAV.length; i++) this.generateCategory(CONFIG.NAV[i].name, categories_path);
    }
    //拷贝静态图片
    generateStatic(){
      Utils.CopyDirectory('./static', './public/static', 'static\\scss');
    }
    //生成css
    generateCss(){
      if (fs.existsSync(css_path) == false) {
        Utils.makeDir(css_path);
      }
        //使用node-sass模块进行转换，后保存至css/all.css  
        var arr = [];
        var scssArr = [];
        Utils.traversalDir('./static/scss', arr, scssArr, 'scss');
        let outputName = path.resolve(`./static/css/`, 'all.css');
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
        
        return fs.writeFile(outputName, allResult, function(err){
          if (err) {
            console.log('write css  err -> ', err)
          } 
        });
  
    
    }
    //生成index.html
    async generateIndex(){
      await this.generateCategory('All', './public');
      fs.renameSync(`./public/All.html`,`./public/index.html`)
    }
}

module.exports  = {
  Generate
}