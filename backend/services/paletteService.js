const { ColorPaletteRepo } = require("../models/paletteModel");

class Color {
  static id = 1;
  constructor(hex, isLocked) {
    this.id = Color.id;
    this.hex = hex;
    let transform = hexToRgbHsl(hex);
    this.rgb = transform.rgb;
    this.hsl = transform.hsl;

    if (isLocked !== undefined) {
      this.isLocked = false;
    } else {
      this.isLocked = isLocked;
    }
    Color.id += 1;
  }
}

class State {
  static id = 1;

  constructor(colors, userId) {
    this.colors = colors;
    this.id = State.id;
    this.likes = 0;
    this.userID = userId;
    this.isPubliished = false;
    State.id++;
  }
}

class ColorPalette {
  constructor(userID) {
    this.states = [
      new State(
        [
          new Color("#ff433f"),
          new Color("#2f433f"),
          new Color("#fe0234"),
          new Color("#fee332"),
          new Color("#cf4333"),
        ],
        userID
      ),
    ];

    this.userID = userID;
    this.currentIndex = 0;
    this.currentState = this.states[0];
  }
}

class ColorPaletteService {
  static async addInitialState(userID) {
    return await ColorPaletteRepo.create(new ColorPalette(userID));
  }
  static async reset(userID) {
    await ColorPaletteRepo.update(userID, new ColorPalette(userID))
    return await ColorPaletteRepo.find(userID);
  }
  static async generatePalette(id) {

    const state = await ColorPaletteRepo.find(id)

    let tempState = [];
    for (let i = 0; i < 5; i++) {
      if (state.currentState.colors[i].isLocked) {
        tempState.push(state.currentState.colors[i]);
      } else {
        tempState.push(new Color(randomColor()));
      }
    }
    state.states.push(new State(tempState));
    this.setIndex(state, state.currentIndex + 1);
    ColorPaletteRepo.update(state.userID, state);
    return state
  }
  static async doo(id) {
    const state = await ColorPaletteRepo.find(id)
    if (state.currentIndex === state.states.length - 1) return state;
    this.setIndex(state, state.currentIndex + 1);
    ColorPaletteRepo.update(state.userID, state);
    return state

  }
  static async undo(id) {
    const state = await ColorPaletteRepo.find(id)
    if (state.currentIndex === 0) return state;
    this.setIndex(state, state.currentIndex - 1);
    ColorPaletteRepo.update(state.userID, state);
    return state
  }
  static async lockToggling(userID, id) {
    const state = await ColorPaletteRepo.find(userID)
    for (let i = 0; i < 5; i++) {
      console.log(state.currentState.colors[i]._id , " " ,id)
      if (state.currentState.colors[i]._id === id) {
        state.currentState.colors[i].isLocked =
          !state.currentState.colors[i].isLocked;
      }
    }
    await ColorPaletteRepo.update(state.userID, state);
    return state
  }


  static setIndex(state, index) {
    state.currentIndex = index;
    state.currentState = state.states[index];
    return state;
  }
}

function randomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}
function hexToRgbHsl(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Convert the hex to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h,
    s,
    l = (max + min) / 2 / 255;

  if (delta === 0) {
    h = 0;
    s = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  // Return results
  return {
    rgb: [r, g, b],
    hsl: [h, s * 100, l * 100],
  };
}

module.exports = {
  ColorPaletteService,
};
