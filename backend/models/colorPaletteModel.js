const mongoose = require("mongoose");



const create = async (userData) => {
 mongoose.users.insertOne(userData);
  return await newUser.save();
};


module.exports = { create }; 