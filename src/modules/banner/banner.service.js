const { findBanners, findBannerById } = require("./banner.repository");

const getAllBanner = async () => {
  const banners = await findBanners();

  return banners;
};

const getBannerById = async (id) => {
  const banner = await findBannerById(id);
  if (!banner) {
    throw Error("Banner not found");
  }
  return banner;
};

module.exports = {
  getAllBanner,
  getBannerById,
};
