const mapper = ({ data, error, message }) => {
  const answer = {};
  // eslint-disable-next-line no-unused-expressions
  error ? answer.error = true : answer.data = data;
  return {
    ...answer,
    ...(message && { message }),
  };
};
module.exports = mapper;
