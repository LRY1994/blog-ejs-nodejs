const cmd = require("node-cmd");
const utils = require("./utils");
const fs = require('fs')
const exec = require('child_process').exec;
// cmd.run('npm run clean && npm run build');
// fs.renameSync(`./public/All.html`,`./public/index.html`)

// utils.CopyDirectory('D:\\blog-ejs-nodejs\\public', 'D:\\lry1994.github.io')


var cmds = [
    'D:',
    'cd D:\\lry1994.github.io',
    'git add .',
    'git commit -m "提交。。。"',
    'git push'
]
cmds.forEach(function (cmd, i) {
    setTimeout(function () {
        console.log(cmd);
        exec(cmd, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
        });
    }, i * 1000);
})



