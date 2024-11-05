class Color {
  static id = 1;
  constructor(hexa, isLocked) {
    this.id = Color.id;
    this.hexa = hexa;
    if (isLocked !== undefined) this.isLocked = false;
    else {
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
    State.id++;
    this.likes = 0;
    this.userID = userId;
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
    this.currentIndex = 0;
    this.currentState = this.states[0];
  }
}

class ColorPaletteLogic {
  static getUserState(userId) {}
  static generatePallette(state) {
    let tempState = [];
    for (let i = 0; i < 5; i++) {
      if (this.currentState.colors[i].isLocked) {
        tempState.push(this.currentState.colors[i]);
      } else {
        tempState.push(new Color(randomC()));
      }
    }
    state.states.push(new State(tempState));
    state.setIndex(this.currentIndex + 1);
    return state;
  }

  static doo(state) {
    if (state.currentIndex === state.states.length - 1) return;
    state.setIndex(state.currentIndex + 1);
    return state;
  }
  static undo(state) {
    if (state.currentIndex === 0) return;
    state.setIndex(state.currentIndex - 1);
    return state;
  }
  static lockToggling(state, id) {
    for (let i = 0; i < 5; i++) {
      if (state.currentState.colors[i].id == id) {
        state.currentState.colors[i].isLocked =
          !state.currentState.colors[i].isLocked;
      }
    }
    return state;
  }
  static setIndex(state, index) {
    state.currentIndex = index;
    state.currentState = this.states[index];
    return state;
  }
}

function randomC() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

module.exports = {
  Color,
  State,
  ColorPalette,
  ColorPaletteLogic,
};
