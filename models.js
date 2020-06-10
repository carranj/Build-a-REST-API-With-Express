'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AnswersSchema =new Schema({
    text: String,
    createdAt:{type:Date, default: Date.now},
    updatedAt:{type:Date, default: Date.now},
    votes: {type:Number, default:0}    
});

var QuestionSchema = new Schema({
    text: String,
    createdAt:{type:Date, default: Date.now},
    answers:[AnswersSchema]
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;