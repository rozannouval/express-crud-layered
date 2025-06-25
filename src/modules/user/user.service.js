// service layer bertujuan untuk handle business logic
// kenapa dipisah? supaya tanggung jawabnya ter-isolate, dan functionya reusable
// Supaya apa? supaya kalo mau ganti2 ORM tinggal edit di file ini aja

const {
  findUsers,
  findUserById,
  findUserByName,
  insertUser,
  editUser,
  deleteUser,
  findUserByKeywoard,
} = require("./user.repository");

const getAllUser = async () => {
  const users = await findUsers();

  return users;
};

const getUserById = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw Error("User not found!");
  }

  return user;
};

const searchUsers = async (query) => {
  if (!query || typeof query !== "string") return [];

  const results = await findUserByKeywoard(query.toLowerCase());

  return results;
};

const createUser = async (newUserData) => {
  const findUser = await findUserByName(newUserData.name);

  if (findUser) {
    throw Error("name has to be unique!");
  }

  const user = await insertUser(newUserData);

  return user;
};

const updateUserById = async (id, userData) => {
  await getUserById(id);

  const user = await editUser(id, userData);

  return user;
};

const deleteUserById = async (id) => {
  await getUserById(id);

  await deleteUser(id);
};

module.exports = {
  getAllUser,
  getUserById,
  searchUsers,
  createUser,
  updateUserById,
  deleteUserById,
};
