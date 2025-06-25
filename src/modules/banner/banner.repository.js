const prisma = require("../../db/index");

const findBanners = async () => {
  const banners = await prisma.banner.findMany();

  return banners;
};

const findBannerById = async (id) => {
  const banner = await prisma.banner.findMany({
    where: {
      id
    }
  })

  return banner
}

module.exports = {
  findBanners,
  findBannerById
};
