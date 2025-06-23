// LIB IMPORT
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// FILE IMPORT
const productController = require("./product/product.controller");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`express berjalan di http://localhost:${PORT}`);
});
