import mongoose from "mongoose"; 

// Defining the schema for a user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },
  },
  {
    versionKey: false, // Disables the __v field, which is used to track schema versioning
  }
);

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
