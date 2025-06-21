const express = require("express");
const {
  getAllProduct,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProduct();

  res.send(products);
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
        productData.image
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

    await deleteProductById(id)

    res.send({
      message: "product deleted!"
    })
  } catch (err) {
    res.status(400).send(err.message)
  }
});

module.exports = router;
