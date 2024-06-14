module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://team-daijin.github.io/Algosipeossseong-User-V2/"
      : "",
};
