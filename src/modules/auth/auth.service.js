const prisma = require("../../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password, image, alamat }) => {
  const existing = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existing) throw Error("Email sudah terdaftar");

  const hashedPassword = await bcrypt.hash(password, 10); // parameter kedua yaitu 10 itu untuk proses enkripsi bcrypt sebanyak 10 kali untuk memperkuat hash nya. 10 adalah angkat standar aman dan cepat

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image,
      alamat,
    },
  });

  return user
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw Error("invalid credentials");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { token, user };
};

module.exports = { loginUser, registerUser };
