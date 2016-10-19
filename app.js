
var express = require('express');

var app = express();
var path = require('path');
var mongoClient = require('mongodb').MongoClient;
var bootstrapService = require("express-bootstrap-service");
var url="mongodb://test:test@ds059496.mlab.com:59496/user_details";
var uc;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodie
  mongoClient.connect(url,function(err,db){
 uc=db.collection('users');
	});

app.post('/blog', function(req, res) {
    var user_id = req.body.username;
    var token = req.body.pswd;
    console.log(user_id);
    console.log(token);

    

    uc.find({name: user_id,password:token}).toArray(function(err, resp) {
    	console.log(resp.length);
    	if(resp.length==0 && user_id!=undefined && token!=undefined ){
           console.log("chek username");
           res.sendFile(__dirname+"/login.html");
    	}
    	else{
    		res.sendFile(__dirname+"/blog.html");

    	}
    });


    var user = req.body.un;
 var pas = req.body.password; 
console.log(user);


	uc.find({name: user}).toArray(function(err, result) {
      console.log(result.length)
      if(result.length==0 && user!=null && pas!=null){


      	console.log("nil");
      	  uc.insert({name: user, password: pas}, function(err, result) {
   console.log("inserted");
   res.sendFile(__dirname+"/blog.html");
  })
      	
         

      }
      else if(result.length!=0){
      	 console.log("there");
     res.sendFile(__dirname+"/signup.html");
      }

  }) 

});
    var us;


app.post('/forget', function(req, res) {
    us = req.body.un;
   
    console.log(us);
  

    uc.find({name: us}).toArray(function(err, result) {
    	console.log(result.length);
    	if(result.length==0 ){
           console.log("chek username");
         res.sendFile(__dirname+"/username.html");

    	}
    	else{
    		res.sendFile(__dirname+"/forget.html");

    	}
    });
});
app.post('/login',function(req,res){

	var newpas=req.body.np;
	var cnfpas=req.body.cp;
	if(newpas===cnfpas){
		uc.update({name:us}, {$set: {password:newpas}});
	 		res.sendFile(__dirname+"/login.html"); 

	}

})
    





app.use(express.static(path.join(__dirname, '/public')));
app. use(bootstrapService. serve);
app.get('/', function (req, res) {

  res.sendFile(__dirname+'/home.html');

});
app.get('/blog', function (req, res) {

  res.sendFile(__dirname+'/blog.html');

});
app.get('/login', function (req, res) {
	// var html="  <form class="form-signin"><span id="reauth-email" class="reauth-email"></span><p class="input_title">Email</p><input type="text" id="inputEmail" class="login_box" placeholder="user@gmail.com" required autofocus><p class="input_title">Password</p><input type="password" id="inputPassword" class="login_box" placeholder="******" required><div id="remember" class="checkbox"><label></label></div><button class="btn btn-lg btn-primary" type="submit">Login</button></form>";
   res.sendFile(__dirname+'/login.html');
});

app.get('/signup', function (req, res) {

  res.sendFile(__dirname+'/signup.html');
 
});
app.get('/forget', function (req, res) {

  res.sendFile(__dirname+'/forget.html');
 
});
app.get('/username', function (req, res) {

  res.sendFile(__dirname+'/username.html');
 
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});