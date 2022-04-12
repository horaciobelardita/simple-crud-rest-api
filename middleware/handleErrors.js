export default (error, request, response, next) => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  return response.status(statusCode).json({ message: error.message });
};
