var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuidv4 = require('uuid-v4');

mongoose.connect('mongodb://localhost/tp_6', function(err) {
    if(err) {throw err;}
    else
        console.log('mongo connected');
});

var TaskSchema = Schema({
    _id: String,
    name: String,
    done: Boolean
});

var TaskModel = mongoose.model('Tasks', TaskSchema);
/*
TaskModel.find({
    _id: 'lekjerlgkjerlfkjerlkfjelrkjerlkgj', function(err, task) {
        if(err) {throw err;}
        console.log(task);
    }
});

TaskModel.update({
    _id: 'lekjerlgkjerlfkjerlkfjelrkjerlkgj', function(err) {
        if(err) {throw err;}
        console.log('modifié');
    }
});
*/
module.exports = {
    getTaskSet: function(cb) {
        TaskModel.find(null, function(err, taskSet) {
            if (err)
                throw err;
            else
                cb(taskSet);
        });
    },
   /* saveTask: function(task, cb) {
        var taskM = new TaskModel(task);
        taskM.save();
        cb({success: true});
    }, */

    findTaskById: function(id, cb){
        TaskModel.findById(id,function(err, task){
            if(err){
                throw err;
            }else{
                if(task!=null){
                    cb();
                }
            }
        });
    },

    updateTask: function(task, cb){
        TaskModel.findByIdAndUpdate(task.id, task, function(err, task){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    addTask: function(task, cb){
        var taskToSave = new TaskModel({
            _id:task.id,
            name:task.name,
            done:task.done
        });
        taskToSave.save(function(err){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    deleteTaskById: function(id, cb){
        TaskModel.findByIdAndRemove(id, function(err, todo){
            if (err){
                throw err;
            }else{
                cb();
            }
        });
    }
};