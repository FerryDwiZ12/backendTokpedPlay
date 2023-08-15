const { constans } = require("../../constants");

const errorHandler = (err, req, res, next) => {
  console.log(err)
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constans.NOT_FOUND:
      res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
      break;
    case constans.UNAUTHORIZATION:
      res.json({ title: "Unautorization", message: err.message, stackTrace: err.stack });
      break;
    case constans.FORBIDEN:
      res.json({ title: "Forbiden", message: err.message, stackTrace: err.stack });
      break;
    case constans.SERVER_ERROR:
      res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
      break;
    case constans.VALIDATION_ERROR:
      res.status(400).json({ title: "Validation Error", message: err.message, stackTrace: err.stack });
      break;
    default:
        res.status(500).json({ title: "Internal Server Error", message: "Something went wrong on the server." });
        break;
  }
};

module.exports = errorHandler;
