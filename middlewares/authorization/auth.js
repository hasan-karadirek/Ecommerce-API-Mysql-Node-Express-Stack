const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require('../../helpers/authorization/tokenHelpers');
const jwt = require('jsonwebtoken');
const CustomError = require('../../helpers/error/CustomError');

const { JWT_SECRET_KEY } = process.env;
const getAccessToRoute = (req, response, next) => {
  if (!isTokenIncluded(req)) {
    next(
      new CustomError(
        'You do not have authorization to access this route.',
        401
      )
    );
  }
  const token = getAccessTokenFromHeader(req);

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return next(
        new CustomError(
          'You do not have authorization to access this route.',
          401
        )
      );
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

module.exports = { getAccessToRoute };
