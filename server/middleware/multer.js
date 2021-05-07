const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './public/img/menu')
    },
    filename: (req,file, cb)=>{
        cb(null, file.originalname)
    }
})

const dp = multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image!'))
        }
        cb(undefined,true)
    }
})

const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image!'))
        }
        cb(undefined,true)
    },
    storage
})

module.exports = {upload, dp}