const mapper = ({ data, error, message }) => {
  const answer = {};
  if (error) {
    answer.error = true;
  } else {
    answer.data = data;
  }
  return {
    ...answer,
    ...(message && { message }),
  };
};
module.exports = mapper;
