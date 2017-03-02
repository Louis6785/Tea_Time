var express = require('express');
var router = express.Router();
var Photo = require('../models/Photo'); // 引入Photo模型
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');


var photos = [];
photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

router.get('/', function(req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
});

router.get('/upload', function(req, res){
    res.render('photos/upload', {
    title: 'Photo upload' 
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
            var name = fields.name[0] || files.image[0].originalFilename;
            var oldpath = files.image[0].path;
            var newpath = path + files.image[0].originalFilename;
            
            fs.rename(oldpath, newpath, function(err){
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
        }

        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
});

module.exports = router;
