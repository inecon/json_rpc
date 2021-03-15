const isError = function isError(error, res) {
  if (!(error == null)) {
    res.status(400);
    throw new Error(error);
  }
  return null;
};

module.exports = { isError };
