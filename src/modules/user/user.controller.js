const express = require("express");
const {
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  searchUsers,
} = require("./user.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getAllUser();

  res.send(users);
});

// SEARCH PRODUCT by query disimpan sebelum /:id agar tidak error
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).send("Query kosong");

    const results = await searchUsers(q);

    res.send(results);
  } catch (err) {
    res.status(500).send("Search Error:" + err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUserData = req.body;
    const user = await createUser(newUserData);

    res.send({
      data: user,
      message: "user created!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userData = req.body;

    if (
      !(
        userData.name &&
        userData.description &&
        userData.price &&
        userData.image
      )
    ) {
      return res.status(400).send({ error: "Some fields are missing" });
    }

    const user = await updateUserById(id, userData);

    res.send({
      data: user,
      message: "user updated!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userData = req.body;

    const user = await updateUserById(id, userData);

    res.send({
      data: user,
      message: "user updated!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await deleteUserById(id);

    res.send({
      message: "product deleted!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
