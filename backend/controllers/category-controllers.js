const mongoose = require('mongoose');
const User = mongoose.model('User');
const user = require('../models/user');
const ObjectId = require('mongodb').ObjectID;

class UserController {
    constructor(){}
    getCategoryList = async (req, res) => {
        User.find((err, docs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(docs);
            }
        })
    };
    newCategory = async (req, res) => {
        const id = req.body.id;
        const category = req.body.category
        User.findById((id), (err,user) => {
            if (err) {
                res.send(err)
            } else {
                user.categories.push(category)
                user.save()
                res.send(user);
            }
        })
    };
    editCategory = async (req,res) => {
        User.findOneAndUpdate({_id: req.params.id,
            'categories': { $elemMatch: { id: req.body.categoryId }}},
            {$set: {'categories.$.name': req.body.name, 'categories.$.limit': req.body.limit}}).exec(function (err, doc) {console.log(doc)});
    };
}

module.exports = UserController;
