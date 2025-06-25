const prisma = require("../../db/index");

const findUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const findUserByName = async (name) => {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  return user;
};

const findUserByKeywoard = async (query) => {
  const users = prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10
  });

  return users
};

const insertUser = async (userData) => {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      alamat: userData.alamat,
    },
  });

  return user;
};

const editUser = async (id, userData) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      alamat: userData.alamat,
    },
  });

  return user;
};

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
};

module.exports = {
  findUsers,
  findUserById,
  findUserByName,
  findUserByKeywoard,
  insertUser,
  editUser,
  deleteUser,
};
