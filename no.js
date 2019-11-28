var fs = require('fs');//文件操作
var express=require('express');
var watch=require('watch')
var join = require('path').join;
var app=express()

app.use(express.static("121"))
// app.engine('htm', require('express-art-template'));
app.get('/', function(req, res) {
    res.render("./index.html");
})
app.get('/json', function(req, res) {
    fs.readFile("./extension.json", function(err, data) {
        res.send(data);
    })
})
app.listen(3000, function() { 
    console.log('run server')
})

var watcher=fs.watch("/");
watcher.on('change',function(event,filename){
    console.log(event)
    console.log(filename);
    // watcher.close();
})

function getJsonFiles(jsonPath){
    let jsonFiles = [];
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        console.log(files)
        jsonFiles=files;
        // files.forEach(function (item, index) {
        //     let fPath = join(path,item);
        //     let stat = fs.statSync(fPath);
        //     if(stat.isDirectory() === true) {
        //         findJsonFile(fPath);
        //     }
        //     if (stat.isFile() === true) { 
        //       jsonFiles.push(fPath);
        //     }
        // });

    }
    findJsonFile(jsonPath);
    console.log(jsonFiles);
    let str = JSON.stringify(jsonFiles);
    fs.writeFile('./extension.json',str,function(err){
        if (err) {res.status(500).send('Server is error...')
    }})

}
 
getJsonFiles("121");

// let components = []
// const files = fs.readdirSync('./121')
// files.forEach(function (item, index) {
//     let stat = fs.lstatSync('./121'+item)
//     if (stat.isDirectory() === true) { 
//       components.push(item)
//     }
// })

// console.log(components);

// let str = JSON.stringify(components)
 
//  fs.writeFile('./extension.json',str,function(err){
//  if (err) {res.status(500).send('Server is error...')}
// })