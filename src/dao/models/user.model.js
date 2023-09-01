import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
  rol: {
    type: String,
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  documents: {
    type: [
      {
        name: {
          type: String,
        },
        reference: {
          type: String,
        },
      },
    ],
    default: [],
  },
  statusDocuments: {
    type: Boolean,
    default: false,
  },
  lastConnection: {
    type: Date,
    default: null,
  },
});

export const userModel = mongoose.model(usersCollection, userSchema);
