const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,
  },
};
