const sendSuccess = (res, data = null, message = null, status = 200) => {
  const payload = {
    success: true,
    message: message || null,
    data: data === undefined ? null : data
  };

  return res.status(status).json(payload);
};

module.exports = {
  sendSuccess
};
