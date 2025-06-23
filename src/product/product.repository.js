const prisma = require("../db/index");

const findProduct = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const findProductByName = async (name) => {
  const product = await prisma.product.findFirst({
    where: {
      name,
    },
  });

  return product;
};

const findProductByKeywoard = async (query) => {
  const products = prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10
  });

  return products
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });

  return product;
};

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });

  return product;
};

const deleteProduct = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  return product;
};

module.exports = {
  findProduct,
  findProductById,
  findProductByName,
  findProductByKeywoard,
  insertProduct,
  editProduct,
  deleteProduct,
};
