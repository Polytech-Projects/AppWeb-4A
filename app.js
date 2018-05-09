var path = require('path');
var express = require('express');
var uuidv4 = require('uuid-v4');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var dataTaskLayer = require('./dataTaskLayer.js');
var dataUserLayer = require('./dataUserLayer.js');
var config = require('./config.js')

var app = express();
var port = config.nodePort;

// Sert à la création d'un token pour l'authentification
var superSecret = config.tokenSecret;

app.use(function(req, res, next) {
    // Permition connection
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Permisson
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // les headers autorisé
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');

    // true -> inclus les cookies
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.post('/getTaskSet', verifyToken, function(req, res, next) {
    dataTaskLayer.getTaskSet(req.user_id, function(taskSet) {
        var obj = {
            success: true,
            taskSet: taskSet
        };
        res.send(obj);
    });
});

app.post('/addTask', verifyToken, function(req, res, next){

    if(!req.body.name || !req.user_id){
        res.send(
            {
                success:false,
                errorSet:['TASKNAME_EMPTY', 'TASKNAME_REF_EMPTY']
            }
        );
    }else{
        var task = {
            id:uuidv4(),
            name:req.body.name,
            ref: req.user_id,
            done:false
        };
        dataTaskLayer.addTask(task, function(){
            res.send({ success:true, task:task });
        });
    }
});

app.post('/findById', verifyToken, function(req,res, next){
    if(!req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ID_IS_EMPTY']
            }
        );
    }else{
        dataTaskLayer.findTaskById(req.body.id,function(status){
            res.send({ success:status });
        });
    }
});

app.post('/updateTask', verifyToken, function(req,res, next){
    if(!req.body.name && !req.body.done && !req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ONE_VALUE_IS_EMPTY']
            }
        );
    }else{
        var task = {
            id:req.body.id,
            name:req.body.name,
            done:req.body.done,
            ref:req.user_id // Devrait vérifier que cette tâche appartient bien à l'utilisateur
        };
        dataTaskLayer.updateTask(task, function(){
            res.send({ success:true });
        });
    }
});

app.post('/deleteTask', verifyToken, function(req,res, next){
    if(!req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ID_EMPTY']
            }
        );
    }else{
        dataTaskLayer.findTaskById(req.body.id,function(){
            dataTaskLayer.deleteTaskById(req.body.id, function(){
                res.send({ success:true });
            });
        })
    }
});

///////////////////////: PARTI USER
// CREATES A NEW USER
app.post('/user', function (req, res) {
    if(!req.body.name || !req.body.email || !req.body.password){
        res.send(
            {
                success:false,
                errorSet:['NOT_ALL_INFO_CREATEUSER']
            }
        );
    }else{
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        req.body.password = hashedPassword;
        console.log(req.body);
        dataUserLayer.addUser(req.body, function(){
            var token = jwt.sign({ id: req.body.email }, superSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.send({ success: true, token: token });
        });
    }
});

// RETURNS ALL THE USERS IN THE DATABASE
app.get('/user', function (req, res) {
    dataUserLayer.getUserSet(function(userSet) {
        var obj = {
            success: true,
            userSet: userSet
        };
        res.send(obj);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
app.get('/user/:email', function (req, res) {
    if(!req.params.email){
        res.send(
            {
                success:false,
                errorSet:['EMAIL_EMPTY']
            }
        );
    }else{
        dataUserLayer.findUserById(req.params.email,function(user){
            res.send({ success:true, user:user });
        });
    }
});

// DELETES A USER FROM THE DATABASE
app.delete('/user/:id', function (req, res) {
    if(!req.params.id){
        res.send(
            {
                success:false,
                errorSet:['ID_EMPTY']
            }
        );
    }else{
        dataUserLayer.findUserById(req.body.id,function(){
            dataUserLayer.deleteUserById(req.body.id, function(){
                res.send({ success:true });
            });
        })
    }
});

// TODO
// UPDATES A SINGLE USER IN THE DATABASE
app.put('/user/:id', function (req, res) {
    if(!req.body.name && !req.body.password && !req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ONE_VALUE_IS_EMPTY']
            }
        );
    }else{
        var task = {
            id:req.body.id,
            name:req.body.name,
            done:req.body.password
        };
        dataUserLayer.updateUser(task, function(){
            res.send({ success:true });
        });
    }
});

app.get('/me', verifyToken, function(req, res, next) {
    dataUserLayer.findUserById(req.user_id, function (user) {
        if (!user) return res.send("No user found.");
        
        res.status(200).send(user);
    });
});

app.post('/login', function(req, res) {
    dataUserLayer.findUserByIdWithPwd(req.body._id, function (user) {
        if (!user) return res.send({ success: false, errorSet: ['NO_EXISTING_USER'] });

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.send({ success: false, token: null });

        var token = jwt.sign({ id: user._id }, superSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ success: true, token: token });
    });
});

app.get('/logout', function(req, res) {
    res.status(200).send({ success: true, token: null });
});

app.use(function (user, req, res, next) {
    res.status(200).send(user);
});

function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ success: false, errorSet: ['No token provided.'] });
    jwt.verify(token, superSecret, function(err, decoded) {
        if (err)
            return res.status(200).send({ success: false, errorSet: ['Failed to authenticate token.'] });
        // if everything good, save to request for use in other routes
        req.user_id = decoded.id;
        next();
    });
}

console.log('serveur démarré port : '+ port);
app.listen(port);