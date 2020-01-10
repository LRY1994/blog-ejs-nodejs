const utils = require("./utils");
const fs = require('fs')
const exec = require('child_process').exec;
const path  = require('path');

var cmds = [
    'D:',
    'cd D:\\lry1994.github.io',
    'git add .',
    'git commit -m "提交。。。"',
    'git push'
]
cmds = cmds.join(' && ')



exec("npm run clean && npm run build",function(error, stdout, stderr) {
    if(error){
        console.log(error);
    }
    else{
        fs.renameSync( path.join(__dirname,`../public/All.html`), path.join(__dirname,`../public/index.html`),);

        utils.CopyDirectory('D:\\blog-ejs-nodejs\\public', 'D:\\lry1994.github.io');

        exec(cmds, function(error, stdout, stderr) {
            if(error){
                console.log(error);
            }
            else{
                console.log("成功");
            }
        });

        
    }
    
});





