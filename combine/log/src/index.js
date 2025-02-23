const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const LogInCollection = require("./mongodb");
const app = express();




const port = process.env.PORT || 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'public/images')));


const templatePath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../tempelates/partials");

const hbs = require("hbs");

// Регистрируем хелпер "eq" для сравнения значений
hbs.registerHelper("eq", function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});


app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));
hbs.registerPartials(partialPath);

// Middleware для проверки админа
const isAdmin = async (req, res, next) => {
  const { name } = req.body;
  const user = await LogInCollection.findOne({ name });
  if (user && user.role === "admin") {
    return next();
  }
  return res.status(403).send("Access denied. Admins only.");
};
// Маршруты для проектов
app.get("/projects/newqr", (req, res) => {
  res.render("newqr");
});

app.get("/projects/email", (req, res) => {
  res.render("email");
});

app.get("/projects/bmi", (req, res) => {
  res.render("bmi");
});

app.get("/projects/weather-api-app", (req, res) => {
  res.render("weather-api-app");
});

app.get("/projects/blog-api", (req, res) => {
  res.render("blog-api");
});


app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/", (req, res) => {
  res.render("login");
});

// Регистрация пользователя
app.post("/signup", async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await LogInCollection.findOne({ name });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new LogInCollection({ name, password: hashedPassword });
    await newUser.save();

    res.status(201).render("home", { naming: name });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("An error occurred during signup");
  }
});

// Авторизация
app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await LogInCollection.findOne({ name });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return res.status(200).render("home", { naming: name, role: user.role });
    } else {
      return res.status(400).send("Incorrect password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("An error occurred during login");
  }
});

// Защищенный маршрут для админов
app.get("/admin", isAdmin, (req, res) => {
  res.send("Welcome to the admin panel");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
