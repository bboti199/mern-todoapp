module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongo uri goes here',
  secretOrKey: process.env.JWT_SECRET || 'secret'
};
