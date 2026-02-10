class ApiResponse {
  constructor(statusCode, data = null, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.data = data;
    this.message = message;
  }

  static success(data = null, message = "Success", statusCode = 200) {
    return new ApiResponse(statusCode, data, message);
  }

  static error(message = "Error", statusCode = 400, data = null) {
    return new ApiResponse(statusCode, data, message);
  }
}

module.exports = ApiResponse;
