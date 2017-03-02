var express = require('express');
var router = express.Router();
var Photo = require('../models/Photo'); // 引入Photo模型
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

// var photos = [];
// photos.push({
//     name: 'Node.js Logo',
//     path: 'http://nodejs.org/images/logos/nodejs-green.png'
// });

// photos.push({
//     name: 'Ryan Speaking',
//     path: 'http://nodejs.org/images/ryan-speaker.jpg'
// });

router.get('/', function(req, res) {
    Photo.find({}, function(err, photos) {
        if(err) return next(err);
        res.render('photos', {
        title: 'Photos',
        photos: photos
    });
    });
    
});

router.get('/upload', function(req, res){
    res.render('photos/upload', {
    title: 'Photo upload' 
  });
});

router.get('/:id/download', function(req, res, next) {
    var id = req.params.id;
    Photo.findById(id, function(err, photo) {
        if(err) return next(err);
        var path = './public' + photo.path;
        // 開啟圖片
        // res.sendfile(path);
        
        // 觸發瀏覽器下載
        res.download(path);
    });
});

router.post('/upload', function(req, res, next){    
    var path = './public/photos/';
    var form = new multiparty.Form({uploadDir: path});
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if(err) {
            console.log('parse error:' + err);
        }
        else
        {
            console.log('parse files:' + filesTmp);
            var filename = files.image[0].originalFilename;
            var name = fields.name[0] || filename;
            var oldpath = files.image[0].path;
            var newpath = path + filename;
            
            fs.rename(oldpath, newpath, function(err){
                if(err){
                    console.log('rename error: ' + err);
                    return next(err);
                } else {
                    console.log('rename ok');
                    Photo.create({
                        name: name,
                        path: '/photos/' + filename
                    }, function(err) {
                        if(err) return next(err);
                        res.redirect('/photos');
                    });
                }
            });
        }

        // res.writeHead(200, {'content-type': 'text/plain'});
        // res.write('received upload:\n\n');
        // res.end(util.inspect({fields: fields, files: files}));
    });
});

module.exports = router;
