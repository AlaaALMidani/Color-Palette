const mongoose = require("mongoose");

// Color Schema
const colorSchema = new mongoose.Schema({
  hex: { type: String, required: true },
  rgb: { type: [Number], required: true }, // Array of RGB values
  hsl: { type: [Number], required: true }, // Array of HSL values
  isLocked: { type: Boolean, default: false },
});

// State Schema
const stateSchema = new mongoose.Schema({
  colors: { type: [colorSchema], required: true }, // Array of Color
  likes: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming you have a User model
});

// ColorPalette Schema
const colorPaletteSchema = new mongoose.Schema({
  states: { type: [stateSchema], required: true }, // Array of State
  userID: { type: String },
  currentIndex: { type: Number, default: 0 },
  currentState: { type: stateSchema, required: true }, // Reference to the current state
});

// ColorPalette Model
const ColorPalette = mongoose.model("ColorPalette", colorPaletteSchema);

class ColorPaletteRepo {
  static create = async (palette) => {
    const newPalette = new ColorPalette(palette);
    return await newPalette.save();
  };

  static update = async (fieldToCheck, newValue) => {
    const newPalette = ColorPalette.findOneAndUpdate(
      { [fieldToCheck]: valueToCheck },
      { $set: { newValue} },
      { new: true }
    );
    return await newPalette.save();
  };
}

module.exports = { ColorPaletteRepo };
