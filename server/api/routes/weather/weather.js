var express = require('express');
var router = express.Router();
var Weather = require('../../../model/weather/weather');

var app = express();



router.get('/list',function(req, res){
  Weather.find({},function(err,d){
    if(err){
      console.log(err);
    }else{
      console.log('List of all movies');
      console.log(d);
      res.send(d);
    }
  });
});

router.post('/add', function(req, res){
  var data = new Weather(req.body);
  console.log(data);
  data.save(function(err,d){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log('Weather added succesfully');
      res.send(d);
    }
  });
});

//updating movie by ID
router.put('/updateWeather/:name',function(req,res){
  var id = req.params.name;
  Weather.update({name:name},req.body,function(err,d){
    if(err){
      console.log(err);
      res.send(err);
    }
    else{
      console.log('updated Weather country is :'+ name);
      res.send("updated");
    }
  });
});
module.exports =router;
