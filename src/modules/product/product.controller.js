const express = require("express");
const {
  getAllProduct,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  searchProducts,
  getProductByCategory,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProduct();

  res.send(products);
});

// SEARCH PRODUCT by query disimpan sebelum /:id agar tidak error
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).send("Query kosong");

    const results = await searchProducts(q);

    res.send(results);
  } catch (err) {
    res.status(500).send("Search Error:" + err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const categoryName = req.params.category;
    
    const products = await getProductByCategory(categoryName);
    res.send(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "product created!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productData = req.body;

    if (
      !(
        productData.name &&
        productData.description &&
        productData.price &&
        productData.image &&
        productData.stock &&
        productData.category
      )
    ) {
      return res.status(400).send({ error: "Some fields are missing" });
    }

    const product = await updateProductById(id, productData);

    res.send({
      data: product,
      message: "product updated!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productData = req.body;

    const product = await updateProductById(id, productData);

    res.send({
      data: product,
      message: "product updated!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await deleteProductById(id);

    res.send({
      message: "product deleted!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
