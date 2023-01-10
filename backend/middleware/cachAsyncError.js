module.exports = (cachAsyncError) => (req, res, next) => {
  Promise.resolve(cachAsyncError(req, res, next)).catch(next);
};
