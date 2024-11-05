const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('Users', userSchema);

const create = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const findAll = async () => {
  return await User.find();
};

const findById = async (id) => {
  return await User.findById(id);
};

const update = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true }); //new:true returns the updated doc
};

const deleteOne = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  delete: deleteOne,
};