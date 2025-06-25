const express = require("express");
const { getAllBanner, getBannerById } = require("./banner.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const banners = await getAllBanner();

  res.send(banners);
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const banner = await getBannerById(id);

    res.send(banner)
  } catch (err) {
    res.status(400).send(err.message)
  }
});

module.exports = router;
