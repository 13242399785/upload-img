const express=require('express')
const fs=require('fs')
const qs=require('qs')
const multer=require('multer')

const app=express()
// const upload=multer({dist:'upload/'})

// 创建储存文件夹
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};
var uploadFolder = './upload/';
createFolder(uploadFolder);//创建文件保存路径

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名 移动端没有后缀自动加上后缀png
        var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG|GIF|gif)$/;
        // console.log(file.originalname)
        if(imgStr.test(file.originalname)){//是图片类型保存下来的名称就是上传图片名称，名称后面加png是防止微信图片没有后缀上传
            cb(null, file.originalname);  
        }else{
            cb(null, file.originalname+'.png');  
        }
        
    }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

app.post('/upload',upload.array('logo',20),function(req,res,next){
	console.log(req.files)
    res.send(JSON.stringify(req.files))
	// res.end(JSON.stringify(req.files))
})
// app.get('form',function(req,res,next){
// 	var form=fs.readFileSync('./form.html',{encoding:'utf-8'})
// 	res.send(form)
// })
app.get('/',(req,res)=>res.send('hello express!'))

app.use(express.static('public'))//静态文件

// 监听端口
app.listen(3000,()=>console.log('listening on port 3000!'))