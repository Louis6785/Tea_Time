var express = require('express');
var router = express.Router();
var mongodb = require('../database/connectMongoDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  // 新增資料
  // var UserEntity = new mongodb.userModel({
  //   name: 'wiliam',
  //   age: 22,
  //   email: 'wiliam@ss.com'
  // });

  // UserEntity.save(function(error, doc) {
  //   if(error) {
  //     console.log('error:' + error);
  //   }
  //   else
  //   {
  //     console.log(doc);
  //     console.log('保存成功');
  //   }
  // });

  // 讀取資料
  mongodb.userModel.find({name:'wiliam'}, function(error, docs) {
    if(error) {
      console.log('error:' + error);
      res.render('index', {title: 'Express', msg: '查詢出錯啦' + docs});
    }
    else
    {
      console.log(docs);
      console.log('查詢成功');
      res.render('index', {title: 'Express', msg: '查出數據啦' + docs});
    }
  });

  // res.render('index', { title: 'Express' });
});

module.exports = router;
