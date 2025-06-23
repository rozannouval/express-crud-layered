// service layer bertujuan untuk handle business logic
// kenapa dipisah? supaya tanggung jawabnya ter-isolate, dan functionya reusable
// Supaya apa? supaya kalo mau ganti2 ORM tinggal edit di file ini aja

const {
  findProduct,
  findProductById,
  findProductByName,
  insertProduct,
  editProduct,
  deleteProduct,
  findProductByKeywoard,
} = require("./product.repository");

const getAllProduct = async () => {
  const products = await findProduct();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found!");
  }

  return product;
};

const searchProducts = async (query) => {
  if (!query || typeof query !== "string") return [];

  const results = await findProductByKeywoard(query.toLowerCase());

  return results;
};

const createProduct = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);

  if (findProduct) {
    throw Error("name has to be unique!");
  }

  const product = await insertProduct(newProductData);

  return product;
};

const updateProductById = async (id, productData) => {
  await getProductById(id);

  const product = await editProduct(id, productData);

  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await deleteProduct(id);
};

module.exports = {
  getAllProduct,
  getProductById,
  searchProducts,
  createProduct,
  updateProductById,
  deleteProductById,
};
