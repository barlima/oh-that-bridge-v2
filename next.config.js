const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECY_ID: process.env.PROJECY_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
  },
};
