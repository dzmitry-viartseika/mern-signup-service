const User = require('../models/user');

const add = async function (req) {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    return {user, token}
};

const get = async function(){
    return await User.find({})
};

const update = async function(req){
    return await User.findByIdAndUpdate(req.params.id, req.body)
};

const login = async function(req){
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    return {user, token}
};

const logout = async function(req){
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token

    });
    await req.user.save()
};

const del = async function(req){
    return await req.user.remove()
};

const getById = async function(req) {
    return await User.findById(req.params.id)
};

module.exports = {
    add,
    get,
    update,
    del,
    login,
    logout,
    getById,
};
