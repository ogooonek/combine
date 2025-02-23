// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/LoginF", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 10000, 
//   })
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((e) => console.error("MongoDB connection error:", e.message));

// const logInSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["user", "admin"], default: "user" }, // Поле роли
// });

// const LogInCollection = mongoose.model("LogInCollection", logInSchema);

// module.exports = LogInCollection;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb://127.0.0.1:27017/LoginF", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, 
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((e) => console.error("MongoDB connection error:", e.message));

const logInSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const LogInCollection = mongoose.model("LogInCollection", logInSchema);

// Функция для создания администратора, если его нет
async function createAdmin() {
  try {
    const existingAdmin = await LogInCollection.findOne({ name: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await LogInCollection.create({
        name: "admin",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
}

// Вызываем функцию создания администратора при запуске
createAdmin();

module.exports = LogInCollection;
