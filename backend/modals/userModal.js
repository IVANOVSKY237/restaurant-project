const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message : "Email must be in valid format!"
        }
    },

    phone: {
        type : Number,
        required : true,
        validate: {
            validator: function (v) {
                return /\d{9}/.test(v);
            },
            message : "Phone number must be a 9-digit number!"

        }
    },
    password: {
        type:String,
        required : true,
    },
    role: {
        type: String,
        required: true,
    }
}, {timestamps : true})

userSchema.pre('save', async function (next){
    if(!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model("User", userSchema);