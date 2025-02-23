// const bcrypt = require("bcryptjs");
// const LogInCollection = require("./src/mongodb");
// const mongoose = require("mongoose");

// async function createAdmin() {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/LoginF", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const hashedPassword = await bcrypt.hash("admin123", 10);

//     await LogInCollection.create({
//       name: "admin",
//       password: hashedPassword,
//       role: "admin",
//     });

//     console.log("Администратор успешно добавлен!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Ошибка при добавлении администратора:", error);
//     mongoose.connection.close();
//   }
// }

// createAdmin();
