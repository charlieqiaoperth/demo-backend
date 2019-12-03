require('envdotjson').load();
const connectToDB  = require('../src/utils/database');

module.exports = async () => {
  await connectToDB();
};
