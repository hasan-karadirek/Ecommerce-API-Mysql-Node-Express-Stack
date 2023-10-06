const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const isTokenIncluded = (req) => {
  return req.cookies.access_token ? req.cookies.access_token : false;
};

const verifyCustomerToken = (token) => {
  const result = jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return {
      id: decoded.id,
      name: decoded.name,
    };
  });
  return result;
};

const isAdminTokenIncluded = (req) => {
  return req.cookies.admin_access_token
    ? req.cookies.admin_access_token
    : false;
};
const verifyAdminToken = (adminToken) => {
  jwt.verify(adminToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return true;
  });
};
module.exports = {
  isTokenIncluded,
  verifyCustomerToken,
  isAdminTokenIncluded,
  verifyAdminToken,
};
