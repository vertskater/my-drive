const bcrypt = require("bcrypt");

async function verifyPassword(pwHash, password) {
  return await bcrypt.compare(pwHash, password);
}

module.exports = {
  verifyPassword,
};