class Responding {
  static response(res, statusCode, mess, messag, data, error = false) {
    if (error) {
      return res.status(statusCode).json({
        status: mess,
        error: data
      });
    }
    return res.status(statusCode).json({
      status: mess,
      message: messag,
      data
    });
  }
}
export default Responding;
