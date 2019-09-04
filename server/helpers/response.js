class Responding {
  static response(res, statusCode,mess, data, error = false) {
    if (error) {
      return res.status(statusCode).json({
        status: mess,
        error: data,
      });
    }
    return res.status(statusCode).json({
      status: mess,
      data,
    });
  }
}
export default Responding;
