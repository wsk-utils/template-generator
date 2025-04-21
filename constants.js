const path = require("path");
const os = require("os");

const PATH_ROOT = __dirname;
const HOME_DIR = path.resolve(os.homedir());
const OUTPUT_DIR = path.resolve(HOME_DIR, "./.out");
const TEMPLATE_DIR = path.resolve(PATH_ROOT, "./resources/templates");

module.exports = {
  PATH_ROOT,
  HOME_DIR,
  OUTPUT_DIR,
  TEMPLATE_DIR,
};
