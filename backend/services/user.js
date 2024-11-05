const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { UserRepo } = require("../models/userModel");

// class User {
//   constructor({ id, username, token, email }) {
//     this.id = id;
//     this.username = username;
//     this.token = token;
//     this.email = email;
//   }
// }

class Auth {
  async hashPassword(password) {
    const saltRounds = 9; // Number of salt rounds (higher is more secure, but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
  async comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
  secretKey = "sdwe";
  generateToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
    };

    const options = {
      expiresIn: "24h",
    };

    try {
      const token = jwt.sign(payload, this.secretKey, options);
      return token;
    } catch (error) {
      console.error("Error generating token:", error);
      return null;
    }
  }
  validate(user) {
    const errors = {};

    // firstName
    if (
      !user.firstName ||
      typeof user.firstName !== "string" ||
      user.firstName.trim().length < 2 ||
      user.firstName.trim().length > 50
    ) {
      errors.firstName =
        "First name is required, must be a string, and between 2 and 50 characters.";
    }
    // lastName
    if (
      !user.lastName ||
      typeof user.lastName !== "string" ||
      user.lastName.trim().length < 2 ||
      user.lastName.trim().length > 50
    ) {
      errors.lastName =
        "Last name is required, must be a string, and between 2 and 50 characters.";
    }

    //username
    if (!user.username) {
      errors.username = "Username is required.";
    } else if (user.username.length < 5 || user.username.length > 20) {
      errors.username = "Username must be between 5 and 20 characters long.";
    } else if (!/^[a-zA-Z0-9._]+$/.test(user.username)) {
      errors.username =
        "Username can only contain alphanumeric characters, periods (.), and underscores (_).";
    } else if (UserRepo.findByUsername(username)) {
      errors.username = "Username is already exist";
    }

    //email
    if (!user.email) {
      errors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
      errors.email = "Invalid email format.";
    } else if (UserRepo.findByEmail(email)) {
      errors.email = "Email is already exist";
    }

    //password
    if (!user.password) {
      errors.password = "Password is required.";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  }


  async register(user) {
    const validation = this.validate(user);

    if (Object.keys(validation).length > 0) {
      return { ok: false, validation: validation };
    }

    const hashedPassword = await this.hashPassword(user.password);
    const newUser = await UserRepo.create({
      ...user,
      password: hashedPassword,
    });

    const token = this.generateToken(newUser);

    return { ok: true, user: { password, ...newUser, token } };
  }

  async login({ email, password }) {
      const e = await UserRepo.findByEmail(email);
      const passwordMatch = await this.comparePassword(password, e.password);
      if (e.email === email && passwordMatch) {
        console.log("matched");
        return { ok: true, user: { password, ...e } };
      }
     
    return { ok: false, message: "email or password isn't correct" };
  }
}
module.exports =new Auth();
