'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sortAnswers = function(a,b){
    // (-) if a before b
    // 0 no order change
    // (+) if a after b
    if(a.votes === b.votes){
        return b.updatedAt - a.updatedAt;
    }
    return b.votes - a.votes;
}

var AnswersSchema =new Schema({
    text: String,
    createdAt:{type:Date, default: Date.now},
    updatedAt:{type:Date, default: Date.now},
    votes: {type:Number, default:0}    
});

AnswersSchema.method("update", function(updates, callback){
    Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
});

AnswersSchema.method("vote", function(updates, callback){
    if(vote === "up"){
        this.votes += 1;
    } else {
        this.votes -= 1;
    }
    this.parent().save(callback);
});

var QuestionSchema = new Schema({
    text: String,
    createdAt:{type:Date, default: Date.now},
    answers:[AnswersSchema]
});

QuestionSchema.pre("save",function(next){
    this.answers.sort();
    next();
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;
