const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    name: {
        type: String,
        unique:false,
        required: true,
        minlength: 2,
        trim: true
    },
    role: {
        type: String,
        default: 'user'
    },
    rules: {
        type: Boolean,
        required: true,
    },
    bill: {
        type: Number,
        default: 1000,
    },
    categories: {
        type: Array,
        default: [],
    },
    records: {
        type: Array,
        default: [],
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable user')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString() }, 'expressapp');
    user.tokens = user.tokens.concat({ token })
    user.save();

    return token
};

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

const User = mongoose.model('User', userSchema);

module.exports = User;
