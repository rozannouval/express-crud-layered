// LIB IMPORT
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// FILE IMPORT
const productController = require("./modules/product/product.controller");
const bannerController = require("./modules/banner/banner.controller")
const userController = require("./modules/user/user.controller")
const authController = require("./modules/auth/auth.controller")

dotenv.config();
const app = express();
// const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/products", productController);
app.use("/banners", bannerController);
app.use("/users", userController);
app.use("/auth", authController);

app.get("/", (req, res) => {
  res.send("Welcome to backend nexshop")
})

// app.listen(PORT, () => {
//   console.log(`express berjalan di http://localhost:${PORT}`);
// });

module.exports = app