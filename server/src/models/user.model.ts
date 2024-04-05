import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";
import { Model as ModelType } from "../types/utils.type.js";
import { UserModel, IUser, IUserMethods } from "../types/database/index.js";

const emailValidator = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const schema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        minlength: [5, "must not be less that 3 charatcters"],
        maxlength: [25, "must not be longer than 50 characters"],
    },
    password: {
        type: String,
        minlength: [5, "must not be less that 5 charatcters"],
        required: [true, "password is required"],
    },
    refreshToken: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "name is required"],
    },
    surname: {
        type: String,
        required: [true, "surname is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        validate: [emailValidator, "please fill a valid email address"],
    },
    avatarImageURL: {
        type: String,
    },
    pinnedBoards: [
        {
            _id: false,
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelType.Board,
        },
    ],
    notifications: [
        {
            title: String,
            description: String,
            key: String,
            attributes: Object,
            timeStamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],
});

schema.plugin(uniqueValidator, { message: "{VALUE} is already used by another user" });

schema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

schema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser, UserModel>(ModelType.User, schema);
