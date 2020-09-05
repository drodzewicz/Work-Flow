const mongoose = require("../configs/mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username is not available"],
        minlength: [3, "must not be less that 3 charatcters"]
    },
    password: {
        type: String,
        minlength: [4, "must not be less that 4 charatcters"],
        required: [true, "password is required"]
    }
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

User.processErrors = (err) => {
    const msg = {};
    for (const key in err.errors) {
        msg[key] = err.errors[key].message;
    }
    if (err.errmsg !== undefined && err.errmsg.indexOf("dup key") > -1) {
        msg.username = "username is unavailable";
    }
    return msg;
};

module.exports = User;
