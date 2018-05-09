var mongoose = require('./config_db.js');
mongoose = mongoose.mongoose;
var Schema = mongoose.Schema;
var uuidv4 = require('uuid-v4');

var TaskSchema = Schema({
    _id: String,
    name: String,
    done: Boolean,
    ref: String
});

var TaskModel = mongoose.model('Tasks', TaskSchema);

module.exports = {
    getTaskSet: function(ref, cb) {
        TaskModel.find({ref: ref}, function(err, taskSet) {
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
            done:task.done,
            ref:task.ref
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