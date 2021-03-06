module.exports = {
  siteUrl: "https://ohthatbridge.com",
  generateRobotsTxt: true,
  exclude: ["add.tsx", "/bridges-sitemap.xml", "/countries-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://ohthatbridge.com/bridges-sitemap.xml"],
  },
};
