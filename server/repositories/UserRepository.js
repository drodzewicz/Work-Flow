const User = require("../models/user");

module.exports = {
  getUserById: async (userId, fields) => {
    fields = fields || "_id username name surname email avatarImageURL password";
    return await User.findById(userId, fields);
  },

  getUserByUsername: async (username, fields) => {
    fields = fields || "_id username name surname email avatarImageURL password";
    return await User.findOne({ username }, fields);
  },

  getUsersByMatchUsername: async (username, fields) => {
    fields = fields || "_id username avatarImageURL";
    return await User.find({ username: { $regex: username, $options: "i" } }, fields);
  },

  createUser: async (userData) => {
    const { username, password, name, surname, email } = userData;
    const newUser = new User({ username, password, name, surname, email });
    return await newUser.save();
  },

  save: async (user) => {
    await user.save();
  },

  updateUser: async (userId, newValues) => {
    return await User.findOneAndUpdate(
      { _id: userId },
      { ...newValues },
      { runValidators: true, context: "query" }
    );
  },
};
