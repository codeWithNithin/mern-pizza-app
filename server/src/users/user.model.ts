import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { Config } from "../config/index.js";
import type { UserSchema, UserMethods } from "./user.types.js";

const userSchema = new mongoose.Schema<
  UserSchema,
  Model<UserSchema, {}, UserMethods>
>(
  {
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ updatedAt: -1 });

// before document gets saved hash the password and store it in the database.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  if (!Config.JWT_SECRET) {
    return;
  }

  const payload: JwtPayload = {
    id: this._id,
  };

  return jwt.sign(payload, Config.JWT_SECRET, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
};

const User = mongoose.model<UserSchema, Model<UserSchema, {}, UserMethods>>(
  "User",
  userSchema
);

export default User;
