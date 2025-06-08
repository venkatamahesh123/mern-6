const mongoose = require("mongoose");
constbcrypt = require("bcryptjs");
constuserSchema = new mongoose.Schema({
username: { type: String, required: true, },
email: { type: String, required: true, unique: true, },
password: { type: String, required: true, },
userType: { type: String, required: true, },
});
// Add a method to compare the password (for login)
userSchema.methods.comparePassword = asyncfunction (password) {
return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
